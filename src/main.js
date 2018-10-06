// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import $ from 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import './assets/icon/iconfont.css';
import utils from './utils/util.js';
import Js2WordCloud from 'js2wordcloud';
Vue.filter('numTransform',utils.numTransform);

const service = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1/douyu',
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
	var result=res.data;
    // 对响应数据做点什么
    return res;
},function(error){
    // 对响应错误做点什么
    return Promise.reject(error);
})
Vue.use(ElementUI);
Vue.prototype.$http = service;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
