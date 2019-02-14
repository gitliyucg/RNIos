import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from "../../static/style/order_style";
import Header from "../../common/Header";
import Nodata from "../components/nodata";

export default class Order extends Component {
	constructor(props) {
		
	  	super(props);
	
	  	this.state = {
	  		title: null,
	  		action: 0, //0為交易记录1为时间表3为减免优惠
	  		info: {},
	  		list: [],
	  		account: null,
	  		number: null,
	  		bank: null
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
		fetch(API('/order/detail'), {
			method: 'POST',
			body: signData({order_id: this.props.orderID})
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				this.setState({
					info: response['results'],
					list: response['results']['logs_repayment']
				})
			}
		} )
		// 获取还款信息
		let config = ['api_repayment_bank', 'api_repayment_account', 'api_repayment_company'];
		config.map( (item, index) => {
			fetch(API('/system/systemconfigsdetail'), {
				method: 'POST',
				body: signData({config_key: item})
			}).then( (res) => res.json() ).then( (response) => {
				if (response['err_no'] == 0) {
					if(index == 0){
						this.setState({
							bank: response['results']['config_name']
						})
					}else if(index == 1){
						this.setState({
							number: response['results']['config_name']
						})
					}else if(index == 2){
						this.setState({
							account: response['results']['config_name']
						})
					}
				}
			} )
		} )
	}

	orderHtml = (data) => {
		if(this.state.action == 2){
			return false;
		}else {
			return this.state.list.map( (item, index) => {
				return(
					<View style={styles.orderlistwrap}>
						<Text style={[styles.jilu1, styles.jianmodd]}>{item.stage}</Text>
						<Text style={[styles.jilu2, styles.jianmeven]}>{item.date}</Text>
						<Text style={[styles.jilu3, styles.jianmodd]}>{item.total_price_surplus}</Text>
						<Text style={[styles.jilu4, styles.jianmeven]}>{item.total_price_surplus_interest}</Text>
					</View>
				)
			} )
		}
	}

