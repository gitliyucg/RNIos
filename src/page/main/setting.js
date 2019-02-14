import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, Image, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from "../../static/style/setting_style";
import Header from "../../common/Header";
import { option } from "../../common/uploadConfig";
import ImagePicker from "react-native-image-picker";
import * as changeActions from '../../actions/lanActions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class Setting extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		uri: null
	  	};
	}

	componentDidMount(){
		// 获取用户详情
        Storage.get('id').then( (response) => {
            fetch(API('/users/detail'), {
                method: 'POST',
                body: signData({
                    id: response
                })
            }).then( (res) => res.json() ).then( (response) => {
                if(response['err_no'] == 0){
                    this.setState({
                        uri: response['results']['thumb'],
                    })
                }
            } )
        } )
	}

	// 退出登录
	loginOut = () => {
		fetch(API('/users/logout'),{
			method: 'POST',
			body: signData()
		}).then( (res) => res.json() ).then( (response) => {
			if(response['err_no'] == 0){
				Storage.delete('mobile');
		        Storage.delete('token');
		        Storage.delete('id');
		        token = null;
		        Actions.reset('login');
			}
		} )	
	}

	// 上传图片
	uploadImg = () => {
		ImagePicker.showImagePicker(option, (response) => {
			if(response.didCancel){
				return false;
			}
			let from = signData();
			from.append('name', 'img');
			from.append('is_thumb', 1);
			from.append('img', {uri: response['uri'], type: 'multiline/form-data', name: 'images.jpeg'});
			// 上传
			fetch(API('/upload/'), {
				method: 'POST',
				headers:{
			      	'Content-Type':'multipart/form-data',
		      	},
				body: from
			}).then( (res) => res.json() ).then( (response) => {
				if(response['err_no'] == 0){
					this.setState({
						uri: response['results']['url']
					})
					// 设置头像
					fetch(API('/users/setheadportrait'), {
						method: 'POST',
						headers:{
					      	'Content-Type':'multipart/form-data',
				      	},
						body: signData({pic_json: JSON.stringify(response)})
					}).then( (res) => res.json() ).then( (response) => {
						if(response['err_no'] == 0){
							Actions.main({reset: true})
							Actions.reset('main');
						}
					} )
				}
			} )
		})
	}

	render(){
		return (
			<View>
				<Header title={ i18n.t('setting.title') }/>
				<View style={styles.headwrap}>
					<TouchableOpacity style={styles.userimgwrap} onPress={ this.uploadImg }>
						{
							this.state.uri == null ? 
							<Image style={styles.userimg} source={ require('../../static/images/user.png') }/> :
							<Image style={styles.userimg} source={{uri: this.state.uri}}/>
						}
					</TouchableOpacity>
					<Text>{ i18n.t('setting.head') }</Text>
				</View>
				<TouchableOpacity style={styles.cache} onPress={() => {
					Alert.alert(
                        i18n.t('setting.alert'),
                        i18n.t('setting.text'),
                        [
                            {text: 'OK', onPress: () => {
                            	if (LAN) {
				                    this.props.actions.changeZh()
				                }else{
				                    this.props.actions.changeEn()
				                }
                            }},
                        ],
                        { cancelable: false }
                    )
					
				}}>
					<Text style={styles.cachetext}>{i18n.t('setting.cache')}</Text>
					<Image style={styles.cacheicon} source={require('../../static/images/icon/right.png')}/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.logout} onPress={ this.loginOut }>
					<Text style={styles.logouttext}>{i18n.t('setting.logout')}</Text>
				</TouchableOpacity>
				<Text style={styles.version}>1.0.1</Text>
			</View>
		);
	}

}

export default connect(state => ({
        state: state.changelan
    }),
    (dispatch) => ({
        actions: bindActionCreators(changeActions, dispatch)
    })
)(Setting);