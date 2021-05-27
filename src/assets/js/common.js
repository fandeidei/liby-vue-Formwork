import { getInterfaceMonitorData , getInterfaceOutOPMLoginData } from '../../untils/getData'
/* 状态管理vuex */
import Vue from 'vue'
import Vuex from 'vuex'
import store from '../../store/index'
Vue.use(Vuex)

export default {

    install(Vue)  {
        /* 让session过期接口 */
        Vue.prototype.outlockHandleClick = function(){
            getInterfaceOutOPMLoginData('','outOPM').then(response=>{
                if(response.data.code==200){
                    store.commit('getfinanceShow',false)
                }
            })
        },
        //处理埋点接口函数
        Vue.prototype.getMonitorDayFun = function(data,logType) {
            let logLevel = process.env.NODE_ENV == 'uat' ? 'DEBUG' : 'INFO'
            let NewMonitorData = data
            //获取全局变量
            let publicMonitorData = this.$store.state.publicMonitorData
            let content = ''
            //监控数据-合并对象转为字符串
            if(data!=''){
                content = this.objectToString(Object.assign(NewMonitorData,publicMonitorData))
            }else {
                content = this.objectToString(Object.assign(publicMonitorData))
            }
            let monitorParams = {
                appID:"easydata_mobile",//应用ID
                logType:logType,//日志分类
                logLevel:logLevel,//日志级别
                operator:publicMonitorData.B_USER_NAME,//操作人
                content: content  //日志内容
            }
            /* 调用埋点接口-插入数据到数据库 */
            getInterfaceMonitorData(monitorParams,'monitor').then(() => {
            })
        }

        Vue.prototype.objectToString = function(data){
            let newdata = JSON.stringify(data).replace(/,/g, "|")//全局替换，为|
            // let newdata =  String(data).replace(/,/g, "|")//全局替换，为|
            newdata = newdata.substr(1); //删除第一个字符
            let newresult = newdata.substr(0, newdata.length-1); //删除最后一个字符
            return  newresult
        }

        //埋点监控插入
        Vue.prototype.fontSize = function(res){
            let  clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
            if (!clientWidth) return;
            let fontSize = 100 * (clientWidth / 1920);
            return res*fontSize;
        }
        // 数据处理
        Vue.prototype.dataProcess = function(data,type,typeVal) {
            let num,unit
            if(data !== "" && data !== null && data !== undefined && data !== '--') {
                // if (data.indexOf(",") != -1) {
                var reg = /^-?[0-9]+.?[0-9]*/;//是否为数字
                //如果是数字
                if (reg.test(data)) {
                    if (type === 'money') {
                        if(typeVal==='tenth'){
                            // if(data>0 && data<100){
                            //     num = '<0.01'
                            //     unit = '万'
                            // }else 
                            if(data == null){
                                num = ''
                            }else {
                                num = ((data / 10000).toFixed(1)).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                                unit = "万"
                            }
                        }else{
                            num = ((data / 10000).toFixed(1)).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                            unit = "万"
                        }
                    } else if (type === 'percent') {
                        if(typeVal==='chartPercent'){
                            num = ((data * 100).toFixed(1)).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                            unit = '%'
                        }else if(data == null){
                            num = ''
                        }else{
                            num = ((data * 100).toFixed(1)).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                            unit = '%'
                        }
                    }else if (type === 'percentNumber') {
                        num = (data * 100).toFixed(1);
                        unit = '%'
                    }  else if (type === 'day') {
                        num = ((data / 1).toFixed(1)).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                        unit = '天'
                    } else if (type === 'stock') {
                        num = ((data / 10000).toFixed(1)).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                        unit = '万件'
                    }else if(type==='time'){
                        num = (data / 1).toFixed(1).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                        unit = '小时/单'
                    }else if(type==='home'){
                        num = ((data / 1).toFixed(0)).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                    }else if(type === 'chartPercent'){
                        num = ((data * 100).toFixed(0)).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                        unit = '%'
                    }else if (type === 'chartMoney') {
                        num = ((data / 10000).toFixed(0)).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                        unit = "元"
                    }else if(type === 'chartAveragePerson'){
                        num = ((data / 10000).toFixed(0)).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                        unit = "万/人"
                    }else if(type === 'number'){
                        num = ((data / 10000).toFixed(1)).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                        unit = "万"
                    }else if(type === 'family'){
                        num = ((data / 1).toFixed(0)).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                        unit = "家"
                    }else if(type === 'averagePerson'){
                        num = ((data / 10000).toFixed(1)).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                        unit = "万/人"
                    }else if(type === 'person'){
                        num = ((data / 1).toFixed(0)).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                        unit = "人"
                    }else if(type === ''){
                        num = data;
                        unit = ''
                    }else{
                        num = (data / 1).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
                        unit = ''
                    }
                    return {
                        num, unit
                    }
                } else {
                    num = data
                    unit = ''
                }
            } else {
                num = '--'
                unit = ''
            }
            return {
                num, unit
            }
        }

        //获取达成率
        Vue.prototype.getReach = function(sales,target,flag) {
            let result
            if(flag){
                if(target===null || sales===null || target===0){
                    result = '--'
                }else{
                    result = ((sales/target)*100).toFixed(0)
                }
            }else{
                if(target===null || sales===null || target===0){
                    result = '--'
                }else{
                    result = sales/target
                }
            }
            return result
        }
        //计算两个月份之间月份差
        Vue.prototype.getBetweenMonth = function(date1,date2){
            date1 = date1.split('-');
            // 得到月数
            date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
            // 拆分年月日
            date2 = date2.split('-');
            // 得到月数
            date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
            var month = date2 - date1;
            return month
        }

        //计算环比/同比
        Vue.prototype.getChainRatio = function(now,last,flag){
            if(now===null || last===null || last===0){
                return flag ? '--' : null
            }else{
                return flag ? ((now-last)/last*100).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")+'%' : ((now-last)/last*100).toFixed(0)
            }
        }
                /*
        string 字符串;
        str 指定字符;
        split(),用于把一个字符串分割成字符串数组;
        split(str)[0],读取数组中索引为0的值（第一个值）,所有数组索引默认从0开始;
        */
       Vue.prototype.getStr = function(string,str){
            // string = JSON.stringify(string)
            let str_before,str_after
            if(string!='--'){
                str_before = string.split(str)[0]+'.';
                str_after = string.split(str)[1];
            }else{
                str_before = '--';
                str_after = '';
            }
            return {
                before:str_before,
                after:str_after
            }
        }
          //获取浏览器信息
        Vue.prototype.getExplorerInfo = function() {
            // var explorer = window.navigator.userAgent.toLowerCase();
            return { 
                type: navigator.vendor, //浏览器内核
                version: navigator.appVersion,//浏览器版本
                system: navigator.platform,//系统平台
            };
        }
        // //获取ip地址
        // Vue.prototype.getIpAddress = function(callback){
        //     let recode = {};
        //     let RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        //     // 如果不存在则使用一个iframe绕过
        //     if (!RTCPeerConnection) {
        //         // 因为这里用到了iframe，所以在调用这个方法的script上必须有一个iframe标签
        //         // <iframe id="iframe" sandbox="allow-same-origin" style="display:none;"></iframe>
        //         let win = iframe.contentWindow;
        //         RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
        //     }
          
        //     //创建实例，生成连接
        //     let pc = new RTCPeerConnection();
          
        //     // 匹配字符串中符合ip地址的字段
        //     function handleCandidate(candidate) {
        //         let ip_regexp = /([0-9]{1,3}(\.[0-9]{1,3}){3}|([a-f0-9]{1,4}((:[a-f0-9]{1,4}){7}|:+[a-f0-9]{1,4}){6}))/;
        //         let ip_isMatch = candidate.match(ip_regexp)[1];
        //         if (!recode[ip_isMatch]) {
        //             callback(ip_isMatch);
        //             recode[ip_isMatch] = true;
        //         }
        //     }
          
        //     //监听icecandidate事件
        //     pc.onicecandidate = (ice) => {
        //         if (ice.candidate) {
        //             handleCandidate(ice.candidate.candidate);
        //         }
        //     };
        //     //建立一个伪数据的通道
        //     pc.createDataChannel('');
        //     pc.createOffer((res) => {
        //         pc.setLocalDescription(res);
        //     }, () => {});
          
        //     //延迟，让一切都能完成
        //     setTimeout(() => {
        //         let lines = pc.localDescription.sdp.split('\n');
        //         lines.forEach(item => {
        //             if (item.indexOf('a=candidate:') === 0) {
        //                 handleCandidate(item);
        //             }
        //         })
        //     }, 1000);
        // }

    //     //禁止页面滑动
    //     Vue.prototype.stopScoll() = function(){
    //         var mo=function(e){e.preventDefault();};
    //         document.body.style.overflow='hidden';
    //         document.addEventListener("touchmove",mo,false);
    //     }

    //     //取消滑动限制
    //     Vue.prototype.moveScoll() = function(){
    //         var mo=function(e){e.preventDefault();};
    //         document.body.style.overflow='';//出现滚动条
    //         document.removeEventListener("touchmove",mo,false);
    //     }

    //     /*通过正则获取url中的参数*/
    //     Vue.prototype.getUrlParam = function(name){
    //         return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    //     }
    //     Vue.prototype.getQueryVariable = function(variable)
    //     {
    //         var query = window.location.search.substring(1);
    //         var vars = query.split("&");
    //         for (var i=0;i<vars.length;i++) {
    //                 var pair = vars[i].split("=");
    //                 if(pair[0] == variable){return pair[1];}
    //         }
    //         return(false);
    //     }

        Vue.prototype.getUrlParams = function(name) { // 不传name返回所有值，否则返回对应值
            var url = window.location.search;
            if (url.indexOf('?') === 1) { return false; }
            url = url.substr(1);
            url = url.split('&');
            // eslint-disable-next-line no-redeclare
            var name = name || '';
            var nameres;
            // 获取全部参数及其值
            for(var i=0;i<url.length;i++) {
                var info = url[i].split('=');
                var obj = {};
                obj[info[0]] = decodeURI(info[1]);
                url[i] = obj;
            }
            // 如果传入一个参数名称，就匹配其值
            if (name) {
                for(let i=0;i<url.length;i++) {
                    for (const key in url[i]) {
                        if (key === name) {
                            nameres = url[i][key];
                        }
                    }
                }
            } else {
                nameres = url;
            }
            // 返回结果
            return nameres;
        }

    //     /*省区排序*/
        Vue.prototype.sortName = function(arr,eachName){
            arr.forEach(function(item){
                let temp=item[eachName];
                item.sortName=temp;
            });
            let resultArray = arr.sort(
                function compareFunction(param1, param2) {
                    return param1.sortName.localeCompare(param2.sortName,"zh");
                }
            );
            return resultArray;
        }

        /*计算环比同比*/
        Vue.prototype.getHandleComputed = function(molecule,denominator){
            var tempObj;
            if(!denominator){
                tempObj = 0
            }else {
                tempObj = (((molecule-denominator)/denominator)*100).toFixed(2);
            }
            return tempObj
        }

        Vue.prototype.getChainRatioComputed = function(now,last){
            if(now==last){
                return 0
            }else if((now==0 || now==null) && (last!=null && last!==0)){
                return -100
            }else if((last==0 || last==null) && (now!=null && now!==0)){
                return 100
            }else{
                return ((now-last)/last*100).toFixed(2)
            }
        }

        /* 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式 */
        Vue.prototype.obj2params = function(obj) {
            var result = '';
            var item;
            for (item in obj) {
                result += '&' + item + '=' + encodeURIComponent(obj[item]);
            }

            if (result) {
                result = result.slice(1);
            }
            return result;
        }


        /*获取数据限制日期*/
        Vue.prototype.getDateTimeLimit = function(startDate,endDate){
            let startYear = Number(startDate.substring(0,4))
            let startMonth = Number(startDate.substring(4,6))
            let endYear = Number(endDate.substring(0,4))
            let endMonth = Number(endDate.substring(4,6))

            // startMonth = startMonth 
            // startMonth = startMonth === 0 ? 12 : startMonth
            // startYear = startMonth === 0 ? startYear-1 : startYear

            // endMonth = endMonth -1
            // endMonth = endMonth === 0 ? 12 : endMonth
            // endYear = endMonth === 0 ? endYear-1 : endYear
            return {
                startYear,startMonth,endYear,endMonth
            }
        }

        //获取达成率
        Vue.prototype.getReachPercent = function(a,b){
            var reach
            if(b!=0 && b!=null){
                 reach = a/b
            }else{
                reach = ''
            }
            return reach
        }

        //地图颜色处理
        Vue.prototype.getMapColorList = function(data,minValue,midValue,maxValue) {
            let redList=[],yellowList=[],greenList=[],blueList=[],borderColor
            data.map((item)=>{
                if(item.value<=minValue){
                    redList.push(item)
                }else if(item.value>minValue && item.value<midValue){
                    yellowList.push(item)
                }else if(item.value>=minValue && item.value<maxValue){
                    greenList.push(item)
                }else if(item.value>=maxValue){
                    blueList.push(item)
                }
            })
            if(yellowList.length == 0 && greenList.length == 0 && blueList.length == 0){
                borderColor = '#CA351E'
            }else if(redList.length == 0 && greenList.length == 0 && blueList.length == 0){
                borderColor = '#ff9b3c'
            }else if(redList.length == 0 && yellowList.length == 0 && blueList.length == 0){
                borderColor = '#4ec7dd'
            }else if(redList.length == 0 && yellowList.length == 0 && greenList.length == 0){
                borderColor = '#4696e0'
            }else{
                borderColor = '#062d58'
            }
            return borderColor
        }

        //获取数据时间
        Vue.prototype.getCurrentDate = function(){
            let date = new Date;
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            month = month <10 ? '0'+ month : month
            day = day <10 ? '0'+ day : day
            let currentMonth = year+''+month
            let currentDate = year+''+month+''+day
            return {
                currentMonth,currentDate
            }
        }
        Vue.prototype.getBeforeDate = function(n){
            // var n = n;
            var d = new Date();
            // var year = d.getFullYear();
            var mon=d.getMonth()+1;
            var day=d.getDate();
            if(day <= n){
                    if(mon>1) {
                       mon=mon-1;
                    }
                   else {
                    //  year = year-1;
                     mon = 12;
                     }
                   }
                  d.setDate(d.getDate()-n);
                //   year = d.getFullYear();
                  mon=d.getMonth()+1;
                  day=d.getDate();
            var s = (mon<10?('0'+mon):mon)+(day<10?('0'+day):day);
            return s;
        }

        Vue.prototype.Base64 = function() {
        
            // private property
            var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        
            // public method for encoding
            this.encode = function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
                input = _utf8_encode(input);
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
                }
                return output;
            }
        
            // public method for decoding
            this.decode = function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;
                // eslint-disable-next-line no-useless-escape
                input = input.replace(/[^A-Za-z0-9\+/\=]/g, "");
                while (i < input.length) {
                    enc1 = _keyStr.indexOf(input.charAt(i++));
                    enc2 = _keyStr.indexOf(input.charAt(i++));
                    enc3 = _keyStr.indexOf(input.charAt(i++));
                    enc4 = _keyStr.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                }
                output = _utf8_decode(output);
                return output;
            }
        
            // private method for UTF-8 encoding
            var _utf8_encode = function (string) {
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";
                for (var n = 0; n < string.length; n++) {
                    var c = string.charCodeAt(n);
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
        
                }
                return utftext;
            }
        
            // private method for UTF-8 decoding
            var _utf8_decode = function (utftext) {
                var string = "";
                var i = 0;
            var c = 0
            var c2 = 0;
            var c3 = 0;
                while ( i < utftext.length ) {
                    c = utftext.charCodeAt(i);
                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    } else if((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i+1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    } else {
                        c2 = utftext.charCodeAt(i+1);
                        c3 = utftext.charCodeAt(i+2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
                }
                return string;
            }
        }
        
        //URL加密  
        Vue.prototype.Secret_Key = function(str,pwd,type) {	
            var b = new this.Base64(); //Base64加密
            if(type=='encryption'){
                str = b.encode(str);//Base64加密
                var prand = "";
                for(var i=0; i<pwd.length; i++) {
                    prand += pwd.charCodeAt(i).toString();
                }
                var sPos = Math.floor(prand.length / 5);
                var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos*2) + prand.charAt(sPos*3) + prand.charAt(sPos*4) + prand.charAt(sPos*5));
                var incr = Math.ceil(pwd.length / 2);
                var modu = Math.pow(2, 31) - 1;
                if(mult < 2) {
                    alert("Please choose a more complex or longer password.");
                    return null;
                }
                var salt = Math.round(Math.random() * 1000000000) % 100000000;
                prand += salt;
                while(prand.length > 10) {
                    prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
                }
                prand = (mult * prand + incr) % modu;
                var enc_chr = "";
                var enc_str = "";
                for(let i=0; i<str.length; i++) {
                    enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
                    if(enc_chr < 16) {
                    enc_str += "0" + enc_chr.toString(16);
                    } else enc_str += enc_chr.toString(16);
                    prand = (mult * prand + incr) % modu;
                }
                salt = salt.toString(16);
                while(salt.length < 8)salt = "0" + salt;
                enc_str += salt;
                return enc_str;
            }
            if(type=='decryption'){
                let prand = "";
                for(let i=0; i<pwd.length; i++) {
                prand += pwd.charCodeAt(i).toString();
                }
                let sPos = Math.floor(prand.length / 5);
                let mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos*2) + prand.charAt(sPos*3) + prand.charAt(sPos*4) + prand.charAt(sPos*5));
                let incr = Math.round(pwd.length / 2);
                let modu = Math.pow(2, 31) - 1;
                let salt = parseInt(str.substring(str.length - 8, str.length), 16);
                str = str.substring(0, str.length - 8);
                prand += salt;
                while(prand.length > 10) {
                prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
                }
                prand = (mult * prand + incr) % modu;
                let enc_chr = "";
                let enc_str = "";
                for(let i=0; i<str.length; i+=2) {
                enc_chr = parseInt(parseInt(str.substring(i, i+2), 16) ^ Math.floor((prand / modu) * 255));
                enc_str += String.fromCharCode(enc_chr);
                prand = (mult * prand + incr) % modu;
                }
                //return enc_str;
                return b.decode(enc_str);
            }
        }
        Vue.prototype.getLastMonth = function(date) {
            let year = date.substring(0,4)
            let month = date.substring(4,6)
            month = Number(month)-1
            // month = month===0 ? 12 : month
            // year = month===12 ? Number(year)-1 : year
            return {
                year,month
            }
        }
    }
}