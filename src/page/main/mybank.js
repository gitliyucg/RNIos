import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { styles } from "../../static/style/bank_style.js"
import { Actions } from 'react-native-router-flux';
import Header from "../../common/Header";
import Upload from "../components/upload";
import ImagePicker from 'react-native-image-picker';
import { config } from "../../common/uploadConfig";
import Nodata from "../components/nodata";

class Mybank extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		name: null,
	  		number: null,
	  		show: false,
	  		img: [],
	  		isBtn: false,
	  		imgurl: [],
	  		ID: null,
	  		CID: null
	  	};
	}

	componentDidMount(){
		// 获取银行卡列表
		fetch(API('/authentications/bank'), {
			method: 'POST',
			body: signData()
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				if(response['results'] == null){
					this.setState({
						ID: 0,
					})
				}else{
					this.setState({
						ID: response['results'][0]['id'],
						CID: response['results'][0]['category_id'],
					})
					// 首次进入获取详情
					fetch(API('/authentications/detail'), {
						method: 'POST',
						body: signData({
							id: response['results'][0]['id']
						})
					}).then( (res) => res.json() ).then( (response) => {
						if(response['err_no'] == 0){
							let arr = [];
							let img = [];
							response['results']['Imgs'].map( (item, index) => {
								arr.push(item['url'])
							} )
							response['results']['Images'].map( (item, index) => {
								img.push(JSON.parse(item['pic_json']))
							} )
							this.setState({
								name: response['results']['input1'],
								number: response['results']['input2'],
								imgurl: arr,
								img: img
							})
						}
					} )
				}
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

	//修改
	editBtn = () => {
		let from = signData({id: this.state.ID});
		from.append('category_id', this.state.CID);
		from.append('pic_jsons', JSON.stringify(this.state.img));
		from.append('input1', this.state.name);
		from.append('input2', this.state.number);
		fetch(API('/authentications/edit'), {
			method: 'POST',
			body: from
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				Actions.pop()
			}
		} )
	}
	// 刪除
	deleteBtn = () => {
		fetch(API('/authentications/delete'), {
			method: 'POST',
			body: signData({id: this.state.ID})
		}).then( (res) => res.json() ).then( (response) => {
			if (response['err_no'] == 0) {
				Actions.pop();
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

	bankHtml = () => {
		return(
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
				<Text style={{margin: 15, width: WIDTH - 30}}>{ i18n.t('mybank.text') }</Text>
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
				<View style={styles.editbtnwrap}>
					<TouchableOpacity style={styles.editbtn1} onPress={ this.editBtn }>
						<Text style={{color: '#fff'}}>{ i18n.t('mybank.btn1') }</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.editbtn2} onPress={ this.deleteBtn }>
						<Text style={{color: '#fff'}}>{ i18n.t('mybank.btn2') }</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}

	render(){

		return(
			<View>
				<Upload show={this.state.show} upload={this.upload}/>
				<Header title={ i18n.t('mybank.title') } />
				{
					this.state.ID == 0 ? <Nodata/> : this.bankHtml()
				}
			</View>
		);
	}

}

export default Mybank;