	render(){
		return(
			<View>
				<Header title={this.state.title} />
				<ScrollView style={{height: scrollViewHeight}}>
					<View style={styles.listwrap}>
						{
							this.state.info['set_meal_id'] != 0 ?
							<Image style={styles.listimg} source={require('../../static/images/listtao.png')} /> :
							(this.state.info['order_type'] == 0 ? <Image style={styles.listimg} source={require('../../static/images/listwu.png')} /> : 
							(this.state.info['order_type'] == 1 ? <Image style={styles.listimg} source={require('../../static/images/listyou.png')} /> : null)
							)
						}
						<View style={styles.listcont}>
							<Text style={styles.listtext}>{this.state.info.price}</Text>
							<Text style={styles.listtext}>{this.state.info['day_rate']}</Text>
							<Text style={styles.listtext}>{this.state.info['loan_stage']}</Text>
						</View>
						<Text style={styles.orderid}>{i18n.t('order.order')}{this.props.orderID}</Text>
					</View>
					{
						this.props.orderType == 2 ? 
						<Text style={{marginLeft: 15, marginRight: 15, marginTop: 10}}>{i18n.t('order.bohui')}{this.state.info['examine_reason']}</Text> :
						null
					}
					<View style={styles.listinfo}>
						<View style={[styles.infochild, styles.infochildcolor1]}>
							<Text style={styles.label} numberOfLines={1}>{i18n.t('sign.name')}</Text>
							<Text style={styles.labeltext}>{this.state.info['last_name']} {this.state.info['first_name']}</Text>
						</View>
						<View style={[styles.infochild, styles.infochildcolor2]}>
							<Text style={styles.label} numberOfLines={1}>{i18n.t('sign.hybh')}</Text>
							<Text style={styles.labeltext}>{this.state.info['uid']}</Text>
						</View>
						<View style={[styles.infochild, styles.infochildcolor1]}>
							<Text style={styles.label} numberOfLines={1}>{i18n.t('sign.dk')}</Text>
							<Text style={styles.labeltext}>{this.state.info['order_id']}</Text>
						</View>
						<View style={[styles.infochild, styles.infochildcolor2]}>
							<Text style={styles.label} numberOfLines={1}>{i18n.t('sign.je')}</Text>
							<Text style={styles.labeltext}>{this.state.info['price']}</Text>
						</View>
						<View style={[styles.infochild, styles.infochildcolor1]}>
							<Text style={styles.label} numberOfLines={1}>{i18n.t('sign.lv')}</Text>
							<Text style={styles.labeltext}>{this.state.info['year_rate']}</Text>
						</View>
						<View style={[styles.infochild, styles.infochildcolor2]}>
							<Text style={styles.label} numberOfLines={1}>{i18n.t('sign.bl')}</Text>
							<Text style={styles.labeltext}>{this.state.info['total_price']}</Text>
						</View>
						<View style={[styles.infochild, styles.infochildcolor1]}>
							<Text style={styles.label} numberOfLines={1}>{i18n.t('sign.hkq')}</Text>
							<Text style={styles.labeltext}>{this.state.info['loan_stage']}</Text>
						</View>
						<View style={[styles.infochild, styles.infochildcolor2]}>
							<Text style={styles.label} numberOfLines={1}>{i18n.t('sign.jkrq')}</Text>
							<Text style={styles.labeltext}>{this.state.info['create_times']}</Text>
						</View>
						{/*還款信息*/}
						<View style={[styles.infochild, styles.infochildcolor1]}>
							<Text style={styles.label} numberOfLines={1}>{i18n.t('order.date')}</Text>
							<Text style={styles.labeltext}>{i18n.t('order.dateq')}{this.state.info['repayment_date']}{i18n.t('order.dateh')}</Text>
						</View>
						<View style={[styles.infochild, styles.infochildcolor2]}>
							<Text style={styles.label} numberOfLines={1}>{i18n.t('order.account')}</Text>
							<Text style={styles.labeltext}>{this.state.account}</Text>
						</View>
						<View style={[styles.infochild, styles.infochildcolor1]}>
							<Text style={styles.label} numberOfLines={1}>{i18n.t('order.number')}</Text>
							<Text style={styles.labeltext}>{this.state.number}</Text>
						</View>
						{
							this.state.bank == null ? 
							null : 
							<View style={[styles.infochild, styles.infochildcolor2]}>
								<Text style={styles.label} numberOfLines={1}>{i18n.t('order.bank')}</Text>
								<Text style={styles.labeltext}>{this.state.bank}</Text>
							</View>
						}
						{/*還款信息*/}
					</View>
					<View style={styles.orderinfo}>
						<View style={styles.orderchild}>
							<Text style={{marginTop: 10}}>{i18n.t('order.all')}</Text>
							<Text style={{marginTop: 15, fontSize: 16}}>{this.state.info['price']}</Text>
						</View>
						<View style={styles.orderchild}>
							<Text style={{marginTop: 10}}>{i18n.t('order.yih')}</Text>
							<Text style={{marginTop: 15, fontSize: 16}}>{this.state.info['total_reimbursement']}</Text>
						</View>
						<View style={styles.orderchild}>
							<Text style={{marginTop: 10}}>{i18n.t('order.weih')}</Text>
							<Text style={{marginTop: 15, fontSize: 16}}>{this.state.info['total_no_repayment']}</Text>
						</View>
					</View>
					<View style={styles.listchildwrap}>
						<TouchableOpacity onPress={() => this.setState({action: 0})} style={[styles.listchild, this.state.action == 0 ? styles.listwrapaction : styles.listwrapnoaction]}><Text style={{color: '#fff'}}>交易記錄</Text></TouchableOpacity>
						<TouchableOpacity onPress={() => this.setState({action: 1})} style={[styles.listchild, this.state.action == 1 ? styles.listwrapaction : styles.listwrapnoaction]}><Text style={{color: '#fff'}}>還款時間表</Text></TouchableOpacity>
						<TouchableOpacity onPress={() => this.setState({action: 2})} style={[styles.listchild, this.state.action == 2 ? styles.listwrapaction : styles.listwrapnoaction]}><Text style={{color: '#fff'}}>減免優惠</Text></TouchableOpacity>
					</View>
					<View>
						{
							this.state.action == 2 ? 
							<View style={styles.orderlistwrap}>
								<Text style={[styles.jianm, styles.jianmodd]}>{i18n.t('order.t5')}</Text>
								<Text style={[styles.jianm, styles.jianmeven]}>{i18n.t('order.t6')}</Text>
								<Text style={[styles.jianm, styles.jianmodd]}>{i18n.t('order.t7')}</Text>
								<Text style={[styles.jianm, styles.jianmeven]}>{i18n.t('order.t8')}</Text>
							</View> : 
							<View style={styles.orderlistwrap}>
								<Text style={[styles.jilu1, styles.jianmodd]}>{i18n.t('order.t1')}</Text>
								<Text style={[styles.jilu2, styles.jianmeven]}>{i18n.t('order.t2')}</Text>
								<Text style={[styles.jilu3, styles.jianmodd]}>{i18n.t('order.t3')}</Text>
								<Text style={[styles.jilu4, styles.jianmeven]}>{i18n.t('order.t4')}</Text>
							</View>
						}
						{this.orderHtml()}
					</View>
				</ScrollView>
			</View>
		);
	}
}