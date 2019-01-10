import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, Picker, ScrollView, Alert } from 'react-native';
import { styles } from "../../static/style/loan1_style.js"
import { Actions } from 'react-native-router-flux';
import Header from "../../common/Header";
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from "react-native-datepicker";

const succIcon = <Image style={styles.stateicon} source={require("../../static/images/icon/succicon.png")}/>;

class Loan1 extends Component{

	constructor(props) {
	  	super(props);
	  	
	  	this.state = {
	  		UID: this.props.ID,
	  		title: 'loan1.' + this.props.loan, //头部标题
	  		loanState: this.props.loan == 'wu' ? true : false, //有抵押贷款还是无抵押贷款true为无抵押flase为有抵押
	  		price: this.props.price == undefined ? null : this.props.price.toString(), //贷款金额
	  		isPrice: this.props.price == undefined ? false : true, //判断金额输入框是否禁用
	  		isSex: null, //性别
	  		date: new Date(), //出生日期
	  		isPochan: null, //是否破产
	  		gk: this.props.month == undefined ? i18n.t('loan1.gkp') : this.props.month, //供款期
	  		isGk: this.props.month == undefined ? false : true, //判断供款期是否需要禁用
	  		md: i18n.t('loan1.mdp'), //贷款目的
	  		xing: null, //姓氏
	  		name: null, //名字
	  		numberID: null, //身份证号码
	  		emaili: null, //邮箱地址
	  		xl: null, //学历
	  		pricev: [], //贷款金额
	  		pricevalue: [],
	  		mdv: [], //贷款目的
	  		mdvalue: [],
	  		xlv: [], //学历
	  		xlvalue: [],
	  		xlp: i18n.t('loan1.xlp'),
	  	};
	}

