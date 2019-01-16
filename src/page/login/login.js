import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import { styles } from "../../static/style/login_style.js"
import { Actions } from 'react-native-router-flux';
import makeCancelable from "../../common/Cancelable";
import JPushModule from 'jpush-react-native'

let Time = null;

class Login extends Component{

	constructor(props) {
	  	super(props);

	  	this.state = {
	  		isPhone: false,
	  		phone: '',
	  		isMa: false,
	  		ma: '',
	  		time: 60,
	  		getMa: false
	  	};
	}

	changePhone = (value) => {
		if(value != ''){
			this.setState({
				isPhone: true,
				phone: value
			})
		}
	}

	changeMa = (value) => {
		if(value != ''){
			this.setState({
				isMa: true,
				ma: value
			})
		}
	}

	getCode = () => {
		// 获取验证码
		let params = {mobile: this.state.phone, contentcode: 'sms_verify'}
		if(!phone(this.state.phone)){
			Alert.alert('請輸入正確的手機號碼');
			return false;
		}else{
			this.setTime();
			fetch(API('/sendsms/sendsms'), {
				method: 'POST',
				body: signData(params)
			}).then( (res) => res.json() ).then( (response) => {
				if (response['err_no'] == 0) {
					console.log(response);
				}else{
					Alert.alert(response['err_msg'])
				}
			} )
		}
	}

	login = () => {
		// 登录
		let params = {
			mobile: this.state.phone,
			verify: this.state.ma,
			registration_id: PushID
		}
		fetch(API('/users/login'), {
			method: 'POST',
			body: signData(params)
		}).then( (res) => res.json() ).then( (response) => {
			if( response['err_no'] == 0 ){
				Storage.save('id', response['results']['id']);
				Storage.save('mobile', response['results']['mobile']);
				Storage.save('token', response['results']['token']);
				token = response['results']['token'];
				Actions.main({'mobile': response['results']['mobile']});
				Actions.reset('main');
			}else{
				Alert.alert(response['err_msg']);
			}
		} )
	}

	setTime = () => {
		this.setState({
			getMa: true
		})
		Time = setTimeout(() => {
			this.setTime()
		}, 1000)
		if(this.state.time == 0){
			this.setState({
				time: 60,
				getMa: false
			})
			clearTimeout(Time)
		}else {
			let newTime = this.state.time;
			newTime--;
			this.setState({
				time: newTime
			})
		}
	}

	render(){
		return(
			<View style={[main]}>
				<View style={styles.logo}>
					<Image style={styles.logoimg} source={require("../../static/images/logox3.png")}/>
					<Image style={styles.loginimg} source={require("../../static/images/loginx3.png")}/>
				</View>
				<View style={styles.inputwrap}>
					<View style={styles.inputcont}>
						<View style={styles.inputchild}>
							<Text style={styles.label}>{ i18n.t('login.phone') }</Text>
							<TextInput style={styles.logininput} onChangeText={ (value) => this.changePhone(value) } keyboardType="numeric" placeholder={ i18n.t('login.phoneplace') }/>
						</View>
						<View style={styles.inputchild}>
							<Text style={styles.label}>{ i18n.t('login.ma') }</Text>
							<TextInput style={styles.logininput} onChangeText={ (value) => this.changeMa(value) } keyboardType="numeric" placeholder={ i18n.t('login.maplace') }/>
							<TouchableOpacity disabled={ this.state.getMa || !this.state.isPhone ? true : false } style={styles.mabtn} onPress={this.getCode}>
								{this.state.getMa ? <Text>{ this.state.time + 's' }</Text> : <Text>{ i18n.t('login.getma') }</Text>}
							</TouchableOpacity>
						</View>
					</View>
					<TouchableOpacity onPress={ this.login } disabled={ this.state.isPhone && this.state.isMa ? false : true } style={[styles.loginbtn, this.state.isPhone && this.state.isMa ? styles.loginbtntrue : styles.loginbtnfalse]}>
						<Text style={{color: '#fff'}}>{ i18n.t('login.btn') }</Text>
					</TouchableOpacity>
					<View style={styles.xieyi}>
						<Text>{ i18n.t('login.xieyi') }</Text>
						<TouchableOpacity>
							<Text style={{color: '#407ee4'}}>{ i18n.t('login.xieyi2') }</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}

	componentWillUnmount(){
		this.setState({
			time: 60,
			getMa: false
		})
		clearTimeout(Time)
	}

}

export default Login;