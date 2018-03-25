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


## Webpack
![webpack](./images/webpack-1.png)
- [webpack 官网](http://webpack.github.io/)
- bundle `[ˈbʌndl]` 捆绑，收集，归拢，把…塞入

### 概述
> webpack 是一个现代 JavaScript 应用程序的模块打包器(module bundler)  
> webpack 是一个**模块化方案（预编译）**  
> webpack获取具有依赖关系的模块，并生成表示这些模块的静态资源  

- 四个核心概念：**入口(entry)**、**输出(output)**、**加载器loader**、**插件(plugins)**

```
模块化方案: webpack 和 requirejs

webpack 预编译 (在开发阶段通过webpack进行模块化处理, 最终项目上线, 就不在依赖于 webpack)
requirejs 线上的编译( 代码运行是需要依赖与 requirejs 的 )
```

### webpack起源
- webpack解决了现存模块打包器的两个痛点：
  + 1 **Code Spliting** - 代码分离
  + 2 **静态资源的模块化处理方案**

### webpack 的目标
- 1 分离依赖树到chunks（块，文件），实现按需加载
- 2 保证初始化加载时间更短
- 3 每一个静态资源能够被当作一个模块处理
- 4 能够整合第三方包使其成为模块
- 5 能够定制模块打包的每一部分（环节）
- 6 适合大型项目

### webpack与模块
- [前端模块系统的演进](http://zhaoda.net/webpack-handbook/module-system.html)
- 在webpack看来：所有的**静态资源都是模块**
- webpack 模块能够识别以下等形式的模块之间的依赖：

- JS的模块化规范：
  + ES2015 `import` `export`
  + CommonJS `require()` `module.exports`
  + AMD `define` 和 `require` 

- 非JS等静态资源：
  + css/sass/less 文件中的 `@import` 
  + 图片连接，比如：样式 `url(...)` 或 HTML `<img src=...>`
  + 字体 等

### webpack能做什么
- 1 模块化
- 2 将`ES6`、`TypeScript`、`CoffeeScript`等浏览器无法识别的语言转化为`ES5`
- 3 将`SCSS`、`LESS`等预编译器创建的CSS转化为浏览器识别的CSS
- 4 进行文件压缩、合并、拷贝
- 5 启动服务器，实现页面实时刷新，热加载
- 6 项目上线，通过配置生成项目目录，优化代码提升性能

### webpack文档和资源
- [webpack 中文网](https://doc.webpack-china.org/)
- [webpack 1.0](http://webpack.github.io/docs/what-is-webpack.html)
- [webpack 2.x+](https://webpack.js.org/)
- [入门Webpack，看这篇就够了](http://www.jianshu.com/p/42e11515c10f#)

---

## 安装webpack
- 全局安装：`npm i -g webpack`
  + 目的：在任何目录中通过CLI使用 `webpack` 这个命令
- 项目安装：`npm i -D webpack`
  + 目的：执行当前项目的构建

## webpack的基本使用
- 安装：`npm i -D webpack`
- webpack的两种使用方式：1 命令行 2 配置文件（`webpack.config.js`）

### 命令行方式演示(启动方式一) - 案例：隔行变色
- 1 使用`npm init -y` 初始package.json，使用npm来管理项目中的包
- 2 新建`index.html`和`index.js`，实现隔行变色功能
- 3 运行`webpack src/js/index.js dist/bundle.js`进行打包构建，语法是：`webpack 入口文件 输出文件`(注意：在这里不能有webpack.config.js配置文件，否则会先走这里的配置的代码，会报错。webpack.config.js设置以后，需要使用后面配置以后的语法执行，即npm run dev)
- 4 注意：需要在页面中引入 输出文件 的路径（此步骤可通过配置html-webpack-plugins去掉）

```js
/*
  src/js/index.js
*/

// 1 导入 jQuery
import $ from 'jquery'
// 2 获取页面中的li元素
const $lis = $('#ulList').find('li')
// 3 隔行变色
// jQuery中的 filter() 方法用来过滤jquery对象
$lis.filter(':odd').css('background-color', '#def')
$lis.filter(':even').css('background-color', 'skyblue')
```

### 配置文件方式（推荐）

```js
/* 
  webpack.config.js

  运行命令：webpack  （启动方式二,需要配置webpack.config.js文件中的module.exports中的entry和output）

  entry 入口的配置说明：
  https://doc.webpack-china.org/concepts/entry-points
*/

var path = require('path')
module.exports = {
  // 入口文件
  entry: path.join(__dirname, 'src/js/index.js'), 

  // 输出文件
  output: {
    path: path.join(__dirname, 'dist'), // 输出文件的路径,输出在硬盘的指定的文件夹中
    filename: 'bundle.js' // 输出文件的名称
  }
}
```

## webpack-dev-server
- 安装：`npm i -D webpack-dev-server`
- 作用：配合webpack，创建开发环境（服务器、自动编译、监视文件变化等），提高开发效率
- 注意：无法直接在终端中执行 `webpack-dev-server`，需要通过 `package.json` 的 `scripts` 实现，或者需要配置config.js中的module.exports中的devServer项
- 使用方式：`npm run dev`（启动方式三）

```json
"scripts": {
  "dev": "webpack-dev-server"
}
```
## 上述三种启动方式的区别
```
  - 启动方式一（1），只需要使用"webpack 入口文件 输出文件"的命令，就可以在需要的目录里面生成dist文件下的bundle.js文件，但是这里需要注意，此时不要生成webpack.config.js文件，否则会报错
  - 启动方式二（2），生成配置文件webpack.config.js，在里面配置生成文件的地址，再使用命令行工具webpack可以直接生成在dist文件下的bundle.js文件
  - 启动方式三(又分两个实现的路径方法，3.1和3.2，并且3.2的实现又可以分两种路径方法,3.2.1和3.2.2)，(需要从服务器打开localhost:8080)利用webpack-dev-server结合webpack，开启服务器、自动编译、监视文件变化，但是需要在"package.json"的"scripts"里面设置"dev":"webpack-dev-server"，这样使用npm run dev命令行的时候，可以在当前根目录下的内存生成bundle.js文件（不是像前两种方法那样，在目录下的文件中生成bundle.js），注意此时在index.html中引入文件时需要用"/bundle.js"就可以了。并且还可以接着配置"dev": "webpack-dev-server --contentBase ./src --open --port 8888 --hot"（方法3.1）。此外还可以通过在json文件里设置"dev":"webpack-dev-server"，在config.js中的devServer里面设置contentBase、open、port、hot(hot:true时再在plugins中设置new webpack.HotModuleReplacementPlugin()才能实现热更新，或者要不直接就把hot设置在scripts中的dev中，这样就不用设置hot:true和plugins中的热更新模块了)等来实现在"dev"全部设置齐全的功能


```

### 优势
- 1 开启服务器
- 2 监视文件的变化，重新编译打包，自动刷新浏览器
- 3 将输出的文件存储在内存（注意：这是存储的位置是内存，不是在硬盘中的文件里面）中，提高编译和加载速度，效率更高

- 注意：开启服务自动打开页面时，webpack输出的文件被放到项目根目录中
  + `webpack output is served from /`
  + 在`index.html`页面中需要通过 `/bundle.js` 来引入文件，因为这是存储的位置是当前目录下的内存，不是硬盘中的当前文件的里面

### 配置说明 - CLI配置
- `--contentBase` ：主页面目录
  + `--contentBase ./`：当前工作目录
  + `--contentBase ./src`：webpack-dev-server 启动的服务器，我们在浏览器中打开的时候会自动展示 ./src 中的 index.html 文件
- `--open` ：自动打开浏览器
- `--port` ：端口号
- `--hot` ：热更新，只加载修改的文件(按需加载修改的内容)，而非全部加载（更新加载时不用刷新浏览器）

```js
/* package.json */
/* 运行命令：npm run dev */

{
  "scripts": {
    "dev": "webpack-dev-server --contentBase ./src --open --port 8888 --hot"
  }
}
```

### 配置说明 - webpack.config.js
- [/undefined bug](https://stackoverflow.com/questions/44924263/webpack-dev-server-opens-localhost8080-undefined)

```js
const webpack = require('webpack')

devServer: {
  // 服务器的根目录 Tell the server where to serve content from
  // https://webpack.js.org/configuration/dev-server/#devserver-contentbase
  contentBase: path.join(__dirname, './'),
  // 自动打开浏览器
  open: true,
  // 端口号
  port: 8888,

  // ---------------  热更新 -----------------
  hot: true, // 结合plugins中的启动热更新
  // 解决打开页面出现 /undefined bug
  //openPage: ''
},

plugins: [
  // ----------------  启用热更新插件 ----------------
  new webpack.HotModuleReplacementPlugin()
]
```

## html-webpack-plugin 插件
- 安装：`npm i -D html-webpack-plugin`
- 作用：根据模板，自动生成html页面
- 优势：页面存储在内存中，自动引入`bundle.js`、`css`等文件

```js
/* webpack.config.js */
const htmlWebpackPlugin = require('html-webpack-plugin')

// ...
plugins: [
  new htmlWebpackPlugin({
    // 模板页面路径
    template: path.join(__dirname, './index.html'),
    // 在内存中生成页面路径，默认值为：index.html???? 是在config.js的根目录下生成的还是在src下面生成的???
    filename: 'index.html'
  })
]

// 敲下npm run dev的时候，自动打开的index.html是在内存中的还是在src中的？？？

```