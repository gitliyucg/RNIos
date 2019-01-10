import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, Image, TouchableOpacity} from 'react-native';

export default class Nodata extends Component{

	render(){
		return(
			<View styles={styles.nodatawrap}>
				<View style={styles.nodata}>
					<Image style={styles.nodataicon} source={require('../../static/images/icon/nodata.png')} />
					<Text style={styles.text}>暫無數據</Text>
				</View>
			</View>
		);
	}

}

let styles = StyleSheet.create({
	nodatawrap: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	nodata: {
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 140
	},
	nodataicon: {
		height: 80,
		width: 60
	},
	text: {
		color: '#747474',
		fontSize: 16,
		marginTop: 35
	}
})