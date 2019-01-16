import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { styles } from "../../static/style/home_style.js"
import { Actions } from 'react-native-router-flux';
import Header from "../../common/Header";
import JPushModule from 'jpush-react-native'
import * as changeActions from '../../actions/lanActions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [],
            pushMsg: null
        }
    }

    componentDidMount () {

        //获取RegistrationID  
        JPushModule.getRegistrationID((id)=>{
            if (id == '') {
                if (LAN) {
                    this.props.actions.changeZh()
                }else{
                    this.props.actions.changeEn()
                }
            }else{
                PushID = id;
            }
        })

        // 首次进入判断是否重新加载
        Storage.get('token').then( (response) => {
            if( response != null ){
                fetch(API('/users/relogin'), {
                    method: 'POST',
                    body: signData({
                        token: response
                    })
                }).then( (res) => res.json() ).then( (data) => {
                    if ( data['err_no'] == 0 ) {
                        Storage.update('token', data['results']['token']);
                        Storage.update('id', data['results']['uid']);
                        token = data['results']['token'];
                    }else{
                        token = null;
                        Storage.delete('token');
                        Storage.delete('mobile');
                        Storage.delete('id');
                    }
                } )
            }
        } )

        // 获取套餐列表
        fetch(API('/set_meal/'), {
            method: 'POST',
            body: signData()
        }).then( (res) => res.json() ).then( (response) => {
            if(response['err_no'] == 0){
                this.setState({
                    list: response['results']
                })
            };
        } )

    }

    toDiya = (index) => {
        if(token == null){
            Actions.login();
        }else {
            if(index == 1){
                Actions.loan1({'loan': 'you'});
            }else{
                Actions.loan1({'loan': 'wu'});
            }
        }
    }

    // list模板
    renderComponent = ({ item }) => {
        return (
            <TouchableOpacity onPress={ () => this.ToPage(item.id)}>
                <View style={styles.listchild}>
                    <Image style={styles.listicon} source={{ uri: item.thumb }}/>
                    <View style={styles.cont}>
                        <Text>{ LAN ? item.title : item.title_en }</Text>
                        <View style={styles.conttextwrap}>
                            <Text style={styles.textcolorred}>{ item.price }{ LAN ? item.price_unit : item.price_unit_en }</Text>
                            <Text style={[styles.conttext, styles.textcolorhui]}>
                                { LAN ? item.day_rate_start : item.day_rate_start_en }
                                { item.day_rate }
                                { LAN ? item.day_rate_end : item.day_rate_end_en }
                            </Text>
                            <Text style={styles.textcolorred}>
                                { item.by_stages }
                                { LAN ? item.by_stages_end : item.by_stages_end_en }
                            </Text>
                        </View>
                        <Text style={styles.textcolorhui} numberOfLines={1}>
                            { LAN ? item.description : item.description_en }
                        </Text>
                    </View>
                    <View style={styles.listgo}>
                        <Image style={styles.goicon} source={require("../../static/images/icon/right.png")} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    } 

    ToPage = (ID) => {
        Actions.list({id: ID})
    }

    render(){
        return (
            <View style={[styles.container, main]}>
                {/*头部组件*/}
                <Header title={ i18n.t('index.title') } leftShow="none"/>
                <View style={styles.diyaview}>
                    {/*无抵押*/}
                    <View>
                        <TouchableOpacity style={styles.imgwrap} onPress={ () => this.toDiya(0) } underlayColor="transparent">
                            <Image onPress={ this.toDiya } style={styles.diyaicon} source={require("../../static/images/wudiyax1.png")}/>
                            <Text style={styles.diyatext}>{i18n.t('index.wu')}</Text>
                        </TouchableOpacity>
                    </View>
                    {/*有抵押*/}
                    <View>
                        <TouchableOpacity style={styles.imgwrap2} onPress={ () => this.toDiya(1) } underlayColor="transparent">
                            <Image style={styles.diyaicon} source={require("../../static/images/youdiyax1.png")}/>
                            <Text style={styles.diyatext}>{i18n.t('index.you')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*logo*/}
                <View style={styles.logowrap}>
                    <Image style={styles.logo} source={require("../../static/images/icon/logox3.png")} />
                    <Text style={styles.logotext}>{i18n.t('index.logo')}</Text>
                </View>
                {/*list組件入口*/}
                <FlatList data={this.state.list} renderItem={this.renderComponent} style={styles.listwrap} />
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
)(Home);
