import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from "../../static/style/repayment_style";
import Header from "../../common/Header";
import Nodata from "../components/nodata";

export default class Repayment extends Component {

	constructor(props) {
		
	  	super(props);
	
	  	this.state = {
	  		title: null,
	  		data: [],
	  		show: this.props.orderType != 4 ? true : false
	  	};
	}

	componentDidMount(){
		// 4为还款中 1为待签字 0为审核中 5为已结清 2为已驳回
		let title = null;
		switch (this.props.orderType) {
			case 4:
				title = i18n.t('main.hk');
				break;
			case 1:
				title = i18n.t('main.dq')
				break;
			case 0:
				title = i18n.t('main.sh')
				break;
			case 5:
				title = i18n.t('main.yj')
				break;
			case 2:
				title = i18n.t('main.bh')
				break;
		}
		this.setState({
			title: title
		})
		// 获取订单详情
		let from = signData();
		from.append('examine_status', this.props.orderType)
		fetch(API('/order/'), {
			method: 'POST',
			body: from
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				this.setState({
					data: response['results']
				})
			}
		} )
	}

	nodata = () => {
		return <Nodata/>
	}

	renderComponent = ({ item }) => {
		return(
			<TouchableOpacity style={styles.listwrap} onPress={ () => {
				if(this.props.orderType == 1){
					Actions.sign({'orderID': item.order_id})
				}else{
					Actions.order({'orderID': item.order_id, 'orderType': this.props.orderType})
				}
			} }>
				{
					item['order_type'] == 0 ? 
					<Image style={styles.listimg} source={require('../../static/images/listwu.png')} /> :
					<Image style={styles.listimg} source={require('../../static/images/listyou.png')} />
				}
				<View style={styles.listcont}>
					<Text style={styles.listtext}>{item.price}</Text>
					<Text style={styles.listtext}>{item.day_rate}</Text>
					<Text style={styles.listtext}>{item.loan_stage}</Text>
				</View>
				<Text style={styles.orderid}>{i18n.t('order.order')}{item.order_id}</Text>
				{
					this.state.show ?
					<View style={styles.zhezhao}><Text style={styles.zhezhaotext}>{this.state.title}</Text></View> : 
					null
				}
			</TouchableOpacity>
		);
	}

	render(){
		return(
			<View>
				<Header title={ this.state.title }/>
				<ScrollView style={{height: scrollViewHeight}}>
					{ 
						this.state.data.length == 0 ? 
						this.nodata() :
	                	<FlatList data={this.state.data} renderItem={this.renderComponent} />
					}
				</ScrollView>
				
			</View>
		);
	}

}