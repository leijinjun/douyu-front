import Vue from 'vue'
import Router from 'vue-router'
import RoomList from '@/components/roomList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RoomList',
      component: RoomList
    }
  ]
})
