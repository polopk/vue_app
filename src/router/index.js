import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/menu.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('../views/login.vue'),
  //   meta:{
  //     requiereAut:true
  //   }
  // },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  }
]

const router = new VueRouter({
  routes
})

export default router
