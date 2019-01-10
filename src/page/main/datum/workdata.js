import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, Image, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from "../../../static/style/loan2_style";
import Header from "../../../common/Header";
import ModalDropdown from 'react-native-modal-dropdown';

export default class Workdata extends Component {
	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		isZg: null, //是否自雇人士
	  		gsname: null, //公司名称
	  		gsdz: null, //辦公室地址
	  		gsphone: null, //办公室电话号码
	  		sr: null, //每月收入
	  		fs: null, //出量方式
	  		fsp: i18n.t('loan2.fsp'), //出量方式默认值
	  		fsarr: [i18n.t('loan2.clfs1'), i18n.t('loan2.clfs2'), i18n.t('loan2.clfs3')],
	  		xz: null, //公司业务性质
	  		xzp: i18n.t('loan2.xzp'), //公司业务性质
	  		xzarr: [],
	  		xzvalue: [],
	  		zy: null, //职业
	  		year: null, //工作年限
			month: null, //工作月份
	  	};
	}

	componentWillMount(){
		// 获取公司业务性质的选项
		fetch(API('/system/systemconfigsdetail'), {
			method: 'POST',
			body: signData({config_key: 'api_business'})
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
					xzarr: arr,
					xzvalue: arrvalue
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
				this.state.xzvalue.map( (item, index) => {
					if (item['id'] == response['results']['business']) {
						value = LAN ? item.title : item.title_en;			
					}
				} )
				this.state.fsarr.map( (item, index) => {
					if(index = parseInt(response['results']['grant']) - 1){
						this.setState({
							fsp: item
						})
					}
				} )
				this.setState({
					isZg: response['results']['is_self_employment'] == 1 ? true : false,
					gsname: response['results']['company_name'],
					gsdz: response['results']['company_address'],
					gsphone: response['results']['company_tel'],
					sr: response['results']['salary'].toString() == 0 ? null : response['results']['salary'].toString(),
					fs: response['results']['grant'],
					xz: response['results']['business'],
					xzp: value,
					zy: response['results']['job'],
					year: response['results']['work_year'].toString() == 0 ? null : response['results']['work_year'].toString(),
					month: response['results']['work_month'].toString() == 0 ? null : response['results']['work_month'].toString(),
				})
			}
		} )
	}

	onsubmit = () => {
		if(
			this.state.isZg == null ||
			this.state.gsname == null ||
			this.state.gsname == '' ||
			this.state.gsdz == null ||
			this.state.gsdz == '' ||
			this.state.gsphone == null ||
			this.state.gsphone == '' ||
			this.state.sr == '' ||
			this.state.sr == null ||
			this.state.fs == null ||
			this.state.xz == null ||
			this.state.zy == null ||
			this.state.zy == '' ||
			this.state.year == null ||
			this.state.year == '' ||
			this.state.month == null ||
			this.state.month == ''
		){
			Alert.alert(i18n.t('loan1.xinxi'))
			return false;
		}else{
			let from = signData();
			from.append('is_self_employment', this.state.isZg ? 1 : (!this.state.isZg ? 0 : null));
			from.append('company_name', this.state.gsname);
			from.append('company_address', this.state.gsdz);
			from.append('company_tel', this.state.gsphone);
			from.append('salary', this.state.sr);
			from.append('grant', this.state.fs);
			from.append('business', this.state.xz);
			from.append('job', this.state.zy);
			from.append('work_year', this.state.year);
			from.append('work_month', this.state.month);
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
				<Header title={i18n.t('renzheng.work')}/>
				<ScrollView style={{height: scrollViewHeight}}>
					{/*自僱人士*/}
					<View style={[styles.inputwrap, {marginTop: 10, marginBottom: 10}]}>
						<Text style={styles.label}>{ i18n.t('loan2.zg') }</Text>
						{/*单选框*/}
						<View style={styles.radioWrap}>
							<TouchableOpacity style={styles.radiotab} onPress={ () => {this.setState({isZg: true})} }>
								<View style={styles.radio}>
									<View style={ this.state.isZg ? styles.radiochild : null }></View>
								</View>
								<Text style={styles.radiotext}>{ i18n.t('loan2.zgy') }</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.radiotab} onPress={ () => {this.setState({isZg: false})} }>
								<View style={styles.radio}>
									<View style={ this.state.isZg == false ? styles.radiochild : null }></View>
								</View>
								<Text style={styles.radiotext}>{ i18n.t('loan2.zgn') }</Text>
							</TouchableOpacity>
						</View>
					</View>
					{/*公司名稱*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan2.gsname') }</Text>
						<TextInput defaultValue={this.state.gsname} style={styles.input} onChangeText={ (value) => this.setState({gsname: value}) } placeholder={ i18n.t('loan2.gsnamep') }/>
					</View>
					{/*办公室地址*/}
					<View style={styles.textareawrapb}>
						<Text style={styles.label}>{ i18n.t('loan2.gsdz') }</Text>
						<View style={styles.textbottom}>
							<TextInput defaultValue={this.state.gsdz} style={styles.textarea} multiline={true} onChangeText={ (value) => this.setState({gsdz: value}) } placeholder={ i18n.t('loan2.gsdzp') }/>
							<Text style={styles.textbottomcont}>{i18n.t('loan2.dztext')}</Text>
						</View>
					</View>
					{/*公司电话*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan2.gsphone') }</Text>
						<TextInput defaultValue={this.state.gsphone} style={styles.input} onChangeText={ (value) => this.setState({gsphone: value}) } keyboardType="numeric" placeholder={ i18n.t('loan2.gsphonep') }/>
					</View>
					{/*收入*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan2.sr') }</Text>
						<TextInput style={styles.input} defaultValue={this.state.sr} onChangeText={ (value) => this.setState({sr: value}) } keyboardType="numeric" placeholder={ i18n.t('loan2.srp') }/>
					</View>
					{/*收款方式*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan2.fs') }</Text>
						<ModalDropdown
							textStyle={styles.selectstyle}
							defaultValue={ this.state.fsp }
							style={styles.input} 
							dropdownStyle={styles.selectwrap}
							options={this.state.fsarr}
							onSelect={ (index, value) => {
								this.setState({fs: parseInt(index) + 1})
							} }/>
					</View>
					{/*公司性质*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan2.xz') }</Text>
						<ModalDropdown
							textStyle={styles.selectstyle}
							defaultValue={ this.state.xzp }
							style={styles.input} 
							dropdownStyle={styles.selectwrap}
							options={this.state.xzarr}
							onSelect={ (index, value) => {
								let arr = this.state.xzvalue;
								for(var i = 0; i < arr.length; i++){
									if( value == arr[i]['title'] || value == arr[i]['title_en'] ){
										this.setState({xz: arr[i]['id']})
									}
								}
							} }/>
					</View>
					{/*职业*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan2.zy') }</Text>
						<TextInput defaultValue={this.state.zy} style={styles.input} onChangeText={ (value) => this.setState({zy: value}) } placeholder={ i18n.t('loan2.zyp') }/>
					</View>
					{/*工作时间*/}
					<View style={styles.inputwrapyear}>
						<Text style={styles.label}>{ i18n.t('loan2.gz') }</Text>
						<View style={styles.yearwrap}>
							<View style={{flexDirection: 'row'}}>
								<View style={styles.y}>
									<TextInput defaultValue={this.state.year} style={styles.y_input} onChangeText={ (value) => this.setState({year: value}) } keyboardType="numeric" placeholder={ i18n.t('loan2.gzyear') }/>
									<Text>年</Text>
								</View>
								<View style={styles.m}>
									<TextInput defaultValue={this.state.month} style={styles.m_input} onChangeText={ (value) => this.setState({month: value}) } keyboardType="numeric" placeholder={ i18n.t('loan2.gzmm') }/>
									<Text>月</Text>
								</View>
							</View>
							<Text style={{fontSize: 12, marginTop: 15}}>{ i18n.t('loan2.gztext') }</Text>
						</View>
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