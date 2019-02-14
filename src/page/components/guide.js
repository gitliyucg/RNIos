import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as changeActions from '../../actions/lanActions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class Guide extends Component{
	constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount(){
    }

    render(){
    	return(
    		<ScrollView style={styles.guidewrap}
    			horizontal={true}
    			pagingEnabled={true}
    			showsHorizontalScrollIndicator={false}
    		>
    			<View style={styles.imgwrap}>
    				<Image style={styles.img} source={require('../../static/images/guide/1.jpg')} />
    			</View>
    			<View style={styles.imgwrap}>
    				<Image style={styles.img} source={require('../../static/images/guide/2.jpg')} />
    			</View>
    			<TouchableOpacity activeOpacity={1} style={styles.imgwrap} onPress={ () => {
					Storage.save('guide', true);
					if (LAN) {
	                    this.props.actions.changeZh()
	                }else{
	                    this.props.actions.changeEn()
	                }
				} } >
					<Image style={styles.img} source={require('../../static/images/guide/3.jpg')} />
    			</TouchableOpacity>
    		</ScrollView>
		)
    }
}

const styles = StyleSheet.create({
	guidewrap: {
		position: 'relative',
		top: 0, left: 0,
		width: WIDTH,
		height: HEIGHT,
		backgroundColor: '#ffffff',
		zIndex: 100,
	},
	imgwrap: {
		width: WIDTH,
		height: HEIGHT
	},
	img: {
		width: WIDTH,
		height: HEIGHT
	},
	toapp: {
		position: 'absolute',
		width: 150,
		height: 40,
		borderWidth: 1,
		borderColor: '#fff',
		borderRadius: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		bottom: 100,
		left: WIDTH / 2,
		marginLeft: -75
	},
	text: {
		fontSize: 16,
		color: '#fff'
	}
})

export default connect(state => ({
        state: state.changelan
    }),
    (dispatch) => ({
        actions: bindActionCreators(changeActions, dispatch)
    })
)(Guide);