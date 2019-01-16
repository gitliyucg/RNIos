import {Dimensions,Platform,StatusBar,PixelRatio} from  'react-native';

import I18n from "../language/I18n.js";
import DataRepository from "../common/DataRepository.js"
import md5 from "./md5";

const {width, height} = Dimensions.get('window');
const OS = Platform.OS;
const ios = (OS == 'ios');
const android = (OS == 'android');
const isIPhoneX = (ios && height == 812 && width == 375);
const statusBarHeight = (ios ? (isIPhoneX ? 44 : 20) : StatusBar.currentHeight);

global.WIDTH = width;
global.HEIGHT = height;
global.statusBarHeight = statusBarHeight;

global.i18n = I18n;

global.LAN = I18n.locale.indexOf('zh') != -1 || I18n.locale == 'und' ? true : false;

global.PushID = null;

global.Storage = DataRepository;

global.gScreen = {
    onePixelRatio:1/PixelRatio.get(),
}

global.gDevice = {
    ios:ios,
    android:android,
    isIPhoneX:isIPhoneX,
}

global.main = {
	flex: 1,
	backgroundColor: '#ffffff'
}

global.bodyContent = {
	paddingLeft: 15,
	paddingRight: 15,
}

// http://baopin.wanmpserver.com:9086/
// http://47.91.212.63:9086/

global.API = function(url, version = 'v1'){
    return 'http://47.91.212.63:9086/' + version + url;
}

// 全局正则表达式验证香港手机号
global.phone = (phoneNum) => {
    // let reg1 = /^([6|9])\d{7}$/;
    // let reg2 = /^((13[0-9])|(15[^4])|(18[0,2,3,5-9])|(17[0-8])|(147))\\d{8}$/;
    // return reg1.test(phoneNum) || reg2.test(phoneNum);
    return true;
}

// 全局验证输入框只能输入纯数字
global.number = /[^\d]+/;

// 全局正则表达式验证香港身份证
global.HKID = (str) => {
    var strValidChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
     // basic check length
     if (str.length < 8)
     return false;
     // handling bracket
     if (str.charAt(str.length-3) == '(' && str.charAt(str.length-1) == ')')
     str = str.substring(0, str.length - 3) + str.charAt(str.length -2);
     // convert to upper case
     str = str.toUpperCase();
     // regular expression to check pattern and split
     var hkidPat = /^([A-Z]{1,2})([0-9]{6})([A0-9])$/;
     var matchArray = str.match(hkidPat);
     // not match, return false
     if (matchArray == null)
     return false;
     // the character part, numeric part and check digit part
     var charPart = matchArray[1];
     var numPart = matchArray[2];
     var checkDigit = matchArray[3];
     // calculate the checksum for character part
     var checkSum = 0;
     if (charPart.length == 2) {
     checkSum += 9 * (10 + strValidChars.indexOf(charPart.charAt(0)));
     checkSum += 8 * (10 + strValidChars.indexOf(charPart.charAt(1)));
     } else {
     checkSum += 9 * 36;
     checkSum += 8 * (10 + strValidChars.indexOf(charPart));
     }
     // calculate the checksum for numeric part
     for (var i = 0, j = 7; i < numPart.length; i++, j--)
     checkSum += j * numPart.charAt(i);
     // verify the check digit
     var remaining = checkSum % 11;
     var verify = remaining == 0 ? 0 : 11 - remaining;
     return verify == checkDigit || (verify == 10 && checkDigit == 'A');
}


// scrollView高度
global.scrollViewHeight = height - 46 - statusBarHeight

global.token = null

// 封装签名函数，便于请求接口
global.signData = (...options) => {
    let params = new FormData();
    let sign = {};
    let tap = Date.parse( new Date() ).toString();
    let time = tap.substr(0, 10)
    sign['cip'] = 3733117281;
    sign['key'] = 'WzhdxtxQlgdlkL';
    sign['loc'] = '0,0';
    sign['token'] = token;
    sign['sv'] = '1.1.2';
    sign['sys'] = 'iOS 9.0';
    sign['timestamp'] = time;
    // I18n.locale == 'zh' || I18n.locale == 'und' ? sign['language'] = 'simplified_chinese' : sign['language'] = 'english';
    sign['language'] = LAN ? 'simplified_chinese' : 'english';
    if(options.length != 0){
        let ag = Object.keys(options[0]);
        for(var i = 0; i < ag.length; i++){
            sign[ag[i]] = options[0][ag[i]]
        }
    }
    // 对象按字母表排序
    let arrMap = Object.keys(sign).sort();
    var newObj = {};
    let signMap = [];
    for(var i = 0; i < arrMap.length; i++){
        newObj[arrMap[i]] = sign[arrMap[i]];
    }
    for(var i in newObj){
        signMap.push(newObj[i])
    }
    // md5加密
    var signstr = '';
    for(var i = 0; i < signMap.length; i++){
        signstr += signMap[i];
        sign['sign'] = md5(md5(signstr) + 'TczAFlw@SyhYEyh*');
    }

    let from = Object.keys(sign);
    for(var i = 0; i < from.length; i++){
        params.append(from[i], sign[from[i]])
    }

    return params

}