	componentWillMount(){
		// 获取供款期的选项
		let params = {config_key: 'api_loan_stage'}
		fetch(API('/system/systemconfigsdetail'), {
			method: 'POST',
			body: signData(params)
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
					pricev: arr,
					pricevalue: arrvalue
				})
			}
		} )
		// 获取贷款目的的选项
		let params1 = {config_key: 'api_loan_purpose'}
		fetch(API('/system/systemconfigsdetail'), {
			method: 'POST',
			body: signData(params1)
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
					mdv: arr,
					mdvalue: arrvalue
				})
			}
		} )
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
			if(response['err_no'] == 0){
				let value = this.state.xlp;
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

	// 下一步
	onsubmit = () => {
		if (this.state.xing == null ||
			this.state.xing == '' || 
			this.state.name == null || 
			this.state.name == '' || 
			this.state.price == null || 
			this.state.price == '' || 
			this.state.isSex == null || 
			this.state.isPochan == null || 
			this.state.numberID == null || 
			this.state.numberID == '' || 
			this.state.emaili == null ||
			this.state.emaili == '' ||
			this.state.gk == i18n.t('loan1.gkp') ||
			this.state.md == i18n.t('loan1.mdp') ||
			this.state.xl == i18n.t('loan1.xlp')
		) {
			Alert.alert(i18n.t('loan1.xinxi'));
			return false;
		}else if(!HKID(this.state.numberID)){
			Alert.alert(i18n.t('loan1.idnum'))
			return false;
		}else {
			let params = {
				order_type: this.state.loanState ? 0 : 1,
				gender: this.state.isSex ? 1 : 2,
				birthday: this.state.date + ' 00:00:00',
				price: this.state.price,
				loan_stage: this.state.gk,
				loan_purpose: this.state.md,
				last_name: this.state.xing,
				first_name: this.state.name,
				id_card: this.state.numberID,
				email: this.state.emaili,
				is_bankruptcy: this.state.isPochan ? 1 : 0,
				education: this.state.xl
			}
			Actions.loan2({'titlestate': this.state.title, 'loanstate': this.state.loanState, 'params': params, 'ID': this.props.ID})
		}
		// Actions.loan2({'titlestate': this.state.title, 'loanstate': this.state.loanState})
	}

	render(){
		return(
			<View>
				<Header title={i18n.t(this.state.title)} />
				<ScrollView style={{height: scrollViewHeight}}>
					<View style={styles.loanTitle}>
						<Text style={styles.loanTitleText}>{ i18n.t('loan1.title1') }</Text>
					</View>
					{/*贷款金额*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan1.price') }</Text>
						<TextInput style={styles.input} editable={ !this.state.isPrice } value={this.state.price} onChangeText={ (value) => this.setState({price: value}) } keyboardType="numeric" placeholder={ i18n.t('loan1.pricep') }/>
						<View style={styles.stateiconwrap}> 
							{ this.state.price != null && this.state.price != '' ? succIcon : null }
						</View>
					</View>
					{/*供款期*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan1.gk') }</Text>
						<ModalDropdown
							textStyle={styles.selectstyle}
							defaultValue={ this.state.gk }
							style={styles.input} 
							disabled={ this.state.isGk }
							dropdownStyle={styles.selectwrap}
							options={this.state.pricev}
							onSelect={ (index, value) => {
								let arr = this.state.pricevalue;
								for(var i = 0; i < arr.length; i++){
									if( value == arr[i]['title'] || value == arr[i]['title_en'] ){
										this.setState({gk: arr[i]['id']})
									}
								}
							} }/>
						<View style={styles.stateiconwrap}> 
							{ this.state.gk == i18n.t('loan1.gkp') ? null : succIcon }
						</View>
					</View>
					{/*目的*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan1.md') }</Text>
						<ModalDropdown
							textStyle={styles.selectstyle}
							defaultValue={ this.state.md }
							style={styles.input} 
							dropdownStyle={styles.selectwrap}
							options={this.state.mdv}
							onSelect={ (index, value) => {
								let arr = this.state.mdvalue;
								for(var i = 0; i < arr.length; i++){
									if( value == arr[i]['title'] || value == arr[i]['title_en'] ){
										this.setState({md: arr[i]['id']})
									}
								}
							} }/>
						<View style={styles.stateiconwrap}> 
							{ this.state.md == i18n.t('loan1.mdp') ? null : succIcon }
						</View>
					</View>
					<View style={[styles.loanTitle, {marginTop: 20}]}>
						<Text style={styles.loanTitleText}>{ i18n.t('loan1.title2') }</Text>
					</View>
					{/*英文姓名*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan1.xm') }</Text>
						<TextInput defaultValue={this.state.xing} style={styles.inputXing} onChangeText={ (value) => this.setState({xing: value}) } placeholder={ i18n.t('loan1.xp') }/>
						<TextInput defaultValue={this.state.name} style={styles.inputMing} onChangeText={ (value) => this.setState({name: value}) } placeholder={ i18n.t('loan1.mp') }/>
						<View style={styles.stateiconwrap}> 
							{ this.state.xing !== null && this.state.name !== null && this.state.xing != '' && this.state.name != '' ? succIcon : null }
						</View>
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
						<View style={styles.stateiconwrap}> 
							{this.state.isSex != null ? succIcon : null}							
						</View>
					</View>
					{/*身份证号码*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan1.id') }</Text>
						<TextInput defaultValue={this.state.numberID} style={styles.input} onChangeText={ (value) => this.setState({numberID: value}) } placeholder={ i18n.t('loan1.idp') }/>
						<View style={styles.stateiconwrap}> 
							{ this.state.numberID !== null && this.state.numberID != '' ? succIcon : null }
						</View>
					</View>
					{/*邮箱*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan1.em') }</Text>
						<TextInput defaultValue={this.state.emaili} style={styles.input} onChangeText={ (value) => this.setState({emaili: value}) } placeholder={ i18n.t('loan1.emp') }/>
						<View style={styles.stateiconwrap}> 
							{ this.state.emaili != null && this.state.emaili != '' ? succIcon : null }
						</View>
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
						<View style={styles.stateiconwrap}> 
							<Image style={styles.stateicon} source={require("../../static/images/icon/succicon.png")}/>
							{/*<Image style={styles.stateicon} source={require("../../static/images/icon/erricon.png")}/>*/}
						</View>
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
						<View style={styles.stateiconwrap}> 
							{this.state.isPochan != null ? succIcon : null}							
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
										this.setState({xl: arr[i]['id'], xlp: value})
									}
								}
							} }/>
						<View style={styles.stateiconwrap}> 
							{ this.state.xlp == i18n.t('loan1.xlp') ? null : succIcon }
						</View>
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 25}}>
						<TouchableOpacity onPress={ this.onsubmit } style={{width: 170, height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7ba14', borderRadius: 10}}>
							<Text style={{color: '#fff'}}>{ i18n.t('loan1.btn') }</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}

export default Loan1;