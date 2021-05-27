/*
 * @Descripttion: 
 * @version: 
 * @Author: gonghairun
 * @Date: 2020-08-04 10:00:40
 * @LastEditors: gonghairun
 * @LastEditTime: 2020-08-04 10:02:44
 */
let config = {
    'uat': {
        requestUrl:'https://dcc.libyuat.com/hanadcc/queryByPage',//测试--数据接口地址
        // requestUrl:'https://dcc.liby.com.cn/hanadcc/queryByPage',//生产--数据接口地址
        // url:'https://dcc.libyuat.com/hanadcc/user/toLogin',//是否已登录接口
        dataUrl:"http://dccuat.liby.com.cn/hanadcc/user/isLogin",//是否已登录接口
        profitToLoginUrl:"https://dcc.libyuat.com/hanadcc/user/toOPMLogin",//利润接口
        profitIsLoginUrl:"https://dcc.libyuat.com/hanadcc/user/isOPMLogin",//利润接口
        profitOutLoginUrl:"https://dcc.libyuat.com/hanadcc/user/outOPM",//利润接口
        loginUrl:'https://dcc.libyuat.com/DAP/#/login',
        monitorUrl:'https://dcc.libyuat.com/hanadcc/writeLog',//监控接口
    },
    'prd': {
        requestUrl:'https://dcc.liby.com.cn/hanadcc/queryByPage',//生产--数据接口地址
        // url:'https://dcc.liby.com.cn/hanadcc/user/toLogin',//是否已登录接口
        dataUrl:"https://dcc.liby.com.cn/hanadcc/user/isLogin",//是否已登录接口
        profitToLoginUrl:"https://dcc.liby.com.cn/hanadcc/user/toOPMLogin",//利润接口
        profitIsLoginUrl:"https://dcc.liby.com.cn/hanadcc/user/isOPMLogin",//利润接口
        profitOutLoginUrl:"https://dcc.liby.com.cn/hanadcc/user/outOPM",//利润接口
        // profitToLoginUrl:"https://dcc.libyuat.com/hanadcc/user/toOPMLogin",//利润接口
        // profitIsLoginUrl:"https://dcc.libyuat.com/hanadcc/user/isOPMLogin",//利润接口
        // profitOutLoginUrl:"https://dcc.libyuat.com/hanadcc/user/outOPM",//利润接口
        loginUrl:'http://easydata.liby.com.cn/DAP/#/login',
        monitorUrl:'https://dcc.liby.com.cn/hanadcc/writeLog',//监控接口
    }  
};
export default process.env.NODE_ENV == undefined || process.env.NODE_ENV == 'uat'  ?  config.prd : config.prd; 