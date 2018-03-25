import Vue from 'vue'

// 导入 mint-ui
import MintUI from 'mint-ui'
// 导入样式
import 'mint-ui/lib/style.css'
// 导入 App.vue
import App from '../App.vue'
// 安装插件
Vue.use(MintUI)

const vm = new Vue({
  el: '#app',
  render: c => c(App)
})