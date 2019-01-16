import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, Image, TouchableOpacity, FlatList, ScrollView, TextInput} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from "../../static/style/sign_style";
import Header from "../../common/Header";
import Sound from 'react-native-sound';
import { option } from "../../common/uploadConfig";
import ImagePicker from "react-native-image-picker";

let audio, time, Time, width, imgHeight;

export default class Sign extends Component {
	constructor(props) {
		
	  	super(props);
	
	  	this.state = {
	  		mobile: null,
	  		name: null,
	  		bankname: null,
	  		bankbumber: null,
	  		ok: false,
	  		isSign: false,
	  		msg: '',
	  		msgArr: [false, false, false, false, false, false],
	  		info: {},
	  		sound: null,
	  		isPlay: false,
	  		left: 0,
	  		upList: [],
	  		upLength: null,
	  		img: null,
	  		imgurls: [],
	  		idUrl: null,
	  		idPic: {}
	  	};
	}

	componentDidMount(){
		//获取個人信息
        fetch(API('/users/detail'), {
            method: 'POST',
            body: signData()
        }).then( (res) => res.json() ).then( (response) => {
            if(response['err_no'] == 0){
                this.setState({
                    mobile: response['results']['mobile'],
                    name: response['results']['last_name'] + response['results']['first_name'],
                })
            }
        } )
        //獲取銀行信息
        fetch(API('/authentications/bank'), {
        	method: 'POST',
        	body: signData()
        }).then( (res) => res.json() ).then( (response) => {
        	if(response['err_no'] == 0){
        		this.setState({
        			bankname: response['results'][0]['input1'], 
        			bankbumber: response['results'][0]['input2'] 
        		})
        	}
        } )
		// 获取订单详情
		fetch(API('/order/detail'), {
			method: 'POST',
			body: signData({order_id: this.props.orderID})
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				console.log(response);
				this.setState({
					info: response['results'],
				})
			}
		} )
		//获取录音 
		fetch(API('/system/systemconfigsdetail'), {
			method: 'POST',
			body: signData({
				config_key: 'api_contract_audio_cn'
			})
		}).then( (response) => response.json() ).then( (data) => {
			if(data['err_no'] == 0){
				this.setState({
					sound: data['results']['config_name']
				})
				audio = new Sound(data['results']['config_name'], null, (error) => {
					if (error) {
						return console.log('资源加载失败', error);
					}
					let totalTime = audio.getDuration();
					time = Math.ceil(totalTime);
					let W = (WIDTH - 80) / time;
					width = Math.ceil(W);
				})
			}
		} )
		// 获取上传列表
		fetch(API('/authenticationscategorys/notauthmust'), {
			method: 'POST',
			body: signData()
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				this.setState({
					upList: response['results'],
					upLength: response['results'].length
				})
			}
		} )
		// 获取合约图片
		fetch(API('/system/systemconfigsdetail'), {
			method: 'POST',
			body: signData({config_key: LAN ? 'api_sign_contract_cn' : 'api_sign_contract_en'})
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				this.setState({
					img: response['results']['config_name']
				})
				Image.getSize(this.state.img, (width, height) => {
					let W = width / (WIDTH - 30);
					imgHeight = Math.ceil(height / W);
					this.setState({
						a: 'a'
					})
				})
			}
		} )
		// 获取合约附件图片
		fetch(API('/system/systemconfigsdetail'), {
			method: 'POST',
			body: signData({config_key: LAN ? 'api_sign_contract_attachment_cn' : 'api_sign_contract_attachment_en'})
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				let arr = [{url: response['results']['config_name']}]
				this.setState({
					imgurls: arr
				})
			}
		} )
	}

	ok = () => {
		this.setState({
			ok: !this.state.ok
		})
	}

	upHtml = () => {
		return this.state.upList.map( (item, index) => {
			return(
				<TouchableOpacity style={styles.uploadchild} onPress={() => this.toUp(item.id, item.name, item.authentication_id)}>
					<Text style={{color: '#fff'}}>{item.name}</Text>
				</TouchableOpacity>
			)
		} )
	}

	toUp = (ID, name, UID) => {
		if (ID == 1) {
			Actions.idcard({'id': ID, 'titleName': name, 'orderID': this.state.info['order_id'], 'uid': UID});
		}else if(ID == 2){
			Actions.bank({'id': ID, 'titleName': name, 'orderID': this.state.info['order_id'], 'uid': UID});
		}else{
			Actions.other({'id': ID, 'titleName': name, 'orderID': this.state.info['order_id'], 'uid': UID});
		}
	}

	// 上传手持身份證图片
	uploadImg = () => {
		ImagePicker.showImagePicker(option, (response) => {
			if(response.didCancel){
				return false;
			}
			let from = signData();
			from.append('name', 'img');
			from.append('is_thumb', 1);
			from.append('img', {uri: response['uri'], type: 'multiline/form-data', name: 'images.jpeg'});
			//上传
			fetch(API('/upload/'), {
				method: 'POST',
				headers:{
			      	'Content-Type':'multipart/form-data',
		      	},
				body: from
			}).then( (res) => res.json() ).then( (response) => {
				if(response['err_no'] == 0){
					this.setState({
						idUrl: response['results']['url_temp'],
						idPic: response
					})
				}
			} )
		})
	}

	sign = () => {
		let upArr = [];
		this.state.upList.map( (item, index) => {
			upArr.push(item['authentication_id']);
		} );
		let up = upArr.every( (item, index, arr) => {
			return item > 0;
		} )
		if(this.state.upLength != 0){
			if(!up){
				Alert.alert(i18n.t('sign.alert1'));
				return false;
			}
		}else if(this.state.idPic.length == 0){
			Alert.alert(i18n.t('sign.alert3'));
			return false;
		}else{
			fetch(API('/sendsms/sendsms'), {
				method: 'POST',
				body: signData({
					mobile: this.state.mobile,
					contentcode: 'sms_verify_signing'
				})
			}).then( (res) => res.json() ).then( (response) => {
				if(response['err_no'] == 0){
					console.log(response);
					Alert.alert(i18n.t('sign.msg'));
					this.setState({isSign: true})
				}else{
					Alert.alert(response['err_msg'])
				}
			} )
		}
	}

	againMsg = () => {
		fetch(API('/sendsms/sendsms'), {
			method: 'POST',
			body: signData({
				mobile: this.state.mobile,
				contentcode: 'sms_verify_signing'
			})
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				console.log(response);
				Alert.alert(i18n.t('sign.msg'));
			}else{
				Alert.alert(response['err_msg'])
			}
		} )
	}

	onsubmit = () => {
		let params = {
			order_id: this.props.orderID,
			is_sign: 1,
			pic_json: JSON.stringify(this.state.idPic),
			verify: this.state.msg
		}
		fetch(API('/order/sign'), {
			method: 'POST',
			body: signData(params)
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				Alert.alert(
                    i18n.t('main.alert'),
                    i18n.t('sign.succ'),
                    [
                        {text: 'OK', onPress: () => {
                        	Actions.main();
                        	Actions.reset('main');
                        }},
                    ],
                    { cancelable: false }
                )
			}else{
				Alert.alert(response['err_msg'])
			}
		} )
	}

	signComponent = () => {
		return(
			<ScrollView style={{height: scrollViewHeight}}>
				<Text style={styles.toptitle}>{i18n.t('sign.title1')}</Text>
				<View style={styles.listwrap}>
					{  
						this.state.info['order_type'] == 0 ? 
						<Image style={styles.listimg} source={require('../../static/images/listwu.png')} /> : 
						<Image style={styles.listimg} source={require('../../static/images/listyou.png')} />
					}
					<View style={styles.listcont}>
						<Text style={styles.listtext}>{this.state.info.price}</Text>
						<Text style={styles.listtext}>{this.state.info['day_rate']}</Text>
						<Text style={styles.listtext}>{this.state.info['loan_stage']}</Text>
					</View>
					<Text style={styles.orderid}>{i18n.t('order.order')}{this.props.orderID}</Text>
				</View>
				<View style={styles.listinfo}>
					<View style={[styles.infochild, styles.infochildcolor1]}>
						<Text style={styles.label} numberOfLines={1}>{i18n.t('sign.name')}</Text>
						<Text style={styles.labeltext}>{this.state.info['last_name']} {this.state.info['first_name']}</Text>
					</View>
					<View style={[styles.infochild, styles.infochildcolor2]}>
						<Text style={styles.label} numberOfLines={1}>{i18n.t('sign.hybh')}</Text>
						<Text style={styles.labeltext}>{this.state.info['uid']}</Text>
					</View>
					<View style={[styles.infochild, styles.infochildcolor1]}>
						<Text style={styles.label} numberOfLines={1}>{i18n.t('sign.dk')}</Text>
						<Text style={styles.labeltext}>{this.state.info['order_id']}</Text>
					</View>
					<View style={[styles.infochild, styles.infochildcolor2]}>
						<Text style={styles.label} numberOfLines={1}>{i18n.t('sign.je')}</Text>
						<Text style={styles.labeltext}>{this.state.info['price']}</Text>
					</View>
					<View style={[styles.infochild, styles.infochildcolor1]}>
						<Text style={styles.label} numberOfLines={1}>{i18n.t('sign.lv')}</Text>
						<Text style={styles.labeltext}>{this.state.info['year_rate']}</Text>
					</View>
					<View style={[styles.infochild, styles.infochildcolor2]}>
						<Text style={styles.label} numberOfLines={1}>{i18n.t('sign.bl')}</Text>
						<Text style={styles.labeltext}>{this.state.info['total_price']}</Text>
					</View>
					<View style={[styles.infochild, styles.infochildcolor1]}>
						<Text style={styles.label} numberOfLines={1}>{i18n.t('sign.hkq')}</Text>
						<Text style={styles.labeltext}>{this.state.info['loan_stage']}</Text>
					</View>
					<View style={[styles.infochild, styles.infochildcolor2]}>
						<Text style={styles.label} numberOfLines={1}>{i18n.t('sign.jkrq')}</Text>
						<Text style={styles.labeltext}>{this.state.info['create_times']}</Text>
					</View>
				</View>
				<Text style={styles.toptitle}>{i18n.t('sign.title2')}</Text>
				<View style={styles.liuchengwrap}>
					<View style={[styles.liucheng]}>
						<Image style={styles.lcimg} source={require('../../static/images/lc1.png')} />
						<Text style={{fontSize: 12}}>{i18n.t('sign.lc1')}</Text>
					</View>
					<View style={styles.liuchengx}></View>
					<View style={[styles.liucheng]}>
						<Image style={styles.lcimg} source={require('../../static/images/lc2.png')} />
						<Text style={{fontSize: 12}}>{i18n.t('sign.lc2')}</Text>
					</View>
					<View style={styles.liuchengx}></View>
					<View style={[styles.liucheng]}>
						<Image style={styles.lcimg} source={require('../../static/images/lc3.png')} />
						<Text style={{fontSize: 12}}>{i18n.t('sign.lc3')}</Text>
					</View>
				</View>
				<View style={styles.uploadwrap}>
					{ this.upHtml() }
				</View>
				<Text style={styles.toptitle}>{i18n.t('sign.qshy')}</Text>
				<View style={{marginLeft: 15, marginRight: 15, marginTop: 10}}>
					<Image style={{width: WIDTH - 30, height: imgHeight}} source={{uri: this.state.img}}/>
				</View>
				<View style={styles.fujianwrap}>
					<TouchableOpacity onPress={ () => Actions.img({'imgs': this.state.imgurls}) }>
						<Image style={{width: 40, height: 50}} source={require('../../static/images/fujianx3.png')} />
					</TouchableOpacity>
					<Text>{i18n.t('sign.hy')}</Text>
				</View>
				<View style={styles.audiowrap}>
					<TouchableOpacity style={{width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}} onPress={ () => {
						if (this.state.isPlay) {
							audio.stop();
							clearInterval(Time);
							this.setState({
								left: 0
							})
						}else {
							audio.play();
							Time = setInterval(() => {
								this.setState({
									left: this.state.left + width
								})
								if(this.state.left >= WIDTH - 80){
									this.setState({
										left: 0,
										isPlay: false
									})
									clearInterval(Time);
								}
							}, 1000)
						}
						this.setState({
							isPlay: !this.state.isPlay
						})
					} }>
						{
							!this.state.isPlay ?
							<Image style={{width: 25, height: 25}} source={require('../../static/images/play.png')} /> :
							<Image style={{width: 25, height: 25}} source={require('../../static/images/stop.png')} />
						}
					</TouchableOpacity>
					<View style={styles.audiojinwrap}>
						<Text style={[styles.audiojin]}></Text>
						<View style={[styles.audiodian, {left: this.state.left}]}><View style={[styles.audiodian2]}></View></View>
					</View>
				</View>
				<View style={styles.upid}>
					<TouchableOpacity onPress={ this.uploadImg }>
						{
							this.state.idUrl == null ? 
							<Image style={styles.upidimg} source={require('../../static/images/idx3.png')} /> :
							<Image style={styles.upidimg} source={{uri: this.state.idUrl}} />
						}
					</TouchableOpacity>
					<Text style={{marginLeft: 15, flex: 1}} numberOfLines={3}>{i18n.t('sign.up')}</Text>
				</View>
				<View style={styles.wrap}>
					<TouchableOpacity style={styles.agrokwrap} onPress={ this.ok }>
						{
							this.state.ok ? 
							<Image style={styles.agrok} source={require('../../static/images/icon/agr_ok.png')}/> : 
							null
						}
					</TouchableOpacity>
					<View style={styles.agroktext}>
						<Text style={styles.agrokcent}>{i18n.t('sign.text')}</Text>
					</View>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 25}}>
					<TouchableOpacity
					disabled={!this.state.ok}
					onPress={ () => this.sign() } style={{width: 170, height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7ba14', borderRadius: 10}}>
						<Text style={{color: '#fff'}}>{ i18n.t('sign.btn') }</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}

	changeMsg = (text) => {
		let arr = [false, false, false, false, false, false];
		for (var i = 0; i < text.length; i++) {
			arr[i] = true
		}
		this.setState({msg: text, msgArr: arr})
	}

	okComponent = () => {
		return(
			<ScrollView style={{height: scrollViewHeight}}>
				<Text style={styles.toptitle}>{ i18n.t('sign.sign1') }</Text>
				<View style={styles.gkinfo}>
					<View style={styles.gkinfochild}>
						<Text style={styles.gkinfotext}>{ i18n.t('sign.fs') }</Text>
						<Text style={styles.gkinfotext}></Text>
					</View>
					<View style={styles.gkinfochild}>
						<Text style={styles.gkinfotext}>{ i18n.t('sign.zzyh') }</Text>
						<Text style={styles.gkinfotext}>{this.state.bankname}</Text>
					</View>
					<View style={styles.gkinfochild}>
						<Text style={styles.gkinfotext}>{ i18n.t('sign.zzhk') }</Text>
						<Text style={styles.gkinfotext}>{this.state.bankbumber}</Text>
					</View>
					<View style={styles.gkinfochild}>
						<Text style={styles.gkinfotext}>{ i18n.t('sign.zzr') }</Text>
						<Text style={styles.gkinfotext}>{this.state.name}</Text>
					</View>
				</View>
				<Text style={styles.toptitle}>{ i18n.t('sign.sign2') }</Text>
				<Text style={styles.qstext}>{ i18n.t('sign.signcon') }</Text>
				<View style={styles.msgwrap}>
					<TextInput style={styles.inputMsg} onChangeText={(text) => this.changeMsg(text) } keyboardType="numeric" maxLength={6}/>
					<View style={styles.msgtextwrap}>
						<View style={styles.msgtextchild}><Text style={ this.state.msgArr[0] ? styles.msgok : null }></Text></View>
						<View style={[styles.msgtextchild, {marginLeft: 15}]}><Text style={ this.state.msgArr[1] ? styles.msgok : null }></Text></View>
						<View style={[styles.msgtextchild, {marginLeft: 15}]}><Text style={ this.state.msgArr[2] ? styles.msgok : null }></Text></View>
						<View style={[styles.msgtextchild, {marginLeft: 15}]}><Text style={ this.state.msgArr[3] ? styles.msgok : null }></Text></View>
						<View style={[styles.msgtextchild, {marginLeft: 15}]}><Text style={ this.state.msgArr[4] ? styles.msgok : null }></Text></View>
						<View style={[styles.msgtextchild, {marginLeft: 15}]}><Text style={ this.state.msgArr[5] ? styles.msgok : null }></Text></View>
					</View>
				</View>
				<Text style={{marginTop: 15, marginBottom: 15, textAlign: 'center'}}>{ i18n.t('sign.msgno') }</Text>
				<TouchableOpacity onPress={() => this.againMsg()}><Text style={{textAlign: 'center'}}>{ i18n.t('sign.msgto') }</Text></TouchableOpacity>
				<View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 25, marginBottom: 25}}>
					<TouchableOpacity onPress={ () => this.setState({isSign: false}) } style={{width: 170, height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
						<Text style={{color: '#f7ba14'}}>{ i18n.t('sign.back') }</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={ this.onsubmit } style={{width: 170, height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7ba14', borderRadius: 10}}>
						<Text style={{color: '#fff'}}>{ i18n.t('sign.ok') }</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}

	render(){
		return(
			<View style={{flex: 1, backgroundColor: '#efe4c6'}}>
				<Header title={title = i18n.t('main.dq')} />
				{!this.state.isSign ? this.signComponent() : this.okComponent()}
			</View>
		);
	}
}