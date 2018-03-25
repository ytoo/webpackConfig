// 1 导入 vue
import Vue from 'vue'

// 2 导入组件
import Home from '../components/Home.vue'
import About from '../components/About.vue'

// 3 导入 路由
import VueRouter from 'vue-router'

// 使用 vue 插件
Vue.use(VueRouter)

// 4 创建 路由的实例
const router = new VueRouter({
  routes: [
    // { path: '/', component: App },
    { path: '/home', component: Home },
    { path: '/about', component: About },
  ]
})

import App from '../App.vue'

// 5 挂载到vue实例中
const vm = new Vue({
  el: '#app',
  render: c => c(App),

  // 将路由挂载到vue实例中
  router
})
