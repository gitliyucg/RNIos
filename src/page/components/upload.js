import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Upload extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		upload: this.props.upload
	  	};
	}

	render(){
		if (!this.props.show) {
			return(<View></View>)	
		}
		return(
			<View style={[styles.uploadwrap]}>
				<View style={styles.upload}>
					<View style={styles.child}>
						<TouchableOpacity style={styles.child} onPress={ () => this.props.upload(1) }>
							<Image style={styles.icon} source={require('../../static/images/scx3.png')}/>
							<Text style={{color: '#FFF'}}>{ i18n.t('upload.bd') }</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.child}>
						<TouchableOpacity style={styles.child} onPress={ () => this.props.upload(2) }>
							<Image style={styles.icon} source={require('../../static/images/pzx3.png')}/>
							<Text style={{color: '#FFF'}}>{ i18n.t('upload.pz') }</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.closewrap}>
					<TouchableOpacity onPress={ () => this.props.upload(0) }>
						<Image style={styles.icon} source={require('../../static/images/close.png')}/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	uploadwrap: {
		position: 'absolute',
		top: 0, left: 0,
		backgroundColor: '#1a191e',
		width: WIDTH,
		height: HEIGHT,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		zIndex: 100
	},
	icon: {
		width: 55,
		height: 55
	},
	upload: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 60
	},
	child: {
		flexDirection: 'column',
		alignItems: 'center'
	},
	closewrap: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 100
	}
})

export default Upload;