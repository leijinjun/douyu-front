import Vue from 'vue'
import Router from 'vue-router'
import RoomDetail from '@/components/room_detail'
import DanmuList from '@/components/danmu_list'
import Geetest from '@/components/gt'
import ECharts from '@/components/echarts'
import RoomView from '@/components/room_view'
import Home from '@/components/home'

Vue.use(Router)

export default new Router({
	base:"/",
	mode: 'history',
  routes: [
    {
      path:'/',
      name:'Home',
      component:Home
    },
    {
      path: '/room/:roomId',
      name: 'RoomDetail',
      component: RoomDetail
    },
    {
      path: '/danmu/:roomId',
      name: 'DanmuList',
      component: DanmuList
    },
    {
      path: '/gt',
      name: 'Geetest',
      component: Geetest
    },
    {
      path: '/echart',
      name: 'Echarts',
      component: ECharts
    },
    {
      path: '/view/:roomId',
      name: 'RoomView',
      component: RoomView
    }
  ]
})
