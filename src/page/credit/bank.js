import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { styles } from "../../static/style/bank_style.js"
import { Actions } from 'react-native-router-flux';
import Header from "../../common/Header";
import Upload from "../components/upload";
import ImagePicker from 'react-native-image-picker';
import { config } from "../../common/uploadConfig";

class Bank extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		name: null,
	  		number: null,
	  		ok: false,
	  		show: false,
	  		img: [],
	  		isBtn: false,
	  		imgurl: [],
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
				let arr = [];
				response['results']['Imgs'].map( (item, index) => {
					arr.push(item['url'])
				} )
				this.setState({
					name: response['results']['input1'],
					number: response['results']['input2'],
					imgurl: arr,
					isBtn: true
				})
			}
		} )
	}

	ok = () => {
		this.setState({
			ok: !this.state.ok
		})
	}

	toUpload = () => {
		this.setState({
			show: true,
		})
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
					let arr = this.state.imgurl;
					arr.push(response['uri']);
					this.setState({
						imgurl: arr
					})
					this.uploadImg({
						uri: response['uri'],
						type: 'multiline/form-data',
						name: 'images.jpeg'
					})
				}
			})
		}else if(upload == 2){
			// 拍照上传
			ImagePicker.launchCamera(config, (response) => {
				if(response.didCancel){
					return false
				}else{
					let arr = this.state.imgurl;
					arr.push(response['uri']);
					this.setState({
						imgurl: arr
					})
					this.uploadImg({
						uri: response['uri'],
						type: 'multiline/form-data',
						name: 'images.jpeg'
					})
				}
			})
		}
	}

	// 上传图片
	uploadImg = (data) => {
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
				let arr = this.state.img;
				arr.push(response);
				this.setState({
					img: arr
				})
			}
		} )
	}

	//上傳
	uploadBtn = () => {
		let from = signData(params = {
			category_id: this.props.id,
			pic_jsons: JSON.stringify(this.state.img)
		})
		from.append('input1', this.state.name);
		from.append('input2', this.state.number);
		fetch(API('/authentications/add'), {
			method: 'POST',
			body: from
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
			}
		} )
	}

	uploadImgHtml = () => {
		if(this.state.imgurl.length == 0){
			return null
		}
		return this.state.imgurl.map((item, index) => {
			return(
				<View>
					<Image style={styles.uploadimg} source={{uri: item}}/>
					<Text style={styles.uploadtext}>{i18n.t('bank.num_start')}{index + 1}{i18n.t('bank.num_end')}</Text>
				</View>
			);
		})
	}

	render(){

		return(
			<View>
				<Upload show={this.state.show} upload={this.upload}/>
				<Header title={ i18n.t('bank.title') } />
				<ScrollView style={{height: scrollViewHeight}}>
					<View style={styles.inputwrap}> 
						<View style={styles.inputchild}>
							<Text style={styles.label}>{i18n.t('bank.name')}</Text>
							<TextInput style={styles.input} value={this.state.name} onChangeText={ (value) => this.setState({name: value}) } placeholder={ i18n.t('bank.namep') }/>
						</View>
						<View style={styles.inputchild}>
							<Text style={styles.label}>{i18n.t('bank.number')}</Text>
							<TextInput style={styles.input} value={this.state.number} onChangeText={ (value) => this.setState({number: value}) } keyboardType="numeric" placeholder={ i18n.t('bank.numberp') }/>
						</View>
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
							<Text style={styles.agrokcent}>{ i18n.t('bank.text1') }</Text>
							<Text style={styles.agrokcent}>{ i18n.t('bank.text2') }</Text>
							<Text style={styles.agrokcent}>{ i18n.t('bank.text3') }</Text>
							<Text style={styles.agrokcent}>{ i18n.t('bank.text4') }</Text>
						</View>
					</View>
					<View style={styles.uploadwrap}>
						<View style={styles.uploadchild}>
							<View>
								<TouchableOpacity disabled={this.state.isBtn} onPress={ () => this.toUpload() }>
									<Image style={styles.uploadimg} source={ require('../../static/images/add_img.png') }/>
								</TouchableOpacity>
								<Text style={styles.uploadtext}>{i18n.t('bank.add')}</Text>
							</View>
							{ this.uploadImgHtml() }
						</View>
					</View>
					<View style={styles.btnwrap}>
						<TouchableOpacity disabled={this.state.isBtn || !this.state.ok} style={styles.btn} onPress={ this.uploadBtn }>
							<Text style={{color: '#fff'}}>{ i18n.t('bank.btn') }</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}

}

export default Bank;