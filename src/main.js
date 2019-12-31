import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import Avatar from './components/Avatar.vue'
import Experiment from './components/Experiment.vue'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'

// 阻止启动生产消息
Vue.config.productionTip = false

Vue.use(Element)
Vue.prototype.$axios = axios

// 注册全局组件的行为需发生在Vue实例被创建前，否则无法成功注册全局组件
Vue.component(Avatar.name, Avatar)
Vue.component(Experiment.name, Experiment)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
