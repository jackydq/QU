﻿function Regular(z){return (new RegExp(z).test(this));}

/*全局设置 axios 发送请求时候带上cookie*/
axios.defaults.withCredentials = true ;
if(!axios){ $.toast('浏览器不支持axios发送请求');}

var xq = {
    gzhAppId:'wxd43c12a546e3de86',
    /*用于授权的测试手机号*/
    testPhoneNum:'13297133121',
    appId:'5331a43b2b91c4c0cb43f7011ccd99d68f31d516',
    app_secret:'b5805c036941cee0fef57192e7db9c13f9f84e77',
    /*接口地址*/
    xqAPI:'https://api.xqudj.com/api/',
    /*URL 取参*/
    getUrlParam:function(name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
     var r = window.location.search.substr(1).match(reg);    //匹配目标参数
     if (r != null) return decodeURIComponent(r[2]); return null;       //返回参数值
    },
    /*检测手机格式*/
    isPhone: function(num) {return Regular.call(num,/^(?:(?:1(?:3[4-9]|5[012789]|8[78])\d{8}|1(?:3[0-2]|5[56]|8[56])\d{8}|18[0-9]\d{8}|1[35]3\d{8})|14[57]\d{8}|170[059]\d{7}|17[678]\d{8})$/);},
    signCoputed:function(data){
        var arrParams = [];
        var objParams = data;

        for(var key in objParams){
            if (objParams.hasOwnProperty(key)){
                continue;
            }
            
            key = key.toLowerCase();
            
            if(key == 'appid' || key == 'timestamp' || key == 'sign'){
                continue;
            }
            
            arrParams.push(key + '=' + objParams[key]);
        }

        arrParams.push('appid=' + this.appId);
        arrParams.push('timestamp=' + (new Date().getTime()));
        arrParams.sort();

        var sign = arrParams.join('&');
        sign = sign + CryptoJS.MD5(this.app_secret);
        sign = CryptoJS.MD5(sign).toString();
        return sign;
    },
    wechatSignCoputed:function(data){
        var arrParams = [];
        var objParams = data;

        for(var key in objParams){
            if (objParams.hasOwnProperty(key)){
                continue;
            }
            
            key = key.toLowerCase();
            
            if(key == 'appid' || key == 'timestamp' || key == 'sign'){
                continue;
            }
            
            arrParams.push(key + '=' + objParams[key]);
        }

        arrParams.push('appid=' + this.appId);
        arrParams.push('timestamp=' + (new Date().getTime()));
        arrParams.sort();

        var sign = arrParams.join('&');
        sign = sign + CryptoJS.MD5(this.app_secret);
        sign = CryptoJS.MD5(sign).toString();
        return sign;
    }
};

