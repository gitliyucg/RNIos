import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, Image, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from "../../../static/style/loan2_style";
import Header from "../../../common/Header";
import ModalDropdown from 'react-native-modal-dropdown';

export default class Zhuzhai extends Component {
	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		dz: null, //住宅地址
	  		dh: null, //住宅電話
	  		zk: null,
	  		zkp: i18n.t('loan2.zkp'), //住宅状况
	  		zkarr: [],
	  		zkvalue: [],
	  		gk: null, //每月按揭供款
	  	};
	}

	componentWillMount(){
		// 获取住宅类型的选项
		fetch(API('/system/systemconfigsdetail'), {
			method: 'POST',
			body: signData({config_key: 'api_house_type'})
		}).then( (response) => response.json() ).then( (data) => {
			if(data['err_no'] == 0){
				let arr = [];
				let arrvalue = JSON.parse(data['results']['config_name']);
				if(LAN){
					for(var i = 0; i < arrvalue.length; i++){
						arr.push(arrvalue[i]['title'])
					}
				}else {
					for(var i = 0; i < arrvalue.length; i++){
						arr.push(arrvalue[i]['title_en'])
					}
				}
				this.setState({
					zkarr: arr,
					zkvalue: arrvalue
				})
			}
		} )
		// 获取详情
		fetch(API('/users/userinfo_detail'), {
			method: 'POST',
			body: signData()
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				let value = '';
				this.state.zkvalue.map( (item, index) => {
					if (item['id'] == response['results']['house_type']) {
						value = LAN ? item.title : item.title_en;			
					}
				} )
				this.setState({
					dz: response['results']['house_address'],
					dh: response['results']['house_tel'],
					zk: response['results']['house_type'],
					zkp: value,
					gk: response['results']['house_pay'].toString()
				})
			}
		} )
	}

	onsubmit = () => {
		if(
			this.state.dz == null ||
			this.state.dz == '' ||
			this.state.dh == null ||
			this.state.dh == '' ||
			this.state.zkp == i18n.t('loan2.zkp')
		){
			Alert.alert(i18n.t('loan1.xinxi'));
			return false;
		}else{
			let from = signData();
			from.append('house_address', this.state.dz);
			from.append('house_tel', this.state.dh);
			from.append('house_type', this.state.zk);
			from.append('house_pay', this.state.gk ==null || this.state.gk == '' ? 0 : this.state.gk);
			fetch(API('/users/edit'), {
				method: 'POST',
				body: from
			}).then( (res) => res.json() ).then( (response) => {
				if(response['err_no'] == 0){
					Actions.pop();
				}
			} )
		}
	}

	render(){
		return(
			<View style={main}>
				<Header title={i18n.t('renzheng.zhuzhai')}></Header>
				<ScrollView style={{height: scrollViewHeight}}>
					{/*住宅地址*/}
					<View style={styles.textareawrapb}>
						<Text style={styles.label}>{ i18n.t('loan2.dz') }</Text>
						<View style={styles.textbottom}>
							<TextInput defaultValue={this.state.dz} style={styles.textarea} multiline={true} value={this.state.dz} onChangeText={ (value) => this.setState({dz: value}) } placeholder={ i18n.t('loan2.dzp') }/>
							<Text style={styles.textbottomcont}>{i18n.t('loan2.dztext')}</Text>
						</View>
					</View>
					{/*住宅电话*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan2.dh') }</Text>
						<TextInput defaultValue={this.state.dh} style={styles.input} value={this.state.dh} onChangeText={ (value) => this.setState({dh: value}) } keyboardType="numeric" placeholder={ i18n.t('loan2.dhp') }/>
					</View>
					{/*住宅状况*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan2.zk') }</Text>
						<ModalDropdown
							textStyle={styles.selectstyle}
							defaultValue={ this.state.zkp }
							style={styles.input} 
							dropdownStyle={styles.selectwrap}
							options={this.state.zkarr}
							onSelect={ (index, value) => {
								let arr = this.state.zkvalue;
								for(var i = 0; i < arr.length; i++){
									if( value == arr[i]['title'] || value == arr[i]['title_en'] ){
										this.setState({zk: arr[i]['id']})
									}
								}
							} }/>
					</View>
					{/*按揭供款*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan2.gk') }</Text>
						<TextInput defaultValue={this.state.gk} style={styles.input} onChangeText={ (value) => this.setState({gk: value}) } keyboardType="numeric" placeholder={ i18n.t('loan2.gkp') }/>
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 25}}>
						<TouchableOpacity onPress={ this.onsubmit } style={{width: 170, height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7ba14', borderRadius: 10}}>
							<Text style={{color: '#fff'}}>{ i18n.t('renzheng.btn') }</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}