import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home'
import Power from '@/components/power'
import Mymusic from '@/components/mymusic'
import SearchList from '@/components/searchList'
import Personal from '@/components/personal'
import Comprehensive from '@/components/comprehensive'
import Login from '@/components/login'
import PlayList from '@/components/PlayList'
import Player from '@/components/player'
import Reco from '@/components/reco'
import Songs from '@/components/songs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mymusic',
      component: Mymusic
    }, {
      path: '/power',
      name: 'power',
      component: Power
    },
    , {
      path: '/mymusic',
      name: 'mymusic',
      component: Mymusic
    },
    {
      path: '/searchList',
      name: 'searchList',
      component: SearchList
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal
    },
    {
      path: '/comprehensive',
      name: 'comprehensive',
      component: Comprehensive
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/playlist',
      name: 'playList',
      component: PlayList
    },
    {
      path: '/player',
      name: 'player',
      component: Player
    },
    {
      path: '/reco',
      name: 'reco',
      component: Reco,
      beforeEnter: (to, from, next) => {
        const tokenStr = window.sessionStorage.getItem('token')
        if (to.path == '/personal') next()
        if (!tokenStr) return next('/personal')
        next()
      }
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
  ]
})
//挂载路由导航守卫



