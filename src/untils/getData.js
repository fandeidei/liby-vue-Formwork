import axios from './libs/api.request'
import config from './libs/config'
// import { obj2params } from '../assets/js/common'

/**
 *  post请求--数据服务总线--key值
 * @param {*} params 
 */
export const getInterfaceData = (data,params) => {
  return axios.request({
    url: config.requestUrl+'?v='+data.serviceId+'/'+params,
    data,
    method: 'post'
  })
}
/**
 *  post请求--数据服务总线--key值
 * @param {*} params 
 */
export const getInterfaceData1 = (data,params) => {
  return axios.request({
    url: 'https://dcc.liby.com.cn/hanadcc/queryByPage'+'?v='+data.serviceId+'/'+params,
    data,
    method: 'post'
  })
}

/**
 *  post请求--是否登录
 * @param {*} params 
 */
export const getInterfaceIsLoginData = (data) => {
  return axios.request({
    url: config.dataUrl,
    data:obj2params(data),
    method: 'post'
  })
}
/**
 *  post请求--是否登录
 * @param {*} params 
 */
export const getInterfaceToLoginData = (data) => {
  return axios.request({
    url: config.url,
    data:obj2params(data),
    method: 'post'
  })
}
/**
 *  post请求--是否登录
 * @param {*} params 
 */
export const getInterfaceIsOPMLoginData = (data) => {
  return axios.request({
    url: config.profitIsLoginUrl,
    data:obj2params(data),
    method: 'post'
  })
}
/**
 *  post请求--是否登录
 * @param {*} params 
 */
export const getInterfaceToOPMLoginData = (data) => {
  return axios.request({
    url: config.profitToLoginUrl,
    data:obj2params(data),
    method: 'post'
  })
}
/**
 *  post请求--是否登录
 * @param {*} params 
 */
export const getInterfaceOutOPMLoginData = (data) => {
  return axios.request({
    url: config.profitOutLoginUrl,
    data:obj2params(data),
    method: 'post'
  })
}

//post请求--埋点监控接口
export const getInterfaceMonitorData = (data,params) => {
    return axios.request({
      url: config.monitorUrl+'?v='+params,
      data,
      method: 'post'
    })
  }

// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
function obj2params(obj) {
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