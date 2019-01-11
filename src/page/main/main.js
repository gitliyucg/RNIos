import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, Image, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { styles } from "../../static/style/main_style";
import Header from "../../common/Header";

export default class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reset: true,
            user: {},
            mobile: null,
            orderList: [],
            type1: 0, //还款中
            type2: 0, //待签字
            type3: 0, //审核中
            type4: 0, //已结清
            type5: 0, //已驳回
            thumb: null,
            pic: null
        }

    }

    componentDidMount(){
        this.get()
    }

    get = () => {
        // 获取用户详情
        fetch(API('/users/detail'), {
            method: 'POST',
            body: signData()
        }).then( (res) => res.json() ).then( (response) => {
            if(response['err_no'] == 0){
                this.setState({
                    user: response['results'],
                    mobile: response['results']['mobile'],
                    thumb: response['results']['thumb'],
                    pic: response['results']['pic'],
                })
            }
        } )
        // 获取订单详情
        fetch(API('/order/'),{
            method: 'POST',
            body: signData()
        }).then( (res) => res.json() ).then( (response) => {
            if(response['err_no'] == 0){
                let type1 = 0;let type2 = 0;let type3 = 0;let type4 = 0;let type5 = 0;
                response['results'].map( (item, index) => {
                    switch (item['examine_status']) {
                        case 0:
                            type3 += 1
                            break;
                        case 1:
                            type2 += 1
                            break;
                        case 2:
                            type5 += 1
                            break;
                        case 4:
                            type1 += 1
                            break;
                        case 5:
                            type4 += 1
                            break;
                    }
                } )
                this.setState({
                    type1: type1,
                    type2: type2,
                    type3: type3,
                    type4: type4,
                    type5: type5,
                })
                if(this.state.type2 > 0 && this.props.tost != false){
                    Alert.alert(
                        i18n.t('main.alert'),
                        i18n.t('main.alerttext'),
                        [
                            {text: 'OK', onPress: () => Actions.repayment({'orderType': 1})},
                        ],
                        { cancelable: false }
                    )
                }
            }
        } )
    }

    tolist = (ID) => {
        // 0为还款中 1为待签字 2为审核中 3为已结清 4为已驳回 5为我的认证 6为银行卡 7为设置 8为关于
        switch (ID) {
            case 0:
                if (token == null) {
                    Actions.login()
                }else{
                    Actions.repayment({'orderType': 4});
                }
                break;
            case 1:
                if (token == null) {
                    Actions.login()
                }else{
                    Actions.repayment({'orderType': 1});
                }
                break;
            case 2:
                if (token == null) {
                    Actions.login()
                }else{
                    Actions.repayment({'orderType': 0});
                }
                break;
            case 3:
                if (token == null) {
                    Actions.login()
                }else{
                    Actions.repayment({'orderType': 5});
                }
                break;
            case 4:
                if (token == null) {
                    Actions.login()
                }else{
                    Actions.repayment({'orderType': 2});
                }
                break;
            case 5:
                if (token == null) {
                    Actions.login()
                }else{
                    Actions.renzheng();
                }
                break;
            case 6:
                if (token == null) {
                    Actions.login()
                }else{
                    Actions.mybank();
                }
                break;
            case 7:
                if (token == null) {
                    Actions.login()
                }else{
                    Actions.setting();
                }
                break;
            case 8:
                Actions.about();
                break;
        }
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.mobile){
            Storage.get('token').then( (response) => {
                this.setState({
                    token: response
                })
            } )
            this.get();
            this.setState({
                mobile: nextProps.mobile
            })
        }else {
            this.get();
        }
        
    }

    render(){
        return (
            <View style={styles.container}>
                {/*头部组件*/}
                <Header title={ i18n.t('main.title') } leftShow="none"/>
                {/*用户头象及用户名*/}
                <View style={styles.back}>
                    <View style={styles.userimgwrap}>
                        {
                            this.state.thumb == null || this.state.thumb == ''?
                            <Image style={styles.user} source={require("../../static/images/user.png")}/> :
                            <Image style={styles.user} source={{uri: this.state.thumb}}/> 
                        }
                    </View>
                    {
                        this.state.mobile == null ? 
                        <Text style={styles.logtext}>{ i18n.t('main.logtext') }</Text> :
                        <Text style={styles.logtext}>{this.state.mobile}</Text>
                    }
                </View>

                <View style={[styles.dingdanwrap, bodyContent]}>
                    <View style={styles.ddtop}>
                        <Image style={styles.icon} source={require("../../static/images/icon/dingdanx3.png")}/>
                        <Text style={styles.listtext}>{ i18n.t('main.dd') }</Text>
                    </View>
                    <View style={styles.dingdanlist}>
                            
                        {/*还款中Start*/}
                        <TouchableOpacity style={styles.dlistwrap} onPress={ () => this.tolist(0) }>
                            <Image style={styles.xian} source={require("../../static/images/icon/sxx3.png")} />
                            <Image style={styles.ddlisticon} source={require("../../static/images/icon/huankuanx3.png")} />
                            <View style={styles.ddlistcont}>
                                <Text style={styles.ddlisttext}>{ i18n.t('main.hk') }</Text>
                                <Text style={styles.ddlisttext}>{ this.state.type1 == 0 ? i18n.t('main.nodata') : this.state.type1 + i18n.t('main.data') }</Text>
                            </View>
                            <Text style={[styles.ddlistnum, {backgroundColor: '#f6a881'}]}>{this.state.type1}</Text>
                            <Image style={styles.ddlistrighticon} source={require("../../static/images/icon/right.png")}/>
                        </TouchableOpacity>
                        {/*还款中End*/}

                        {/*待签字Start*/}
                        <TouchableOpacity style={styles.dlistwrap} onPress={ () => this.tolist(1) }>
                            <Image style={styles.xian} source={require("../../static/images/icon/sxx3.png")} />
                            <Image style={styles.ddlisticon} source={require("../../static/images/icon/dqx3.png")} />
                            <View style={styles.ddlistcont}>
                                <Text style={styles.ddlisttext}>{ i18n.t('main.dq') }</Text>
                                <Text style={styles.ddlisttext}>{ this.state.type2 == 0 ? i18n.t('main.nodata') : this.state.type2 + i18n.t('main.data') }</Text>
                            </View>
                            <Text style={[styles.ddlistnum, {backgroundColor: '#a3c8f2'}]}>{this.state.type2}</Text>
                            <Image style={styles.ddlistrighticon} source={require("../../static/images/icon/right.png")}/>
                        </TouchableOpacity>
                        {/*待签字End*/}

                        {/*审核中Start*/}
                        <TouchableOpacity style={styles.dlistwrap} onPress={ () => this.tolist(2) }>
                            <Image style={styles.xian} source={require("../../static/images/icon/sxx3.png")} />
                            <Image style={styles.ddlisticon} source={require("../../static/images/icon/shx3.png")} />
                            <View style={styles.ddlistcont}>
                                <Text style={styles.ddlisttext}>{ i18n.t('main.sh') }</Text>
                                <Text style={styles.ddlisttext}>{ this.state.type3 == 0 ? i18n.t('main.nodata') : this.state.type3 + i18n.t('main.data') }</Text>
                            </View>
                            <Text style={[styles.ddlistnum, {backgroundColor: '#f6c94c'}]}>{this.state.type3}</Text>
                            <Image style={styles.ddlistrighticon} source={require("../../static/images/icon/right.png")}/>
                        </TouchableOpacity>
                        {/*审核中End*/}

                        {/*已结清Start*/}
                        <TouchableOpacity style={styles.dlistwrap} onPress={ () => this.tolist(3) }>
                            <Image style={styles.xian} source={require("../../static/images/icon/sxx3.png")} />
                            <Image style={styles.ddlisticon} source={require("../../static/images/icon/jqx3.png")} />
                            <View style={styles.ddlistcont}>
                                <Text style={styles.ddlisttext}>{ i18n.t('main.yj') }</Text>
                                <Text style={styles.ddlisttext}>{ this.state.type4 == 0 ? i18n.t('main.nodata') : this.state.type4 + i18n.t('main.data') }</Text>
                            </View>
                            <Text style={[styles.ddlistnum, {backgroundColor: '#7bbafd'}]}>{this.state.type4}</Text>
                            <Image style={styles.ddlistrighticon} source={require("../../static/images/icon/right.png")}/>
                        </TouchableOpacity>
                        {/*已结清End*/}

                        {/*已驳回Start*/}
                        <TouchableOpacity style={styles.dlistwrap} onPress={ () => this.tolist(4) }>
                            <Image style={styles.xian} source={require("../../static/images/icon/sxx3.png")} />
                            <Image style={styles.ddlisticon} source={require("../../static/images/icon/bhx3.png")} />
                            <View style={styles.ddlistcont}>
                                <Text style={styles.ddlisttext}>{ i18n.t('main.bh') }</Text>
                                <Text style={styles.ddlisttext}>{ this.state.type5 == 0 ? i18n.t('main.nodata') : this.state.type5 + i18n.t('main.data') }</Text>
                            </View>
                            <Text style={[styles.ddlistnum, {backgroundColor: '#e889e7'}]}>{this.state.type5}</Text>
                            <Image style={styles.ddlistrighticon} source={require("../../static/images/icon/right.png")}/>
                        </TouchableOpacity>
                        {/*已驳回End*/}

                    </View>
                </View>

                <View style={[bodyContent, styles.listwrap]}>
                    <TouchableOpacity style={styles.listchild} onPress={ () => this.tolist(5) }>
                        <Image style={styles.icon} source={require("../../static/images/icon/dingdanx3.png")}/>
                        <Text style={styles.listtext}>{ i18n.t('main.rz') }</Text>
                        <Image style={styles.righticon} source={require("../../static/images/icon/right.png")}/>
                    </TouchableOpacity>        
                    <TouchableOpacity style={styles.listchild} onPress={ () => this.tolist(6) }>
                        <Image style={styles.icon} source={require("../../static/images/icon/kax3.png")}/>
                        <Text style={styles.listtext}>{ i18n.t('main.ka') }</Text>
                        <Image style={styles.righticon} source={require("../../static/images/icon/right.png")}/>
                    </TouchableOpacity>                                    
                </View>

                <View style={[bodyContent, styles.listwrap]}>
                    <TouchableOpacity style={styles.listchild} onPress={ () => this.tolist(7) }>
                        <Image style={styles.icon} source={require("../../static/images/icon/settingx3.png")}/>
                        <Text style={styles.listtext}>{ i18n.t('main.setting') }</Text>
                        <Image style={styles.righticon} source={require("../../static/images/icon/right.png")}/>
                    </TouchableOpacity>        
                    <TouchableOpacity style={styles.listchild} onPress={ () => this.tolist(8) }>
                        <Image style={styles.icon} source={require("../../static/images/icon/aboutx3.png")}/>
                        <Text style={styles.listtext}>{ i18n.t('main.about') }</Text>
                        <Image style={styles.righticon} source={require("../../static/images/icon/right.png")}/>
                    </TouchableOpacity>                                    
                </View>
            </View>
        ); 
    }
    
}


