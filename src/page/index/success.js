import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { styles } from "../../static/style/success_style.js"
import { Actions } from 'react-native-router-flux';
import Header from "../../common/Header";

class Success extends Component {

	constructor(props) {
	  	super(props);
	
		this.state = {};
	}

	render(){
		return(
			<View>
				<Header title={ i18n.t('succ.title') } leftShow="none" />
				<ScrollView style={{height: scrollViewHeight}}>
					<View style={styles.succwrap}>
						<Image style={styles.successicon} source={require('../../static/images/successx3.png')} />
					</View>
					<Text style={styles.succtext}>
						{i18n.t('succ.text')}
					</Text>
					<View style={styles.btnwrap}>
						<TouchableOpacity onPress={ () => {
							Actions.home();
							Actions.reset('home');
						} } style={[styles.btnchild, styles.btnchildone]}>
							<Text style={{color: '#f7ba14'}}>返回首頁</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={ () => {
							Actions.main({'reset': true});
							Actions.reset('main');
						} } style={[styles.btnchild, styles.btnchildtwo]}>
							<Text style={{color: '#fff'}}>進入個人中心</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}

}

export default Success;