import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/menu.vue'
import Clientes from '../views/clientes.vue'
import Inventario from '../views/inventario.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: Clientes
  },
  {
    path: '/inventario',
    name: 'Inventario',
    component: Inventario
  }
]

const router = new VueRouter({
  routes
})

export default router
