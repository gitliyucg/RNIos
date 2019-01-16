import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { styles } from "../../static/style/idcard_style.js"
import { Actions } from 'react-native-router-flux';
import Header from "../../common/Header";
import Upload from "../components/upload";
import ImagePicker from 'react-native-image-picker';
import { config } from "../../common/uploadConfig";

class Idcard extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		show: false,
	  		just: null,
	  		back: null,
	  		id: null, //判断上传的是正面还是反面
	  		pic: [],
	  		isBtn: false,
	  		type: null,
	  		text: null
	  	};
	}

	componentDidMount(){
		// 首次进入获取详情
		fetch(API('/authentications/detail'), {
			method: 'POST',
			body: signData({
				id: this.props.uid
			})
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				let arr = this.state.pic;
				arr[0] = JSON.parse(response['results']['Images'][0]['pic_json'])
				arr[1] = JSON.parse(response['results']['Images'][1]['pic_json'])
				this.setState({
					just: response['results']['Imgs'][0]['url'],
					back: response['results']['Imgs'][1]['url'],
					type: response['results']['examine_status'],
					text: response['results']['examine_reason'],
					pic: arr
				})
			}
		} )
	}

	upload = (upload) => {
		this.setState({
			show: false
		})
		if(upload == 1){
			// 本地上传
			ImagePicker.launchImageLibrary(config, (response) => {
				if(response.didCancel){
					return false
				}else{
					if(this.state.id == 0){
						this.setState({
							just: response['uri']
						})
						this.uploadImg({
							uri: response['uri'],
							type: 'multiline/form-data',
							name: 'images.jpeg'
						}, 0)
					}else{
						this.setState({
							back: response['uri']
						})
						this.uploadImg({
							uri: response['uri'],
							type: 'multiline/form-data',
							name: 'images.jpeg'
						}, 1)
					}
				}
			})
		}else if(upload == 2){
			// 拍照上传
			ImagePicker.launchCamera(config, (response) => {
				if(response.didCancel){
					return false
				}else{
					if(this.state.id == 0){
						this.setState({
							just: response['uri']
						})
						this.uploadImg({
							uri: response['uri'],
							type: 'multiline/form-data',
							name: 'images.jpeg'
						}, 0)
					}else{
						this.setState({
							back: response['uri']
						})
						this.uploadImg({
							uri: response['uri'],
							type: 'multiline/form-data',
							name: 'images.jpeg'
						}, 1)
					}
				}
			})
		}
	}

	// 上传图片
	uploadImg = (data, ID) => {
		let from = signData();
		from.append('name', 'img');
		from.append('img', data);
		from.append('is_thumb', 1);
		fetch(API('/upload/'),{
			method: 'POST',
			headers:{
		      	'Content-Type':'multipart/form-data',
	      	},
			body: from
		}).then( (res) => res.json() ).then( (response) => {
			if (response['err_no'] == 0) {
				let arr = this.state.pic;
				if(ID == 0){
					arr[0] = response;
				}else{
					arr[1] = response;
				}
				this.setState({
					pic: arr
				})
			}
		} )
	}

	//上傳
	uploadBtn = () => {
		if(this.state.pic[0] == ''){
			Alert.alert(i18n.t('id.al1'));
			return false;
		}else if(this.state.pic[1] == ''){
			Alert.alert(i18n.t('id.al2'));
			return false;
		}else{
			let params = {
				category_id: this.props.id,
				pic_jsons: JSON.stringify(this.state.pic)
			}
			fetch(API('/authentications/add'), {
				method: 'POST',
				body: signData(params)
			}).then( (res) => res.json() ).then( (response) => {
				if(response['err_no'] == 0){
					Alert.alert(
                        i18n.t('credit.alert'),
                        i18n.t('credit.alerttext'),
                        [
                            {text: 'OK', onPress: () => {
                            	if(this.props.orderID == undefined){
									Actions.xin({reset: true});
									Actions.reset('xin');
								}else{
									Actions.main({'tost': false});
									Actions.reset('main');
									Actions.sign({'orderID': this.props.orderID});
								}
                            }},
                        ],
                        { cancelable: false }
                    )
				}else{
					Alert.alert(response['err_msg'])
				}
			} )
		}
	}

	render(){
		return(
			<View>
				<Upload show={this.state.show} upload={this.upload}/>
				<Header title={i18n.t('id.title')} />
				<ScrollView style={{height: scrollViewHeight}}>
					<View style={styles.idwrap}>
						<TouchableOpacity disabled={this.state.isBtn} onPress={ () => {
							this.setState({
								show: true,
								id: 0
							})
						} }>
							{
								this.state.just == null ? 
								<Image style={styles.idimg} source={ require('../../static/images/id1x3.png') } /> :
								<Image style={styles.idimg} source={{uri: this.state.just}} />
							}
						</TouchableOpacity>
						<Text style={{marginLeft: 20}}>{ i18n.t('id.id1') }</Text>
					</View>
					<View style={styles.idwrap}>
						<TouchableOpacity disabled={this.state.isBtn} onPress={ () => {
							this.setState({
								show: true,
								id: 1
							})
						} }>
							{
								this.state.back == null ? 
								<Image style={styles.idimg} source={ require('../../static/images/id2x3.png') } /> :
								<Image style={styles.idimg} name="img" source={{uri: this.state.back}} />
							}
						</TouchableOpacity>
						<Text style={{marginLeft: 20}}>{ i18n.t('id.id2') }</Text>
					</View>
					{
						this.state.type == 2 ?
						<Text style={{marginLeft: 15, marginRight: 15, marginTop: 10}}>{i18n.t('order.bohui')}{this.state.text}</Text> :
						null
					}
					<View style={styles.btnwrap}>
						<TouchableOpacity disabled={this.state.isBtn} style={styles.btn} onPress={this.uploadBtn}>
							<Text style={{color: '#fff'}}>{ i18n.t('bank.btn') }</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}

}

export default Idcard;