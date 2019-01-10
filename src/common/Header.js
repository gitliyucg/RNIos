import React, { Component } from 'react';
import {AppRegistry, Dimensions, StyleSheet, View, Text, Button, Image, TouchableOpacity, Alert} from 'react-native';
import {Actions} from "react-native-router-flux";
import * as changeActions from '../actions/lanActions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

let ScreenWidth = Dimensions.get('window').width;
let ScreenHeight = Dimensions.get('window').height;

class Header extends Component{

    constructor(props){
        super(props);
    }

    change = (actions) => {
        Alert.alert(
            i18n.t('header.title'),
            i18n.t('header.text'),
            [
                {text: '繁體中文', onPress: () => actions.changeZh()},
                {text: 'English', onPress: () => actions.changeEn()},
            ]
        )
    }
    
    render(){

        const { state, actions } = this.props;

        return(
            <View style={styles.header}>
                <TouchableOpacity onPress={Actions.pop} underlayColor="transparent" style={[styles.return]}>
                    <View style={[styles.returnBox, {display: this.props.leftShow == 'none' ? 'none' : null}]}>
                        <Image
                            source={require('../static/images/icon/goback.png')}
                            style={[styles.headerReturnIcon]}
                        />
                        <Text style={[styles.headerReturnText]}>返回</Text>
                    </View>
                </TouchableOpacity>
                <Text style={[styles.title]} numberOfLines={1}>
                    {this.props.title}
                </Text>
                <TouchableOpacity underlayColor="transparent" style={[styles.done]} onPress={ () => this.change(actions) }>
                    <View style={[styles.doneBox]}>
                        <Image
                            source={require('../static/images/icon/yi.png')}
                            style={[styles.headerRightIcon, {display: this.props.rightIcon == 'none' ? 'none' : null}]}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: gDevice.android ? 46 : 46 + statusBarHeight,
        backgroundColor: '#f8f8f6',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#d6d6d6',
    },
    return: {
        flex: 1
    },
    returnBox: {
        flexDirection: 'row',
        marginLeft: 10
    },
    headerReturnIcon: {
        width: 20,
        height: 20,
    },
    headerReturnText: {
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
    },
    done: {
        flex: 1,
        alignItems: 'flex-end',
    },
    doneBox: {
        marginRight: 10,
        flexDirection: 'row',
    },
    headerRightIcon: {
        width: 20,
        height: 20
    }
});

export default connect(state => ({
        state: state.changelan
    }),
    (dispatch) => ({
        actions: bindActionCreators(changeActions, dispatch)
    })
)(Header);
