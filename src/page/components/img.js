import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, Image, TouchableOpacity, FlatList, ScrollView, TextInput} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class Img extends Component {
	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		imgurls: this.props.imgs
	  	};
	}

	render(){
		return(
			<View style={{flex: 1}}>
				<ImageViewer
                    imageUrls={this.state.imgurls} // 照片路径
                    enableImageZoom={true} // 是否开启手势缩放
                    index={0} // 初始显示第几张
                    onClick={() => { // 图片单击事件
                        Actions.pop()
                    }}
                />
			</View>
		)
	}
}

