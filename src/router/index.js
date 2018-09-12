import Vue from 'vue'
import Router from 'vue-router'
import RoomList from '@/components/room_list'
import RoomDetail from '@/components/room_detail'
import DanmuList from '@/components/danmu_list'
Vue.use(Router)

export default new Router({
	mode: 'history',
	base:"/front",
  routes: [
    {
      path: '/room',
      name: 'RoomList',
      component: RoomList
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
    }
  ]
})
