import Vue from 'vue'
import Router from 'vue-router'
import RoomDetail from '@/components/room_detail'
import DanmuList from '@/components/danmu_list'
import Geetest from '@/components/gt'
import ECharts from '@/components/echarts'
import RoomView from '@/components/room_view'
import Home from '@/components/home'
import HomeContainer from '@/components/common/homeContainer'
import Danmu from '@/components/danmu'
import RankingList from '@/components/rankingList'
import RoomList from '@/components/roomList'

Vue.use(Router)

export default new Router({
	base:"/",
	mode: 'history',
  routes: [
    {
      path:'/',
      name:'HomeContainer',
      component:HomeContainer,
      children:[
        {
          path:'',
          name:Home,
          component:Home
        },
        {
          path: '/room/:roomId',
          name: 'RoomDetail',
          component: RoomDetail
        },
        {
          path: '/rankingList',
          name: 'RankingList',
          component: RankingList
        },
        {
          path: '/danmu',
          name: 'Danmu',
          component: Danmu
        },
        {
          path: '/list/room',
          name: 'RoomList',
          component: RoomList
        },
      ]
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
    },
  ]
})
