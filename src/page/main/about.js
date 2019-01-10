import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, Image, TouchableOpacity, ScrollView, Linking} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from "../../static/style/about_style";
import Header from "../../common/Header";

export default class About extends Component {
	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		about: null, //简介
	  		contact: [{}, {}, {}, {}], //联系我们
	  		tel: '', //电话号码
	  		quick: [], //快速借钱
	  		simple: [], //借款简单
	  		limit: [], //额度灵活
	  		multiple: [], //多种人群
	  		repayment: [], //还款方便
	  		help: [],
	  		helpID: null
	  	};
	}

	componentDidMount(){
		// 获取简介
		fetch(API('/system/systemconfigsdetail'), {
			method: 'POST',
			body: signData({
				config_key: LAN ? 'api_about_cn' : 'api_about_en'
			})
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				this.setState({
					about: response['results']['config_name']
				})
			}
		} )
		// 获取联系我们信息
		fetch(API('/system/systemconfigsdetail'), {
			method: 'POST',
			body: signData({
				config_key: 'api_contact'
			})
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				this.setState({
					contact: JSON.parse(response['results']['config_name']),
					tel: 'tel:' + JSON.parse(response['results']['config_name'])[4]['title']
				})
			}
		} )
		// 获取主要功能信息
		fetch(API('/system/systemconfigsdetail'), {
			method: 'POST',
			body: signData({
				config_key: 'api_quick_loan'
			})
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				this.setState({
					quick: JSON.parse(response['results']['config_name'])
				})
			}
		} )
		fetch(API('/system/systemconfigsdetail'), {
			method: 'POST',
			body: signData({
				config_key: 'api_loan_simple'
			})
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				this.setState({
					simple: JSON.parse(response['results']['config_name'])
				})
			}
		} )
		fetch(API('/system/systemconfigsdetail'), {
			method: 'POST',
			body: signData({
				config_key: 'api_limit_flexible'
			})
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				this.setState({
					limit: JSON.parse(response['results']['config_name'])
				})
			}
		} )
		fetch(API('/system/systemconfigsdetail'), {
			method: 'POST',
			body: signData({
				config_key: 'api_multiple_crowd'
			})
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				this.setState({
					multiple: JSON.parse(response['results']['config_name'])
				})
			}
		} )
		fetch(API('/system/systemconfigsdetail'), {
			method: 'POST',
			body: signData({
				config_key: 'api_repayment_convenient'
			})
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				this.setState({
					repayment: JSON.parse(response['results']['config_name'])
				})
			}
		} )
		// 获取帮助列表
		fetch(API('/content/help'), {
			method: 'POST',
			body: signData()
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				this.setState({
					help: response['results']
				})
			}
		} )
	}

	textHtml = (data) => {
		return data.map((item, index) => {
			return (
				<Text style={ index == 0 ? styles.texttitle : styles.textlist }>{ LAN ? item.title : item.title_en }</Text>
			)
		})
	}

	helpList = (data) => {
		return data.map( (item, index) => {
			return (
				<View>
					<TouchableOpacity style={styles.helplist} onPress={ () => {
						this.setState({
							helpID: item['id']
						})
					} }>
						<Text style={styles.helplisttitle}>{ LAN ? item['title'] : item['title_en'] }</Text>
						<Image style={styles.helplisticon} source={require('../../static/images/icon/right.png')} />
					</TouchableOpacity>
					{ this.state.helpID == item['id'] ? <Text style={styles.helpcont}>{ LAN ? item['content'] : item['content_en'] }</Text> : null }
				</View>
			);
		} )
	}

	render(){
		return(
			<View>
				<Header title={i18n.t('about.title')}/>
				<ScrollView style={{height: scrollViewHeight}}>
					<Text style={styles.about}>        {this.state.about}</Text>	
					<Text style={styles.title}>{i18n.t('about.gn')}</Text>
					<View style={styles.gongnengwrap}>
						<View style={styles.gntop}>
							<View style={styles.gntopchild}>
								<Image style={{width: 70, height: 50}} source={require('../../static/images/icon/jieqian.png')} />
								{ this.textHtml(this.state.quick) }
							</View>
							<Text style={{width: 2, height: 155, backgroundColor: '#f5f5f5'}}></Text>
							<View style={styles.gntopchild}>
								<Image style={{width: 52, height: 60}} source={require('../../static/images/icon/jiandan.png')} />
								{ this.textHtml(this.state.simple) }
							</View>
						</View>
						<View style={styles.gnbottom}>
							<View style={styles.gntopchild}>
								<Image style={{width: 65, height: 46}} source={require('../../static/images/icon/edu.png')} />
								{ this.textHtml(this.state.limit) }
							</View>
							<Text style={{width: 2, height: 155, backgroundColor: '#f5f5f5'}}></Text>
							<View style={styles.gntopchild}>
								<Image style={{width: 65, height: 56}} source={require('../../static/images/icon/renqun.png')} />
								{ this.textHtml(this.state.multiple) }
							</View>
							<Text style={{width: 2, height: 155, backgroundColor: '#f5f5f5'}}></Text>
							<View style={styles.gntopchild}>
								<Image style={{width: 50, height: 57}} source={require('../../static/images/icon/fangbian.png')} />
								{ this.textHtml(this.state.repayment) }
							</View>
						</View>
					</View>
					<Text style={styles.title}>{i18n.t('about.lx')}</Text>
					<View style={styles.lianxi}>
						<View style={styles.wx}>
							<Image style={{width: 60, height: 60, marginRight: 15}} source={require('../../static/images/lianxi.png')} />
							<Text numberOfLines={10}>
								{ LAN ? this.state.contact[0]['title'] : this.state.contact[0]['title_en'] }
							</Text>
						</View>
						<Text style={[styles.lxchild, styles.yx]} numberOfLines={10}>
							{ LAN ? this.state.contact[1]['title'] : this.state.contact[1]['title_en'] }
						</Text>
						<View style={[styles.lxchild, styles.tel]}>
							<Text style={styles.teltext} numberOfLines={10}>
								{ LAN ? this.state.contact[2]['title'] : this.state.contact[2]['title_en'] }
							</Text>
							<TouchableOpacity onPress={ () => { Linking.openURL(this.state.tel)} }>
								<Image style={{width: 20, height: 20}} source={require('../../static/images/icon/tel.png')} />
							</TouchableOpacity>
						</View>
						<Text numberOfLines={10} style={[styles.lxchild, styles.dz]}>
							{ LAN ? this.state.contact[3]['title'] : this.state.contact[3]['title_en'] }
						</Text>
					</View>
					<Text style={styles.title}>{i18n.t('about.help')}</Text>
					<View style={styles.helpwrap}>
						{ this.helpList(this.state.help) }
					</View>
				</ScrollView>
			</View>
		);
	}
}