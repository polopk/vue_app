import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(axios);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
