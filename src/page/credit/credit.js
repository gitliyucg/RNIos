import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, Image, Button, TouchableOpacity, FlatList, ScrollView, RefreshControl} from 'react-native';
import { styles } from "../../static/style/credit_style";
import { Actions } from 'react-native-router-flux';
import Header from "../../common/Header";
import {bindActionCreators} from 'redux';
import * as counterActions from '../../actions/counterActions';
import { connect } from 'react-redux';

class Credit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: null,
            list: [],
            info: {},
            refreshing: false
        }
    }

    componentDidMount(){
        this.get();
    }

    get = () => {
        // 获取个人信息
        fetch(API('/users/detail'), {
            method: 'POST',
            body: signData()
        }).then( (res) => res.json() ).then( (response) => {
            if(response['err_no'] == 0){
                this.setState({
                    info: response['results'],
                    refreshing: false
                })
            }
        } )
        // 获取认证列表
        fetch(API('/authenticationscategorys/'), {
            method: 'POST',
            body: signData()
        }).then( (res) => res.json() ).then( (response) => {
            if(response['err_no'] == 0){
                this.setState({
                    list: response['results'],
                    refreshing: false
                })
            }
        } )
    }

    // 上传组件模板
    listCompontent = ({item}) => {
        return (
            <View style={[bodyContent, styles.listchild]}>
                <Image style={styles.listicon} source={{uri: item.thumb}} />
                <View style={styles.listcont}>
                    <Text numberOfLines={1}>{ LAN ? item.name : item.name_en }</Text>
                    <Text numberOfLines={1} style={styles.texthui}>{ LAN ? item.description : item.description_en }</Text>
                </View>
                <TouchableOpacity disabled={item.is_show == 1} style={[item.is_show == 1 ? styles.listbtnnone : styles.listbtn]} onPress={ () => this.toUpload(item.id, item.authentication_id, LAN ? item.name : item.name_en) }>
                    <Text style={styles.btntext}>{ i18n.t('credit.btn') }</Text>
                </TouchableOpacity>
            </View>
        );
    }

    toUpload = (id, uid, name) => {
        this.get();
        if(token == null){
            Actions.login()
        }else{
            if(id == 1){
                Actions.idcard({'id': id, 'uid': uid, 'titleName': name});
            }else if(id == 2){
                Actions.bank({'id': id, 'uid': uid, 'titleName': name});
            }else{
                Actions.other({'id': id, 'uid': uid, 'titleName': name});
            }
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.reset){
            this.get()
        };
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.get();
    }

    render(){
        return (
            <View style={main}>
                {/*头部组件*/}
                <Header title={ i18n.t('credit.title') } leftShow="none"/>
                <ScrollView
                    style={{height: scrollViewHeight}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    {/*银行卡*/}
                    <View style={styles.xinyong}>
                        <Image style={styles.kacao} source={require("../../static/images/kacaox1.png")}/>
                        <View style={styles.kawrap}>
                            <Image style={styles.ka} source={require("../../static/images/kax3.png")}/>
                            <Text style={styles.firm}>{ i18n.t('credit.firm') }</Text>
                            <Text style={styles.jifen}>{this.state.info['credits']}</Text>
                            <Text style={styles.account}>{this.state.info['card_num']}</Text>
                            <Text style={styles.date}>{this.state.info['create_time_str']}</Text>
                            <Text style={styles.name}>{this.state.info['last_name']} {this.state.info['first_name']}</Text>
                        </View>
                    </View>
                    <View style={[bodyContent, styles.titlewrap, {marginTop: 35,}]}>
                        <View style={styles.li}></View><Text style={{marginLeft: 10}}>{i18n.t('credit.text')}</Text>
                    </View>
                    {/*上传組件入口*/}
                    <FlatList style={[bodyContent, styles.listwrap]} data={this.state.list} renderItem={ this.listCompontent } />
                </ScrollView>
            </View>
        ); 
    }

}

export default connect(state => ({
        state: state.counter
    })
)(Credit);
