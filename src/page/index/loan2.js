import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, Picker, ScrollView, Alert } from 'react-native';
import { styles } from "../../static/style/loan2_style.js"
import { Actions } from 'react-native-router-flux';
import Header from "../../common/Header";
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from "react-native-datepicker";

const succIcon = <Image style={styles.stateicon} source={require("../../static/images/icon/succicon.png")}/>;

class Loan2 extends Component{

	constructor(props) {
	  	super(props);

	  	this.state = {
	  		title: i18n.t(this.props.titlestate),
	  		loanState: this.props.loanstate, //true为无抵押贷款false为有抵押贷款
	  		dz: null, //住宅地址
	  		dh: null, //住宅電話
	  		zkp: i18n.t('loan2.zkp'), //住宅状况
	  		zk: null,
	  		zkarr: [],
	  		zkvalue: [],
	  		gk: null, //每月按揭供款
	  		isZg: null, //是否自雇人士
	  		gsname: null, //公司名称
	  		gsdz: null, //辦公室地址
	  		gsphone: null, //办公室电话号码
	  		sr: null, //每月收入
	  		fs: null, //出量方式
	  		fsp: i18n.t('loan2.fsp'), //出量方式默认值
	  		fsarr: [i18n.t('loan2.clfs1'), i18n.t('loan2.clfs2'), i18n.t('loan2.clfs3')],
	  		xz: i18n.t('loan2.xzp'), //公司业务性质
	  		xzarr: [],
	  		xzvalue: [],
	  		zy: null, //职业
	  		dydz: null, //抵押住宅地址
	  		mj: null, //房屋实用面积
	  		ll: null, //楼龄
	  		fuzk: null, //房屋状况
	  		zujin: null, //房屋租金
	  		fuzx: null, //房屋債項 0时为头按 1时为二按 2时为三按 3时为其他 4时为没有
	  		zx1: null,
	  		zx2: null,
	  		zx3: null,
	  		zx4: null,
			year: null, //工作年限
			month: null, //工作月份
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
				let value = i18n.t('loan2.zkp');
				this.state.zkvalue.map( (item, index) => {
					if (item['id'] == response['results']['house_type']) {
						value = LAN ? item.title : item.title_en;			
					}
				} )
				let value2 = i18n.t('loan2.xzp');
				this.state.xzvalue.map( (item, index) => {
					if (item['id'] == response['results']['business']) {
						value2 = LAN ? item.title : item.title_en;			
					}
				} )
				this.state.fsarr.map( (item, index) => {
					if(index = parseInt(response['results']['grant']) - 1){
						this.setState({
							fsp: item
						})
					}
				} )
				let zx = response['results']['mortgages_status']
				this.setState({
					dz: response['results']['house_address'],
					dh: response['results']['house_tel'],
					zk: response['results']['house_type'],
					zkp: value,
					gk: response['results']['house_pay'].toString() == 0 ? null : response['results']['house_pay'].toString(),
					isZg: response['results']['is_self_employment'] == 1 ? true : false,
					gsname: response['results']['company_name'],
					gsdz: response['results']['company_address'],
					gsphone: response['results']['company_tel'],
					sr: response['results']['salary'].toString() == 0 ? null : response['results']['salary'].toString(),
					fs: response['results']['grant'],
					xz: response['results']['business'],
					xzp: value2,
					zy: response['results']['job'],
					year: response['results']['work_year'].toString() == 0 ? null : response['results']['work_year'].toString(),
					month: response['results']['work_month'].toString() == 0 ? null : response['results']['work_month'].toString(),
					dydz: response['results']['mortgage_address'],
					mj: response['results']['mortgage_area'].toString() == 0 ? null : response['results']['mortgage_area'].toString(),
					ll: response['results']['mortgage_age'].toString() == 0 ? null : response['results']['mortgage_age'].toString(),
					fuzk: response['results']['mortgages_status'] == 0 ? true : (response['results']['mortgages_status'] == 1 ? false : null),
					zujin: response['results']['mortgages_status'] == 1 ? response['results']['mortgages_rent'].toString() : null,
					fuzx: zx == 0 ? 4 : (zx == 1 ? 0 : (zx == 2 ? 1 : zx == 3 ? 2 : zx == 4 ? 3 : null)),
					zx1: zx == 1 ? response['results']['mortgages_loan_price'].toString() : null,
					zx2: zx == 2 ? response['results']['mortgages_loan_price'].toString() : null,
					zx3: zx == 3 ? response['results']['mortgages_loan_price'].toString() : null,
					zx4: zx == 4 ? response['results']['mortgages_loan_price'].toString() : null,
				})
			}
		} )
	
	}

	//下一步
	onsubmit = () => {
		// Actions.agreement()
		if(this.state.loanState){
			// 无抵押贷款的判断
			if(
				this.state.dz == null ||
				this.state.dz == '' ||
				this.state.dh == null ||
				this.state.dh == '' ||
				this.state.zkp == i18n.t('loan2.zkp') ||
				this.state.gk == null ||
				this.state.isZg == null ||
				this.state.gsname == null ||
				this.state.gsname == '' ||
				this.state.gsdz == null ||
				this.state.gsdz == '' ||
				this.state.gsphone == null ||
				this.state.gsphone == '' ||
				this.state.sr == null ||
				this.state.sr == '' ||
				this.state.fs == i18n.t('loan2.fsp') ||
				this.state.xz == i18n.t('loan2.xzp') ||
				this.state.zy == null ||
				this.state.zy == '' ||
				this.state.year == null ||
				this.state.year == '' ||
				this.state.month == null ||
				this.state.month == ''
			){
				Alert.alert(i18n.t('loan2.xinx'))
				return false;
			}else {
				let params = {
					house_address: this.state.dz,
					house_tel: this.state.dh,
					house_type: this.state.zk,
					house_pay: this.state.gk,
					is_self_employment: this.state.isZg ? 1 : 0,
					company_name: this.state.gsname,
					company_address: this.state.gsdz,
					company_tel: this.state.gsphone,
					salary: this.state.sr,
					grant: this.state.fs,
					business: this.state.xz,
					job: this.state.zy,
					work_year: this.state.year,
					work_month: this.state.month
				}
				Actions.agreement({'params': Object.assign(this.props.params, params), 'loanstate': this.state.loanState, 'ID': this.props.ID})
			}
		}else {
			// 有抵押贷款的判断
			if(
				this.state.dz == null ||
				this.state.dz == '' ||
				this.state.dh == null ||
				this.state.dh == '' ||
				this.state.zkp == i18n.t('loan2.zkp') ||
				this.state.gk == null ||
				this.state.isZg == null ||
				this.state.gsname == null ||
				this.state.gsname == '' ||
				this.state.gsdz == null ||
				this.state.gsdz == '' ||
				this.state.gsphone == null ||
				this.state.gsphone == '' ||
				this.state.sr == null ||
				this.state.sr == '' ||
				this.state.fs == i18n.t('loan2.fsp') ||
				this.state.xz == i18n.t('loan2.xzp') ||
				this.state.zy == null ||
				this.state.zy == '' ||
				this.state.year == null ||
				this.state.year == '' ||
				this.state.month == null ||
				this.state.month == '' ||
				this.state.dydz == '' ||
				this.state.dydz == null ||
				this.state.mj == null ||
				this.state.mj == '' ||
				this.state.ll == null ||
				this.state.ll == '' ||
				this.state.fuzk == null ||
				this.state.fuzx == null
			){
				Alert.alert(i18n.t('loan2.xinx'))
				return false;
			}else if(!this.state.fuzk && this.state.zujin == null || this.state.zujin == ''){
				// 判断房屋状况是否通过
				Alert.alert(i18n.t('loan2.xinx'))
				return false;
			}else if(this.state.fuzx == 0 && this.state.zx1 == null || this.state.zx1 == ''){
				// 判断房屋债项是否通过
				Alert.alert(i18n.t('loan2.xinx'))
				return false;
			}else if(this.state.fuzx == 1 && this.state.zx2 == null || this.state.zx2 == ''){
				// 判断房屋债项是否通过
				Alert.alert(i18n.t('loan2.xinx'))
				return false;
			}else if(this.state.fuzx == 2 && this.state.zx3 == null || this.state.zx3 == ''){
				// 判断房屋债项是否通过
				Alert.alert(i18n.t('loan2.xinx'))
				return false;
			}else if(this.state.fuzx == 3 && this.state.zx4 == null || this.state.zx4 == ''){
				// 判断房屋债项是否通过
				Alert.alert(i18n.t('loan2.xinx'))
				return false;
			}else {
				let zx = this.state.fuzx == 0 ? this.state.zx1 : (this.state.fuzx == 1 ? this.state.zx2 : (this.state.fuzx == 2 ? this.state.zx3 : (this.state.fuzx == 3 ? this.state.zx4 : 0)))
				Actions.agreement({'params': Object.assign({
					house_address: this.state.dz,
					house_tel: this.state.dh,
					house_type: this.state.zk,
					house_pay: this.state.gk,
					is_self_employment: this.state.isZg ? 1 : 0,
					company_name: this.state.gsname,
					company_address: this.state.gsdz,
					company_tel: this.state.gsphone,
					salary: this.state.sr,
					grant: this.state.fs,
					business: this.state.xz,
					job: this.state.zy,
					work_year: this.state.year,
					work_month: this.state.month
				}, this.props.params), 'params1': {
					mortgage_address: this.state.dydz,
					mortgage_area: this.state.mj,
					mortgage_age: this.state.ll,
					mortgages_status: this.state.fuzk ? 0 : 1,
					mortgages_rent: !this.state.fuzk ? this.state.zujin : 0,
					mortgages_loan_price: zx,
					mortgages_loan: this.state.fuzx == 0 ? 1 : (this.state.fuzx == 1 ? 2 : (this.state.fuzx == 2 ? 3 : (this.state.fuzx == 3 ? 4 : this.state.fuzx == 4 ? 0 : null))),
				}, 'loanstate': this.state.loanState, 'ID': this.props.ID})
			}
		}
	}

	render(){
		return(
			<View>
				<Header title={this.state.title}/>
				<ScrollView style={{height: scrollViewHeight}}>
					<View style={styles.loanTitle}>
						<Text style={styles.loanTitleText}>{ i18n.t('loan2.title1') }</Text>
					</View>
					{/*住宅地址*/}
					<View style={styles.textareawrapb}>
						<Text style={styles.label}>{ i18n.t('loan2.dz') }</Text>
						<View style={styles.textbottom}>
							<TextInput style={styles.textarea} multiline={true} defaultValue={this.state.dz} onChangeText={ (value) => this.setState({dz: value}) } placeholder={ i18n.t('loan2.dzp') }/>
							<Text style={styles.textbottomcont}>{i18n.t('loan2.dztext')}</Text>
						</View>
						<View style={styles.stateiconwrap}> 
							{ this.state.dz != null && this.state.dz != '' ? succIcon : null }
						</View>
					</View>
					{/*住宅电话*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan2.dh') }</Text>
						<TextInput style={styles.input} defaultValue={this.state.dh} onChangeText={ (value) => this.setState({dh: value}) } keyboardType="numeric" placeholder={ i18n.t('loan2.dhp') }/>
						<View style={styles.stateiconwrap}> 
							{ this.state.dh != null && this.state.dh != '' ? succIcon : null }
						</View>
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
										this.setState({zk: arr[i]['id'], zkp: value})
									}
								}
							} }/>
						<View style={styles.stateiconwrap}> 
							{ this.state.zkp == i18n.t('loan2.zkp') ? null : succIcon }
						</View>
					</View>
					{/*按揭供款*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan2.gk') }</Text>
						<TextInput style={styles.input} defaultValue={this.state.gk} onChangeText={ (value) => this.setState({gk: value}) } keyboardType="numeric" placeholder={ i18n.t('loan2.gkp') }/>
						<View style={styles.stateiconwrap}> 
							{ this.state.gk != null && this.state.gk != '' ? succIcon : null }
						</View>
					</View>
					{/*有抵押贷款时出现*/}
					<View style={{ display: !this.state.loanState ? null : 'none' }}>
						<View style={[styles.loanTitle, {marginTop: 20}]}>
							<Text style={styles.loanTitleText}>{ i18n.t('loan2.title3') }</Text>
						</View>
						{/*住宅地址*/}
						<View style={styles.textareawrapb}>
							<Text style={styles.label}>{ i18n.t('loan2.dydz') }</Text>
							<View style={styles.textbottom}>
								<TextInput style={styles.textarea} multiline={true} defaultValue={this.state.dydz} onChangeText={ (value) => this.setState({dydz: value}) } placeholder={ i18n.t('loan2.dydzp') }/>
								<Text style={styles.textbottomcont}>{i18n.t('loan2.dytext')}</Text>
							</View>
							<View style={styles.stateiconwrap}> 
								{ this.state.dydz != null && this.state.dydz != '' ? succIcon : null }
							</View>
						</View>
						{/*房屋面积*/}
						<View style={styles.inputwrap}>
							<Text style={styles.label}>{ i18n.t('loan2.mj') }</Text>
							<TextInput style={styles.input} defaultValue={this.state.mj} onChangeText={ (value) => this.setState({mj: value}) } keyboardType="numeric" placeholder={ i18n.t('loan2.mjp') }/>
							<View style={styles.stateiconwrap}> 
								{ this.state.mj != null && this.state.mj != '' ? succIcon : null }
							</View>
						</View>
						{/*楼龄*/}
						<View style={styles.inputwrap}>
							<Text style={styles.label}>{ i18n.t('loan2.ll') }</Text>
							<TextInput style={styles.input} defaultValue={this.state.ll} onChangeText={ (value) => this.setState({ll: value}) } keyboardType="numeric" placeholder={ i18n.t('loan2.llp') }/>
							<View style={styles.stateiconwrap}> 
								{ this.state.ll != null && this.state.ll != '' ? succIcon : null }
							</View>
						</View>
						{/*房屋状况*/}
						<View style={[styles.inputwrap, {marginTop: 10, marginBottom: 10}]}>
							<Text style={styles.label}>{ i18n.t('loan2.fuzk') }</Text>
							{/*单选框*/}
							<View style={styles.radioWrap}>
								<TouchableOpacity style={styles.radiotabtwo} onPress={ () => {this.setState({fuzk: true, zujin: null})} }>
									<View style={styles.radio}>
										<View style={ this.state.fuzk ? styles.radiochild : null }></View>
									</View>
									<Text>{ i18n.t('loan2.fuzy') }</Text>
								</TouchableOpacity>
								<TouchableOpacity style={[styles.radiotabtwo, {marginLeft: 10}]} onPress={ () => {this.setState({fuzk: false})} }>
									<View style={styles.radio}>
										<View style={ this.state.fuzk == false ? styles.radiochild : null }></View>
									</View>
									<Text>{ i18n.t('loan2.fucz') }</Text>
									<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
										<Text>(</Text>
										<Text>{ i18n.t('loan2.fuzj') }</Text>
										<TextInput 
											editable={ this.state.fuzk == null || this.state.fuzk == true ? false : true }
											style={{width: 50, height: 20, padding: 0, borderBottomWidth: 1, borderBottomColor: '#d2d2d2'}} 
											defaultValue={this.state.zujin} 
											onChangeText={ (value) => this.setState({zujin: value}) } 
											keyboardType="numeric" 
											/>
										<Text>)</Text>
									</View>
								</TouchableOpacity>
							</View>
							<View style={styles.stateiconwrap}> 
								{ this.state.fuzk != null && this.state.fuzk ? succIcon : ( !this.state.fuzk && this.state.zujin != null && this.state.zujin != '' ? succIcon : null ) }
							</View>
						</View>
						{/*債項*/}
						<View style={[styles.inputwrapzx, {marginTop: 10, marginBottom: 10}]}>
							<Text style={styles.label}>{ i18n.t('loan2.fuzx') }</Text>
							{/*单选框*/}
							<View style={{flex: 1, flexDirection: 'column'}}>
								<View style={styles.radioWrap}>
									<TouchableOpacity style={[styles.radiotabtwo]} onPress={ () => {this.setState({fuzx: 0, zx2: null, zx3: null, zx4: null})} }>
										<View style={styles.radio}>
											<View style={ this.state.fuzx == 0 ? styles.radiochild : null }></View>
										</View>
										<Text>{ i18n.t('loan2.futa') }</Text>
										<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
											<Text>(</Text>
											<Text>{ i18n.t('loan2.zxje') }</Text>
											<TextInput 
												editable={ this.state.fuzx == null || this.state.fuzx != 0 ? false : true }
												style={{width: 80, height: 20, padding: 0, borderBottomWidth: 1, borderBottomColor: '#d2d2d2'}} 
												defaultValue={this.state.zx1} 
												onChangeText={ (value) => this.setState({zx1: value}) } 
												keyboardType="numeric" 
												/>
											<Text>)</Text>
										</View>
									</TouchableOpacity>
								</View>
								<View style={styles.radioWrap}>
									<TouchableOpacity style={[styles.radiotabtwo]} onPress={ () => {this.setState({fuzx: 1, zx1: null, zx3: null, zx4: null})} }>
										<View style={styles.radio}>
											<View style={ this.state.fuzx == 1 ? styles.radiochild : null }></View>
										</View>
										<Text>{ i18n.t('loan2.fuer') }</Text>
										<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
											<Text>(</Text>
											<Text>{ i18n.t('loan2.zxje') }</Text>
											<TextInput 
												editable={ this.state.fuzx == null || this.state.fuzx != 1 ? false : true }
												style={{width: 80, height: 20, padding: 0, borderBottomWidth: 1, borderBottomColor: '#d2d2d2'}} 
												defaultValue={this.state.zx2} 
												onChangeText={ (value) => this.setState({zx2: value}) } 
												keyboardType="numeric" 
												/>
											<Text>)</Text>
										</View>
									</TouchableOpacity>
								</View>
								<View style={styles.radioWrap}>
									<TouchableOpacity style={[styles.radiotabtwo]} onPress={ () => {this.setState({fuzx: 2, zx1: null, zx2: null, zx4: null})} }>
										<View style={styles.radio}>
											<View style={ this.state.fuzx == 2 ? styles.radiochild : null }></View>
										</View>
										<Text>{ i18n.t('loan2.fusan') }</Text>
										<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
											<Text>(</Text>
											<Text>{ i18n.t('loan2.zxje') }</Text>
											<TextInput 
												editable={ this.state.fuzx == null || this.state.fuzx != 2 ? false : true }
												style={{width: 80, height: 20, padding: 0, borderBottomWidth: 1, borderBottomColor: '#d2d2d2'}} 
												defaultValue={this.state.zx3} 
												onChangeText={ (value) => this.setState({zx3: value}) } 
												keyboardType="numeric" 
												/>
											<Text>)</Text>
										</View>
									</TouchableOpacity>
								</View>
								<View style={styles.radioWrap}>
									<TouchableOpacity style={[styles.radiotabtwo]} onPress={ () => {this.setState({fuzx: 3, zx1: null, zx2: null, zx3: null})} }>
										<View style={styles.radio}>
											<View style={ this.state.fuzx == 3 ? styles.radiochild : null }></View>
										</View>
										<Text>{ i18n.t('loan2.fuqt') }</Text>
										<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
											<Text>(</Text>
											<Text>{ i18n.t('loan2.zxje') }</Text>
											<TextInput 
												editable={ this.state.fuzx == null || this.state.fuzx != 3 ? false : true }
												style={{width: 80, height: 20, padding: 0, borderBottomWidth: 1, borderBottomColor: '#d2d2d2'}} 
												defaultValue={this.state.zx4} 
												onChangeText={ (value) => this.setState({zx4: value}) } 
												keyboardType="numeric" 
												/>
											<Text>)</Text>
										</View>
									</TouchableOpacity>
								</View>
								<View style={styles.radioWrap}>
									<TouchableOpacity style={[styles.radiotabtwo]} onPress={ () => {this.setState({fuzx: 4, zx1: null, zx2: null, zx3: null, zx4: null})} }>
										<View style={styles.radio}>
											<View style={ this.state.fuzx == 4 ? styles.radiochild : null }></View>
										</View>
										<Text>{ i18n.t('loan2.funo') }</Text>
									</TouchableOpacity>
								</View>
							</View>
							<View style={styles.stateiconwrap}> 
								{
									this.state.fuzx == 0 && this.state.zx1 != null && this.state.zx1 != '' ? succIcon : 
									(this.state.fuzx == 1 && this.state.zx2 != null && this.state.zx2 != '' ? succIcon : (
									this.state.fuzx == 2 && this.state.zx3 != null && this.state.zx3 != '' ? succIcon : (
									this.state.fuzx == 3 && this.state.zx4 != null && this.state.zx4 != '' ? succIcon : (
									this.state.fuzx == 4 ? succIcon : null 
									)
									)
									))
								}
							</View>
						</View>
					</View>
					{/*有抵押贷款时出现*/}
					<View style={[styles.loanTitle, {marginTop: 20}]}>
						<Text style={styles.loanTitleText}>{ i18n.t('loan2.title2') }</Text>
					</View>
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
						<View style={styles.stateiconwrap}> 
							{this.state.isZg != null ? succIcon : null}							
						</View>
					</View>
					{/*公司名稱*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan2.gsname') }</Text>
						<TextInput defaultValue={this.state.gsname} style={styles.input} onChangeText={ (value) => this.setState({gsname: value}) } placeholder={ i18n.t('loan2.gsnamep') }/>
						<View style={styles.stateiconwrap}> 
							{ this.state.gsname !== null && this.state.gsname != '' ? succIcon : null }
						</View>
					</View>
					{/*办公室地址*/}
					<View style={styles.textareawrapb}>
						<Text style={styles.label}>{ i18n.t('loan2.gsdz') }</Text>
						<View style={styles.textbottom}>
							<TextInput style={styles.textarea} multiline={true} defaultValue={this.state.gsdz} onChangeText={ (value) => this.setState({gsdz: value}) } placeholder={ i18n.t('loan2.gsdzp') }/>
							<Text style={styles.textbottomcont}>{i18n.t('loan2.dztext')}</Text>
						</View>
						<View style={styles.stateiconwrap}> 
							{ this.state.gsdz != null && this.state.gsdz != '' ? succIcon : null }
						</View> 
					</View>
					{/*公司电话*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan2.gsphone') }</Text>
						<TextInput style={styles.input} defaultValue={this.state.gsphone} onChangeText={ (value) => this.setState({gsphone: value}) } keyboardType="numeric" placeholder={ i18n.t('loan2.gsphonep') }/>
						<View style={styles.stateiconwrap}> 
							{ this.state.gsphone != null && this.state.gsphone != '' ? succIcon : null }
						</View>
					</View>
					{/*收入*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan2.sr') }</Text>
						<TextInput style={styles.input} defaultValue={this.state.sr} onChangeText={ (value) => this.setState({sr: value}) } keyboardType="numeric" placeholder={ i18n.t('loan2.srp') }/>
						<View style={styles.stateiconwrap}> 
							{ this.state.sr != null && this.state.sr != '' ? succIcon : null }
						</View>
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
						<View style={styles.stateiconwrap}> 
							{ this.state.fsp == i18n.t('loan2.fsp') ? null : succIcon }
						</View>
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
										this.setState({xz: arr[i]['id'], xzp: value})
									}
								}
							} }/>
						<View style={styles.stateiconwrap}> 
							{ this.state.xzp == i18n.t('loan2.xzp') ? null : succIcon }
						</View>
					</View>
					{/*职业*/}
					<View style={styles.inputwrap}>
						<Text style={styles.label}>{ i18n.t('loan2.zy') }</Text>
						<TextInput defaultValue={this.state.zy} style={styles.input} onChangeText={ (value) => this.setState({zy: value}) } placeholder={ i18n.t('loan2.zyp') }/>
						<View style={styles.stateiconwrap}> 
							{ this.state.zy !== null && this.state.zy !== '' ? succIcon : null }
						</View>
					</View>
					{/*工作时间*/}
					<View style={styles.inputwrapyear}>
						<Text style={styles.label}>{ i18n.t('loan2.gz') }</Text>
						<View style={styles.yearwrap}>
							<View style={{flexDirection: 'row'}}>
								<View style={styles.y}>
									<TextInput defaultValue={this.state.year} style={styles.y_input} onChangeText={ (value) => this.setState({year: value}) } keyboardType="numeric" placeholder={ i18n.t('loan2.zyp') }/>
									<Text>年</Text>
								</View>
								<View style={styles.m}>
									<TextInput defaultValue={this.state.month} style={styles.m_input} onChangeText={ (value) => this.setState({month: value}) } keyboardType="numeric" placeholder={ i18n.t('loan2.zyp') }/>
									<Text>月</Text>
								</View>
							</View>
							<Text style={{fontSize: 12, marginTop: 15}}>{ i18n.t('loan2.gztext') }</Text>
						</View>
						<View style={styles.stateiconwrap}> 
							{ this.state.year !== null && this.state.month != null && this.state.year != '' && this.state.month != '' ? succIcon : null }
						</View>
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 25, marginBottom: 25}}>
						<TouchableOpacity onPress={ () => Actions.pop() } style={{width: 170, height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
							<Text style={{color: '#f7ba14'}}>{ i18n.t('loan2.btn1') }</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={ this.onsubmit } style={{width: 170, height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7ba14', borderRadius: 10}}>
							<Text style={{color: '#fff'}}>{ i18n.t('loan2.btn2') }</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}

}

export default Loan2;