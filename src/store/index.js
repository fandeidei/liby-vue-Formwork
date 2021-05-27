import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let date = new Date;
let year = date.getFullYear();
let hisYear = date.getFullYear() -1; 
let month = date.getMonth() + 1;
let day = date.getDate()
let hisMonth = date.getMonth();
month = month <10 ? '0'+ month : month
day = day <10 ? '0'+ day : day
hisMonth = hisMonth <10 ? '0'+ hisMonth : hisMonth

//昨天的时间
let day1 = new Date();
day1.setTime(day1.getTime()-24*60*60*1000);
let lastMonth = day1.getMonth()+1
let yestoday = day1.getDate()
lastMonth = lastMonth <10 ? '0'+ lastMonth : lastMonth
yestoday = yestoday <10 ? '0'+ yestoday : yestoday
var lastDay = day1.getFullYear()+''+lastMonth+''+yestoday

export default new Vuex.Store({
  state: {
    dataType:'月',
    pageSize:10000,
    currentDate:year+''+month,       //今年的时间  202005
    currentDayDate:year+''+month +''+ day, //今年的时间  2020 05 01
    hisMonth:year+''+hisMonth,       //上个月时间  202004
    hisCurrentDate:hisYear+''+month, //去年的时间  201905
    keyValue:'集团',              //头部tab切换到的模块名称
    brandName:'集团',                 //brand_name参数 
    financeShow:false,                // 是否显示输入密码
    radarIndex:0,
    highlightIndex:1,
    radardataName:'立白',
    lastDay:lastDay,
    rulesList:'',//预警规则
    loginName:'',//用户
    password:'',//密码
    //埋点监控
    publicMonitorData:{
        B_USER_ID:'',//登陆账号(ID)
        B_USER_NAME:'',//登陆用户(NAME)
        B_USER_IP:'',//登陆IP(IP)
        B_TERMINAL_TYPE:'',//终端类型(TYPE)
        B_TERMINAL_VERSION:'',//终端版本(VERSION)
        B_APP_PLATFORM:'',//应用平台(PLATFORM)
        B_APP_SYSTEM:'',//系统类型(SYSTEM)
        B_APP_NAME:'经营管理大屏',//专题名称(NAME)
        B_PAGE_PATH:'',//页面的路径
        B_APP_TOPIC_ID:'', //专题的ID
        B_APP_TOPIC_NAME:'',//专题名称(topic)
        B_APP_MODEL:'经营管理大屏',//专题名称(topic)
    },
    /* 点击事件-不跳转页面 */
    clickMonitorData:{
        // B_APP_PAGE:'渠道',//模块名称(PAGE)
        // E_CLICK_NAME:'渠道',//点击名称
        B_APP_PAGE:'',//模块名称(PAGE)
        E_CLICK_NAME:'',//点击名称
    },
    /* 点击事件-跳转页面 */
    turnMonitorData:{
        B_APP_PAGE:'',//模块名称(PAGE)
        E_CLICK_NAME:'',//点击名称
        E_CLICK_URL:'',//点击路径(URL)
        E_TURN_URL:'',//跳转路径(URL)
    }
  }, 
  mutations: {
    /* 更新当前日期 */
    getCurrentDate(state,data){
      state.currentDate = data;// 之后才是修改state中的状态
    },
    /* 更新当前日期类型 */
    getDateType(state,data){
      state.dataType = data;// 之后才是修改state中的状态
    },
    /* 更新当前模块名称 */
    getKeyValue(state,data){
      state.keyValue = data;// 之后才是修改state中的状态
    },
    /* 更新当前密码弹窗 */
    getfinanceShow(state,data){
      state.financeShow = data;// 之后才是修改state中的状态
    },
    /* 更新当前brandNamea参数 */
    getBrandName(state,data){
      state.brandName = data;// 之后才是修改state中的状态
    },
    /* 更新当前brandNamea参数 */
    getRadarIndex(state,data){
      state.radarIndex = data;// 之后才是修改state中的状态
    },
    getRadardataName(state,data){
      state.radardataName = data;// 之后才是修改state中的状态
    },
    /* 更新当前brandNamea参数 */
    getHighlightIndex(state,data){
      state.highlightIndex = data;// 之后才是修改state中的状态
    },
    /* 更新当前预警规则数据 */
    getRulesList(state,data){
      state.rulesList = data;// 之后才是修改state中的状态
    },
    /* 更新用户账号 */
    getLoginName(state,data){
      state.loginName = data;// 之后才是修改state中的状态
    },
    /* 更新用户密码 */
    getPassword(state,data){
      state.password = data;// 之后才是修改state中的状态
    },
     /* 修改埋点监控的值 */
     getPublicMonitorData(state,data){
        state.publicMonitorData = data;
    },
     /* 修改埋点监控的值 */
    getClickMonitorData(state,data){
        state.clickMonitorData = data;// 之后才是修改state中的状态
    },
     /* 修改埋点监控的值 */
    getTurnMonitorData(state,data){
        state.turnMonitorData = data;// 之后才是修改state中的状态
    },
  },
  actions: {
  },
  modules: {
  }
})
