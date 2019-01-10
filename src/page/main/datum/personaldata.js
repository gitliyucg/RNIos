import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, Image, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from "../../../static/style/personaldata_style";
import Header from "../../../common/Header";
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from "react-native-datepicker";

export default class Personaldata extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		isSex: null, //性别
	  		date: new Date(), //出生日期
	  		isPochan: null, //是否破产
	  		xing: null, //姓氏
	  		name: null, //名字
	  		numberID: null, //身份证号码
	  		emaili: null, //邮箱地址
	  		xl: '', //学历
	  		xlv: [], //学历
	  		xlvalue: [],
	  		xlp: ''
	  	};
	}

	componentWillMount(){
		// 获取学历的选项
		let params2 = {config_key: 'api_education'}
		fetch(API('/system/systemconfigsdetail'), {
			method: 'POST',
			body: signData(params2)
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
					xlv: arr,
					xlvalue: arrvalue
				})
			}
		} )
		// 获取详情
		fetch(API('/users/userinfo_detail'), {
			method: 'POST',
			body: signData()
		}).then( (res) => res.json() ).then( (response) => {
			console.log(response);
			if(response['err_no'] == 0){
				let value = '';
				this.state.xlvalue.map( (item, index) => {
					if (item['id'] == response['results']['education']) {
						value = LAN ? item.title : item.title_en;			
					}
				} )
				this.setState({
					xing: response['results']['last_name'],
					name: response['results']['first_name'],
					numberID: response['results']['id_card'],
					emaili: response['results']['email'],
					date: response['results']['birthday'].split('T')[0] == '0001-01-01' ? '1990-01-01' : response['results']['birthday'].split('T')[0],
					isSex: response['results']['gender'] == 1 ? true : (response['results']['gender'] == 2 ? false : null),
					isPochan: response['results']['is_bankruptcy'] == 0 ? false : (response['results']['is_bankruptcy'] == 1 ? true : null),
					xl: response['results']['education'],
					xlp: value
				})
			}
		} )
	}

	// 选择性别
	changeSex = (index) => {
		if(index == 0){
			this.setState({
				isSex: true
			})
		}else{
			this.setState({
				isSex: false
			})
		}
	}

	// 选择是否破产
	pochan = (index) => {
		if(index == 0){
			this.setState({
				isPochan: true
			})
		}else{
			this.setState({
				isPochan: false
			})
		}
	}

	//修改
	onsubmit = () => {
		if (this.state.xing == null ||
			this.state.xing == '' || 
			this.state.name == null || 
			this.state.name == '' || 
			this.state.isSex == null || 
			this.state.isPochan == null || 
			this.state.numberID == null || 
			this.state.numberID == '' || 
			this.state.emaili == null ||
			this.state.emaili == '' ||
			this.state.xl == i18n.t('loan1.xlp')
		) {
			Alert.alert(i18n.t('loan1.xinxi'));
			return false;
		}else if(!HKID(this.state.numberID)){
			Alert.alert(i18n.t('loan1.idnum'))
			return false;
		}else {
			let from = signData();
			from.append('last_name', this.state.xing);
			from.append('first_name', this.state.name);
			from.append('gender', this.state.isSex ? 1 : 2);
			from.append('id_card', this.state.numberID);
			from.append('email', this.state.emaili);
			from.append('is_bankruptcy', this.state.isPochan ? 1 : 0);
			from.append('education', this.state.xl);
			from.append('birthday', this.state.date + ' 00:00:00');
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
				<Header title={i18n.t('renzheng.geren')} />
				<ScrollView style={{height: scrollViewHeight}}>
					{/*英文姓名*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan1.xm') }</Text>
						<TextInput defaultValue={this.state.xing} style={styles.inputXing} onChangeText={ (value) => this.setState({xing: value}) } placeholder={ i18n.t('loan1.xp') }/>
						<TextInput defaultValue={this.state.name} style={styles.inputMing} onChangeText={ (value) => this.setState({name: value}) } placeholder={ i18n.t('loan1.mp') }/>
					</View>
					{/*性别*/}
					<View style={[styles.inputwrap, {marginTop: 10, marginBottom: 10}]}>
						<Text style={styles.label}>{ i18n.t('loan1.sex') }</Text>
						{/*单选框*/}
						<View style={styles.radioWrap}>
							<TouchableOpacity style={styles.radiotab} onPress={ () => this.changeSex(0) }>
								<View style={styles.radio}>
									<View style={ this.state.isSex ? styles.radiochild : null }></View>
								</View>
								<Text style={styles.radiotext}>{ i18n.t('loan1.l') }</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.radiotab} onPress={ () => this.changeSex(1) }>
								<View style={styles.radio}>
									<View style={ this.state.isSex == false ? styles.radiochild : null }></View>
								</View>
								<Text style={styles.radiotext}>{ i18n.t('loan1.n') }</Text>
							</TouchableOpacity>
						</View>
					</View>
					{/*身份证号码*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan1.id') }</Text>
						<TextInput defaultValue={this.state.numberID} style={styles.input} onChangeText={ (value) => this.setState({numberID: value}) } placeholder={ i18n.t('loan1.idp') }/>
					</View>
					{/*邮箱*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan1.em') }</Text>
						<TextInput defaultValue={this.state.emaili} style={styles.input} onChangeText={ (value) => this.setState({emaili: value}) } placeholder={ i18n.t('loan1.emp') }/>
					</View>
					{/*出生日期*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan1.date') }</Text>
						<DatePicker
							style={{flex: 1}}
							date={this.state.date}
							customStyles={{
								dateIcon: {
								},
								dateInput: {
									borderWidth: 0,
									alignItems: 'flex-start',
									height: 30,
									borderBottomWidth: 1,
									borderBottomColor: '#cdcdcd'
								}
							}}
							mode="date"
							format="YYYY-MM-DD"
							confirmBtnText="確定"
							cancelBtnText="取消"
							showIcon={true}
							onDateChange={ (value) => this.setState({date: value}) }
						/>
					</View>
					{/*破产记录*/}
					<View style={[styles.inputpochan, {marginTop: 10, marginBottom: 10}]}>
						<Text style={styles.label}>{ i18n.t('loan1.po') }</Text>
						{/*单选框*/}
						<View style={styles.pochan}>
							<View style={styles.radioWrap}>
								<TouchableOpacity style={styles.radiotab} onPress={ () => this.pochan(0) }>
									<View style={styles.radio}>
										<View style={ this.state.isPochan ? styles.radiochild : null }></View>
									</View>
									<Text style={styles.radiotext}>{ i18n.t('loan1.poy') }</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.radiotab} onPress={ () => this.pochan(1) }>
									<View style={styles.radio}>
										<View style={ this.state.isPochan == false ? styles.radiochild : null }></View>
									</View>
									<Text style={styles.radiotext}>{ i18n.t('loan1.pon') }</Text>
								</TouchableOpacity>
							</View>
							<Text style={styles.pochantext}>{ i18n.t('loan1.ispo') }</Text>
						</View>
					</View>
					{/*学历*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan1.xueli') }</Text>
						<ModalDropdown
							textStyle={styles.selectstyle}
							defaultValue={ this.state.xlp }
							style={styles.input} 
							dropdownStyle={styles.selectwrap}
							options={this.state.xlv}
							onSelect={ (index, value) => {
								let arr = this.state.xlvalue;
								for(var i = 0; i < arr.length; i++){
									if( value == arr[i]['title'] || value == arr[i]['title_en'] ){
										this.setState({xl: arr[i]['id']})
									}
								}
							} }/>
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