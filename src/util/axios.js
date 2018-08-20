import axios from 'axios';
import baseURL from './http.js';
import {
    Message
} from 'element-ui';
// 创建axios实例
const service = axios.create({
    withCredentials: true,
    baseURL: baseURL,
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
service.interceptors.response.use(function(res){
    // 对响应数据做点什么
    return res;
},function(error){
    // 对响应错误做点什么
    return Promise.reject(error);
})

export default service
