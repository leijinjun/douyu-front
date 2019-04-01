// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import $ from 'jquery'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css';
import utils from './utils/util.js';
import service from '@/utils/request'
import $request from '@/utils/api'
//import Js2WordCloud from 'js2wordcloud';
Vue.filter('numTransform',utils.numTransform);
Vue.filter('util',utils);

Vue.use(ElementUI);
Vue.prototype.$http = service
Vue.prototype.$request = $request
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
