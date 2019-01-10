import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, Picker, ScrollView, Alert } from 'react-native';
import { styles } from "../../static/style/index_list_style"
import { Actions } from 'react-native-router-flux';
import Header from "../../common/Header";

class List extends Component{

	constructor(props) {
		super(props)

		this.state = {
			ID: this.props.id,
			detail: {}
		}
	}

	componentDidMount(){
		// 获取套餐详情
		fetch(API('/set_meal/detail'), {
			method: 'POST',
			body: signData({
				id: this.state.ID,
			})
		}).then( (res) => res.json() ).then( (response) => {
			this.setState({
				detail: response['results']
			})
		} )
	}

	toLoan = () => {
		if(token == null){
			Actions.login();
		}else {
			Actions.loan1({
				'loan': 'wu',
				'ID': this.state.ID,
				'price': this.state.detail.price,
				'month': this.state.detail.by_stages
			})
		}
	}

	render(){
		return(
			<View>
				<Header title={ LAN ? this.state.detail.title : this.state.detail.title_en } />
				<ScrollView style={{height: scrollViewHeight}}>
					<View style={styles.back}>
						<Image style={styles.backimg} source={ require('../../static/images/listbackx3.png') } />
						<View style={styles.posview}>
							<View style={styles.backtop}>
								<Image style={styles.backtopimg} source={{ uri: this.state.detail.pic }}/>
								<View style={styles.backtopcont}>
									<Text>{ LAN ? this.state.detail.title : this.state.detail.title_en }</Text>
									<Text style={{ fontSize: 12, color: '#717171', marginTop: 5 }}>{ LAN ? this.state.detail.description : this.state.detail.description_en }</Text>
								</View>
							</View>
							<View style={styles.backb}>
								<View style={styles.backbchild}>
									<Text style={{color: '#717171'}}>{ i18n.t('list.ed') }</Text>
									<View style={styles.backchildcont}>
										<Text style={{ fontSize: 16 }}>{ this.state.detail.price }</Text>
									</View>
								</View>
								<View style={styles.backbchild}>
									<Text style={{color: '#717171'}}>{ i18n.t('list.ll') }</Text>
									<View style={styles.backchildcont}>
										<Text style={{ fontSize: 16 }}>{ this.state.detail.day_rate }</Text>
										<Text style={{ fontSize: 16 }}>{ LAN ? this.state.detail.day_rate_end : this.state.detail.day_rate_end_en }</Text>
									</View>
								</View>
								<View style={styles.backbchild}>
									<Text style={{color: '#717171'}}>{ i18n.t('list.fq') }</Text>
									<View style={styles.backchildcont}>
										<Text style={{ fontSize: 16 }}>{ this.state.detail.by_stages }</Text>
										<Text style={{ fontSize: 16 }}>{ LAN ? this.state.detail.by_stages_end : this.state.detail.by_stages_end_en }</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
					<View style={{flexDirection: 'column', backgroundColor: '#fff', paddingLeft: 15, paddingRight: 15, paddingBottom: 20}}>
						<Text style={{ marginBottom: 15 }}>{ i18n.t('list.lc') }</Text>
						<View style={styles.lcwrap}>
							<View style={styles.lcimgwrap}>
								<Image style={styles.lcimg} source={ require('../../static/images/xzx3.png') }/>
								<Text style={{fontSize: 10, width: 50, textAlign: 'center'}}>{ i18n.t('list.xz') }</Text>
							</View>
							<Text style={{width: 30, height: 2, backgroundColor: '#f58736'}}></Text>
							<View style={styles.lcimgwrap}>
								<Image style={styles.lcimg} source={ require('../../static/images/zcx3.png') }/>
								<Text style={{fontSize: 10, width: 50, textAlign: 'center'}}>{ i18n.t('list.zc') }</Text>
							</View>
							<Text style={{width: 30, height: 2, backgroundColor: '#f58736'}}></Text>
							<View style={styles.lcimgwrap}>
								<Image style={styles.lcimg} source={ require('../../static/images/rzx3.png') }/>
								<Text style={{fontSize: 10, width: 50, textAlign: 'center'}}>{ i18n.t('list.rz') }</Text>
							</View>
							<Text style={{width: 30, height: 2, backgroundColor: '#f58736'}}></Text>
							<View style={styles.lcimgwrap}>
								<Image style={styles.lcimg} source={ require('../../static/images/shx3.png') }/>
								<Text style={{fontSize: 10, width: 50, textAlign: 'center'}}>{ i18n.t('list.sh') }</Text>
							</View>
							<Text style={{width: 30, height: 2, backgroundColor: '#f58736'}}></Text>
							<View style={styles.lcimgwrap}>
								<Image style={styles.lcimg} source={ require('../../static/images/fkx3.png') }/>
								<Text style={{fontSize: 10, width: 50, textAlign: 'center'}}>{ i18n.t('list.fk') }</Text>
							</View>
						</View>
					</View>
					<Text 
						style={{height: 45, paddingLeft: 15, paddingRight: 15, lineHeight: 45, backgroundColor: '#fff', marginTop: 15, marginBottom: 15}}>{ i18n.t('list.tj') }</Text>
					<View style={{marginLeft: 15, marginRight: 15}}>
						<Text>{this.state.detail['requirements']}</Text>						
					</View>
					<View style={ styles.btnwrap }>
						<TouchableOpacity style={styles.sq} onPress={this.toLoan}>
							<Text style={{color: '#fff'}}>{ i18n.t('list.sq') }</Text>
						</TouchableOpacity>
						<Text style={{color: '#d3d2d7', fontSize: 12, marginTop: 10, flex: 1, marginLeft: 30, marginRight: 30}}>{ i18n.t('list.sqt') }</Text>
					</View>
				</ScrollView>
			</View>
			
		);
	}

}

export default List