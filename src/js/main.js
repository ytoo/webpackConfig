import Vue from 'vue'

// 导入 mint-ui
import MintUI from 'mint-ui'
// 导入样式
import 'mint-ui/lib/style.css'
import "../css/index.css"
// import "../css/index.scss"

// 2 导入组件
// 引入路由方式一：
// import Home from '../components/Home.vue'
// import About from '../components/About.vue'
// 引入路由方式二（可以实现路由按需加载）:
const Home = () => import(/* webpackChunkName: "home" */ '../components/Home.vue')
const About = () => import(/* webpackChunkName: "about" */ '../components/About.vue')

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
// 导入 App.vue
import App from '../App.vue'
// 安装插件
Vue.use(MintUI)

const vm = new Vue({
  el: '#app',
  render: c => c(App),
  // 将路由挂载到vue实例中
  router
})
