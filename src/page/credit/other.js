import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { styles } from "../../static/style/other_style.js"
import { Actions } from 'react-native-router-flux';
import Header from "../../common/Header";
import Upload from "../components/upload";
import ImagePicker from 'react-native-image-picker';
import { config } from "../../common/uploadConfig";

export default class Other extends Component {
	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		show: false,
	  		img: [],
	  		imgUrl: [],
	  		isBtn: false
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
					imgUrl: arr,
					isBtn: true
				})
			}
		} )
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
					let arr = this.state.imgUrl;
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
					let arr = this.state.imgUrl;
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
		let params = {
			category_id: this.props.id,
			pic_jsons: JSON.stringify(this.state.img)
		}
		fetch(API('/authentications/add'), {
			method: 'POST',
			body: signData(params)
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				if(this.props.orderID == undefined){
					Actions.xin({reset: true})
					Actions.reset('xin');
				}else{
					Actions.main({'tost': false});
					Actions.sign({'orderID': this.props.orderID});
				}
			}
		} )
	}

	imgHtml = () => {
		return this.state.imgUrl.map( (item, index) => {
			return(
				<View style={[styles.list]}>
					<View style={[styles.add, styles.listcont]}>
						<Image style={styles.uploadimg} source={{uri: item}}/>
						<Text style={styles.uploadtext}>{ this.props.titleName }</Text>
					</View>
				</View>
			);
		} )
	}

	render(){
		return(
			<View>
				<Upload show={this.state.show} upload={this.upload}/>
				<Header title={this.props.titleName} />
				<ScrollView style={{height: scrollViewHeight}}>
					<View style={styles.uploadlist}>
						<View style={[styles.list]}>
							<View style={[styles.add, styles.listcont]}>
								<TouchableOpacity disabled={this.state.isBtn} onPress={ () => this.toUpload() }>
									<Image style={styles.uploadimg} source={ require('../../static/images/add_img.png') }/>
								</TouchableOpacity>
								<Text style={styles.uploadtext}>{i18n.t('bank.add')}</Text>
							</View>
						</View>
						{ this.imgHtml() }
					</View>
					<View style={styles.btnwrap}>
						<TouchableOpacity 
						disabled={this.state.img.length == 0 ? true : false || this.state.isBtn}
						style={styles.btn} onPress={ this.uploadBtn }>
							<Text style={{color: '#fff'}}>{ i18n.t('bank.btn') }</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}