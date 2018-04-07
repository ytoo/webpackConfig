# Vue

## 路由
- 路由即：浏览器中的哈希值（# hash）与展示视图内容（template）之间的对应规则
- vue中的路由是：hash 和 component的对应关系

```
在 Web app 中，通过一个页面来展示和管理整个应用的功能。
SPA往往是功能复杂的应用，为了有效管理所有视图内容，前端路由 应运而生！
简单来说，路由就是一套映射规则（一对一的对应规则），由开发人员制定规则。
当URL中的哈希值（# hash）发生改变后，路由会根据制定好的规则，展示对应的视图内容
```

### 基本使用
- 安装：`npm i -S vue-router`

```html
<div id="app">
  <!-- 5 链接导航 -->
  <router-link to="/home">首页</router-link>
  <router-link to="/login">登录</router-link>

  <!-- 6 路由出口：用来展示匹配路由视图内容 -->
  <router-view></router-view>
</div>

<!-- 1 导入 vue.js -->
<script src="./vue.js"></script>
<!-- 2 导入 路由文件 -->
<script src="./node_modules/vue-router/dist/vue-router.js"></script>
<script>
  // 3 创建两个组件
  const Home = Vue.component('home', {
    template: '<h1>这是 Home 组件</h1>'
  })
  const Login = Vue.component('login', {
    template: '<h1>这是 Login 组件</h1>'
  })

  // 4 创建路由对象
  const router = new VueRouter({
    routes: [
      { path: '/home', component: Home },
      { path: '/login', component: Login }
    ]
  })

  var vm = new Vue({
    el: '#app',
    router
  })
</script>
```

### 重定向
- 解释：将 `/` 重定向到 `/home`

```js
{ path: '/', redirect: '/home' }
```

### 路由导航高亮
- 说明：当前匹配的导航链接，会自动添加`router-link-exact-active router-link-active`类

### 路由参数
- 说明：我们经常需要把某种模式匹配到的所有路由，全都映射到同一个组件，此时，可以通过路由参数来处理
- 语法：`/user/:id`
- 使用：当匹配到一个路由时，参数值会被设置到 this.$route.params
- 其他：可以通过 `$route.query` 获取到 URL 中的查询参数 等

```js
// 链接：
<router-link to="/user/1001">用户 Jack</router-link>
<router-link to="/user/1002">用户 Rose</router-link>

// 路由：
{ path: '/user/:id', component: User }

// User组件：
const User = {
  template: `<div>User {{ $route.params.id }}</div>`
}
```

### 嵌套路由 - 子路由
- Vue路由是可以嵌套的，即：路由中又包含子路由
- 规则：父组件中包含 `router-view`，在路由规则中使用 `children` 配置

```js
// 父组件：
const User = Vue.component('user', {
  template: `
    <div class="user">
      <h2>User Center</h2>
      <router-link to="/user/profile">个人资料</router-link>
      <router-link to="/user/posts">岗位</router-link>
      <!-- 子路由展示在此处 -->
      <router-view></router-view>
    </div>
    `
})

// 子组件：
const UserProfile = {
  template: '<h3>个人资料：张三</h3>'
}
const UserPosts = {
  template: '<h3>岗位：FE</h3>'
}

{ path: '/user', component: User,
  // 子路由配置：
  children: [
    {
      // 当 /user/profile 匹配成功，
      // UserProfile 会被渲染在 User 的 <router-view> 中
      path: 'profile',
      component: UserProfile
    },
    {
      // 当 /user/posts 匹配成功
      // UserPosts 会被渲染在 User 的 <router-view> 中
      path: 'posts',
      component: UserPosts
    }
  ]
}
```


