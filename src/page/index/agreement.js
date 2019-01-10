import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { styles } from "../../static/style/agreement_style.js"
import { Actions } from 'react-native-router-flux';
import Header from "../../common/Header";

class Agreement extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		ok: false,
	  		config: null,
	  	};
	}

	componentWillMount(){
		// 獲取法律協議
		fetch(API('/system/systemconfigsdetail'), {
			method: 'POST',
			body: signData({
				config_key: LAN ? 'api_legal_agreements_cn' : 'api_legal_agreements_en'
			})
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				this.setState({
					config: response['results']['config_name']
				})
			}
		} )
	}

	ok = () => {
		this.setState({
			ok: !this.state.ok
		})
	}

	toSuccess = () => {
		let from;
		if(this.props.loanstate){
			from = signData(this.props.params);
		}else{
			from = signData(this.props.params);
			let arr = Object.keys(this.props.params1);
			arr.map( (item, index) => {
				from.append(item, this.props.params1[item]);
			} )
		}
		if (this.props.ID != undefined) {
			from.append('set_meal_id', this.props.ID)
		}
		fetch(API('/order/submit'), {
			method: 'POST',
			body: from
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				Actions.success();
			}
		} )
	}

	render(){
		return (
			<View>
				<Header title={ i18n.t('agr.title') }/>
				<ScrollView style={{height: scrollViewHeight}}>
					<ScrollView style={styles.agrwrap}>
						<Text style={styles.agrtext}>{this.state.config}</Text>
					</ScrollView>
					<View style={styles.wrap}>
						<TouchableOpacity style={styles.agrokwrap} onPress={ this.ok }>
							{
								this.state.ok ? 
								<Image style={styles.agrok} source={require('../../static/images/icon/agr_ok.png')}/> : 
								null
							}
						</TouchableOpacity>
						<View style={styles.agroktext}>
							<Text style={styles.agrokcent}>{ i18n.t('agr.text1') }</Text>
							<Text style={styles.agrokcent}>{ i18n.t('agr.text2') }</Text>
						</View>
					</View>
					<View style={styles.sqwrap}>
						<TouchableOpacity style={styles.sqbtn} onPress={ this.toSuccess } disabled={!this.state.ok}>
							<Text style={styles.sqtext}>{ i18n.t('agr.ok') }</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}

}

export default Agreement;