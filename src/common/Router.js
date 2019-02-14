import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Image, findNodeHandle, UIManager } from 'react-native';
import { Scene, Router, Actions, Reducer, ActionConst, Overlay, Tabs, Modal, Drawer, Stack, Lightbox, } from 'react-native-router-flux';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

// 引导页
import Guide from "../page/components/guide";
// 首页
import Home from "../page/index/home";
// 套餐詳情頁
import List from "../page/index/list";
// 贷款资料填写页面
import Loan1 from "../page/index/loan1";
import Loan2 from "../page/index/loan2";
// 法律协议
import Agreement from "../page/index/agreement";
// 申請成功
import Success from "../page/index/success";
// 信用
import Credit from "../page/credit/credit";
// 银行户口证明上传
import Bank from "../page/credit/bank";
// 身份证上传
import Idcard from "../page/credit/idcard";
// 上传组件
import Upload from "../page/credit/upload";
// 上传其他证件
import Other from "../page/credit/other";
// 我的
import Main from "../page/main/main";
// 订单列表
import Repayment from "../page/main/repayment";
// 订单详情
import Order from "../page/main/order";
// 待签字
import Sign from "../page/main/sign";
// 设置
import Setting from "../page/main/setting";
// 我的认证
import Renzheng from "../page/main/renzheng";
// 我的银行卡
import Mybank from "../page/main/mybank";
// 个人资料修改页面
import Personaldata from "../page/main/datum/personaldata";
// 住宅资料修改页面
import Zhuzhai from "../page/main/datum/zhuzhaidata";
// 抵押住宅资料页面
import Diya from "../page/main/datum/diyadata";
// 工作资料修改页面
import Workdata from "../page/main/datum/workdata";
// 身份证修改页面
import Idedit from "../page/main/datum/idedit";
// 其他资料修改页面
import Otheredit from "../page/main/datum/otheredit";
// 关于我们
import About from "../page/main/about";
// 登录
import Login from "../page/login/login";
// 大圖預覽
import Img from "../page/components/img";


const Images = {
    Index: require('../static/images/icon/index1x1.png'),
    SelectIndex: require('../static/images/icon/index_action2x1.png'),
    Xin: require('../static/images/icon/xin2x1.png'),
    SelectXin: require('../static/images/icon/xin_action1x1.png'),
    Main: require('../static/images/icon/main1x1.png'),
    SelectMain: require('../static/images/icon/main_action2x1.png'),
}

const IndexIcon = ({focused , title}) => {
    return (
        <Image style={styles.iconstyle} source={focused ? Images.SelectIndex : Images.Index}/>
    );
};
const XinIcon = ({focused , title}) => {
    return (
        <Image style={styles.iconstyle} source={focused ? Images.SelectXin : Images.Xin}/>
    );
};
const MainIcon = ({focused , title}) => {
    return (
        <Image style={styles.iconstyle} source={focused ? Images.SelectMain : Images.Main}/>
    );
};

class Routers extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { state } = this.props;
        return (
            <Router>
                <Scene tabBarPosition="bottom" key="root">
                    <Tabs
                        hideNavBar
                        key="tabbar"
                        swipeEnabled
                        wrap={false}
                        // 是否显示标签栏文字
                        showLabel={true}
                        tabBarStyle={{backgroundColor: "#f8f8f8"}}
                        //tab选中的颜色
                        activeBackgroundColor="#f8f8f8"
                        //tab没选中的颜色
                        inactiveBackgroundColor="#f8f8f8"
                        // 选中tabbar图标的颜色
                        activeTintColor='#ebaa24'       
                        inactiveTintColor='#4e4e4e'
                        >
                        <Scene key="home" icon = { IndexIcon } component={Home} title={ i18n.t('tabs.home') }/>
                        <Scene key="xin" icon={ XinIcon } component={Credit} title={ i18n.t('tabs.xin') }/>
                        <Scene key="main" icon={ MainIcon } component={Main} title={ i18n.t('tabs.main') }/>
                    </Tabs>
                    <Scene hideNavBar key="login" component={Login}/>
                    <Scene hideNavBar key="guide" component={Guide}/>
                    <Scene hideNavBar key="loan1" component={Loan1}/>
                    <Scene hideNavBar key="loan2" component={Loan2}/>
                    <Scene hideNavBar key="list" component={List}/>
                    <Scene hideNavBar key="agreement" component={Agreement}/>
                    <Scene hideNavBar key="success" component={Success}/>
                    <Scene hideNavBar key="bank" component={Bank}/>
                    <Scene hideNavBar key="idcard" component={Idcard}/>
                    <Scene hideNavBar key="upload" component={Upload}/>
                    <Scene hideNavBar key="repayment" component={Repayment}/>
                    <Scene hideNavBar key="setting" component={Setting}/>
                    <Scene hideNavBar key="renzheng" component={Renzheng}/>
                    <Scene hideNavBar key="person" component={Personaldata}/>
                    <Scene hideNavBar key="zhuzhai" component={Zhuzhai}/>
                    <Scene hideNavBar key="diya" component={Diya}/>
                    <Scene hideNavBar key="work" component={Workdata}/>
                    <Scene hideNavBar key="about" component={About}/>
                    <Scene hideNavBar key="other" component={Other}/>
                    <Scene hideNavBar key="order" component={Order}/>
                    <Scene hideNavBar key="sign" component={Sign}/>
                    <Scene hideNavBar key="idedit" component={Idedit}/>
                    <Scene hideNavBar key="mybank" component={Mybank}/>
                    <Scene hideNavBar key="otheredit" component={Otheredit}/>
                    <Scene hideNavBar key="img" component={Img}/>
                </Scene>
            </Router>
        );
    }
}

const styles = StyleSheet.create({
    iconstyle: {
        width: 20,
        height: 19
    },
});

export default connect(state => ({
        state: state.changelan
    })
)(Routers);

