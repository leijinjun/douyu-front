import axios from 'axios'
import { Message } from 'element-ui'
let baseUrl = 'http://127.0.0.1:8881/front';
if(location.hostname=='danmu.lei2j.com'){
	baseUrl= 'https://danmu.lei2j.com/front';
}
const service = axios.create({
    withCredentials: true,
    baseURL: baseUrl,
    timeout: 300000 // 请求超时时间
})

service.interceptors.request.use(function(config){
     // 在发送请求之前做些什么
    return config;
},function(error){
    // 对请求错误做些什么
    return Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(function(response){
    var res = response.data;
    if(res.errCode!=0){
        Message({
        message: res.errMsg,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(response);
    }
    return res;
},function(error){
    console.log(error)
    Message({
    message: error.message,
    type: 'error',
    duration: 3 * 1000
    })
    return Promise.reject(error)
})
export default service;