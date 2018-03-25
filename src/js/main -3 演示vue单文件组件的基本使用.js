// 1 导入 vue
import Vue from 'vue'

// 2 导入 组件
import App from '../App.vue'

// 3 创建Vue实例，渲染组件
const vm = new Vue({
  el: '#app',
  render: c => c(App)
  // 表示将 App.vue组件，渲染到index.html页面中
  // render: function(createElement) {
  //   return createElement(App)
  // }

  // render: createElement => {
  //   return createElement(App)
  // }

  // render: createElement => createElement(App)

  // render: c => c(App)
})