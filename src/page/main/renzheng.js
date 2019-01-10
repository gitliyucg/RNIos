import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, Image, TouchableOpacity, ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from "../../static/style/renzheng_style";
import Header from "../../common/Header";

export default class Renzheng extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		list: []
	  	};
	}

	componentDidMount(){
		//获取身份认证
		Storage.get('id').then( (response) => {
			let from = signData();
			from.append('uid', response);
			fetch(API('/authentications/'), {
				method: 'POST',
				body: from
			}).then( (res) => res.json() ).then( (response) => {
				if(response['err_no'] == 0){
					if(response['results'] != null){
						this.setState({
							list: response['results']
						})
					}
				} 
			} )
		} )
	}

	toEdit = (item) => {
		if(item['category_id'] == 1){
			Actions.idedit({'ID': item.id, 'category_id': item.category_id})
		}else {
			Actions.otheredit({'ID': item.id, 'category_id': item.category_id, 'titleName': item.category_name})
		}
	}

	listComponent = (data) => {
		return data.map( (item, index) => {
			return(
				<TouchableOpacity style={styles.tupian} onPress={ () =>  this.toEdit(item) }>
					<Image style={styles.img} source={require('../../static/images/icon/renzheng.png')} />
					<Text>{ item['category_name'] }</Text>
				</TouchableOpacity>
			)
		} )
	}

	render(){
		return(
			<View>
				<Header title={i18n.t('renzheng.title')}/>
				<ScrollView style={{height: scrollViewHeight}}>
					<TouchableOpacity style={styles.xinxi} onPress={ () => Actions.person() }>
						<Text style={styles.xinxitext}>{i18n.t('renzheng.geren')}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.xinxi} onPress={ () => Actions.zhuzhai() }>
						<Text style={styles.xinxitext}>{i18n.t('renzheng.zhuzhai')}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.xinxi} onPress={ () => Actions.diya() }>
						<Text style={styles.xinxitext}>{i18n.t('renzheng.diya')}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.xinxi} onPress={ () => Actions.work() }>
						<Text style={styles.xinxitext}>{i18n.t('renzheng.work')}</Text>
					</TouchableOpacity>
					{this.listComponent(this.state.list)}
				</ScrollView>
			</View>
		);
	}

}
