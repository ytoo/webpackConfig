# VUE

## webpack
## Loaders（加载器）
- [webpack - Loaders](https://webpack.js.org/loaders/)
- [webpack - 管理资源示例](https://doc.webpack-china.org/guides/asset-management)

> webpack enables use of loaders to preprocess files. This allows you to bundle any static resource way beyond JavaScript. 

- webpack只能处理JavaScript资源
- webpack通过loaders处理非JavaScript静态资源


## CSS打包
- 1 CSS打包文件（加载）
- 2 SASS打包文件（编译为CSS）

### 使用webpack打包CSS
- 安装：`npm i -D style-loader css-loader`
- 注意：use中模块的顺序不能颠倒，加载顺序：从右向左加载

```js
/* index.js */

// 导入 css 文件
import './css/app.css'


/* webpack.config.js */

// 配置各种资源文件的loader加载器
module:{
  // 配置匹配规则
  rules:[
    // test 用来配置匹配文件规则（正则）
    // use  是一个数组，按照从后往前的顺序执行加载
    {test: /\.css$/, use: ['style-loader', 'css-loader']}, 
  ]
}
```

### 使用webpack打包sass文件
- 安装：`npm i -D sass-loader node-sass`
- 注意：`sass-loader` 依赖于 `node-sass` 模块

```js
/* webpack.config.js */

// 参考：https://webpack.js.org/loaders/sass-loader/#examples
// "style-loader"  ：creates style nodes from JS strings 创建style标签
// "css-loader"    ：translates CSS into CommonJS 将css转化为CommonJS代码
// "sass-loader"   ：compiles Sass to CSS 将Sass编译为css

module:{
  rules:[
    {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
  ]
}
```


## 图片和字体打包
- 安装：`npm i -D url-loader file-loader`
- `file-loader`：加载并重命名(使用md5进行加密处理，生成的名字是唯一的)文件（图片、字体 等）
- `url-loader`：将图片或字体转化为base64编码格式的字符串，嵌入到样式文件中

```js
/* webpack.config.js */

module:{
  rules:[
    // 打包 图片文件
    { test: /\.(jpg|png|gif|jpeg)$/, use: 'url-loader' },

    // 打包 字体文件
    { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader' }
  ]
}
```

### 图片打包注意点
- 1 默认将图片转为base64编码格式
- 2 `limit`参数的作用：
  + 限制图片的文件大小，单位为：字节(byte)
  + 文件重命名为哈希值，保证文件不会重复。例如：一张图片拷贝一个副本，这两个图片实际是同一个
- 3 规则：
  + 当图片文件大小（字节）`小于`指定的limit时，图片被转化为base64编码格式
  + 当图片文件大小（字节）`大于等于`指定的limit时，图片被重命名，不使用base64编码，此时，需要`file-loader`来加载图片

```js
/* webpack.config.js */

module: {
  rules: [
    // {test: /\.(jpg|png|gif|jpeg)$/, use: 'url-loader?limit=100'},
    {
      test: /\.(jpg|png|gif|jpeg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      ]
    }
  ]
}
```

### 字体文件打包说明
- 1 可以使用 `url-loader` 或者 `file-loader`
- 2 `url-loader` 会将字体文件解析为 base64编码格式的字符串，嵌入到CSS样式中
- 3 `file-loader` 以文件形式加载字体文件


## ES6语法 - class关键字
- ES6以前，JS是没有class概念的，而是通过构造函数+原型的方式来实现的
- 注意：ES6中的class仅仅是一个语法糖，并不是真正的类，与Java等服务端语言中的类是有区别的
- [ES6 - 文档](http://es6.ruanyifeng.com/#docs/class)

```js
class Person {
  // 静态属性
  static testName = '静态属性'
  static age = 20

  constructor() {
    // 实例属性
    this.isLoading = true
  }
}

console.log(Person.testName)
```

### 静态属性和实例属性
- 静态属性：直接通过类名就可以访问到，不需要创建类的实例就能访问
- 实例属性：必须先创建类的实例对象，然后，通过实例对象访问
- 说明：由于webpack不识别`static`关键字，需要借助于`babel-loader`来处理ES6语法

## 在webpack中配置babel-loader
- [babel全家桶](https://github.com/brunoyang/blog/issues/20)
- 安装：`npm i -D babel-core babel-loader babel-plugin-transform-runtime`
- 安装：`npm i -D babel-preset-es2015 babel-preset-stage-0`
- 安装：`npm i -S babel-runtime`
  + 注意：**stage-0 依赖于 es2015**
  + ES6 -> ES7 过程中要经历：4个阶段（0-3），并且 stage-* 的语法比ES6更新

### 基本使用（两步）
- 第一步：

```js
/* webpack.config.js */

module: {
  rules: [
    // exclude 排除，不需要编译的目录，提高编译速度
    {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}
  ]
}
```

- 第二步：在项目根目录中新建`.babelrc`配置文件

```json
/* .babelrc */

// 将来babel-loader运行的时候，会检查这个配置文件，并读取相关的语法和插件配置
{
  "presets": ["es2015", "stage-0"],
  "plugins": ["transform-runtime"]
}
```

## babel的说明

### babel-core
```
把 js 代码分析成 ast (抽象语法树, 是源代码的抽象语法结构的树状表现形式)，方便各个插件分析语法进行相应的处理。有些新语法在低版本 js 中是不存在的，如箭头函数，rest 参数，函数默认值等，这种语言层面的不兼容只能通过将代码转为 ast，再通过`语法转换器`分析其语法后转为低版本 js。

Bable AST： http://www.zcfy.cc/article/347
代码转AST：  https://astexplorer.net/
babel原理：  https://zhuanlan.zhihu.com/p/27289600
```

### babel-preset-*
> Babel通过语法转换器，能够支持最新版本的JavaScript语法  

- 作用：将浏览器无法识别的新语法转化为ES5代码
- [ES6语法提案的批准流程](http://es6.ruanyifeng.com/#docs/intro#语法提案的批准流程)
  + ES2015 也就是 ES6, 下一个要发布的ES7, 从 ES6 到 ES7之间经历了 5 个阶段
  + 一般进入到 stage 4 就可以认为是下一个版本的语法了!

```
Stage 0 - Strawman（展示阶段）
Stage 1 - Proposal（征求意见阶段）
Stage 2 - Draft（草案阶段）
Stage 3 - Candidate（候选人阶段）
Stage 4 - Finished（定案阶段）

Stage 0 is "i've got a crazy idea", 
stage 1 is "this idea might not be stupid", 
stage 2 is "let's use polyfills and transpilers to play with it", 
stage 3 is "let's let browsers implement it and see how it goes", 
stage 4 is "now it's javascript".
```

### babel-polyfill 和 transform-runtime
- 作用：实现浏览器对不支持API的兼容（兼容旧环境、填补）
- [polyfill](https://babeljs.io/docs/usage/polyfill/#usage-in-node-browserify-webpack)
- [transform-runtime](https://babeljs.io/docs/plugins/transform-runtime/)
- 命令：`npm i -S babel-polyfill`
- 命令：`npm i -D babel-plugin-transform-runtime` 和 `npm i -S babel-runtime`


```
区别：
polyfill 污染全局环境、支持实例方法
runtime  不污染全局环境、不支持实例方法

polyfill：如果想要支持全局对象（比如：`Promise`）、静态方法（比如：`Object.assign`）或者**实例方法**（比如：`String.prototype.padStart`）等，那么就需要使用`babel-polyfill`

babel-runtime ：提供了兼容旧环境的helper函数，使用的时候，需要我们自己手动引入
  比如：const Promise = require('babel-runtime/core-js/promise') 
  说明：
    1 手动引入太繁琐
    2 多个文件引入同一个helper（定义），造成代码重复，增加代码体积
    3 安装该插件即可
babel-plugin-transform-runtime：
    1 自动引入helper
    2 babel-runtime提供定义，使用的位置引入这个helper，避免重复
    3 babel-runtime包中的代码会被打包到你的代码中（-S）
    4 依赖于 babel-runtime 插件
```

```js
// 第一行引入
require("babel-polyfill")

var s = 'abc'.padStart(4)
console.log(s)

// webpack.config.js 配置
module.exports = {
  entry: ['babel-polyfill', './app/js']
}
```

### 总结:
```
babel-core 将新的JS语法解析为 抽象语法树(AST)

babel-preset-es2015 能够将 抽象语法树 转化为浏览器能够识别的语法
  注意: 只能处理新的语法( static / 箭头函数 ) , 但是对于一些新的JS API 无法处理

transform-runtime / babel-polyfill 提供浏览器不识别的全局对象或者新的API的兼容实现，以达到兼容浏览器的目的

// 判断浏览器是否兼容 padStart 这个 API
if (!String.prototype.padStart) {
  // 如果不兼容, 就自己模拟 padStart的功能实现一份
  String.prototype.padStart = function padStart(targetLength,padString) {
  }
}
```


## vue单文件组件
- [vue-loader](https://vue-loader.vuejs.org/zh-cn/)
- single-file components(单文件组件)
- 后缀名：`.vue`，该文件需要被预编译后才能在浏览器中使用
- 注意：单文件组件依赖于两个包 **vue-loader** / **vue-template-compiler**
- 安装：`npm i -D vue-loader vue-template-compiler`

```html
<!-- App.vue 示例代码： -->
<template>
  <div>
    <h1>VUE 单文件组件示例 -- App.vue</h1>
    <p>这是 模板内容</p>
  </div>
</template>

<script>
  // 组件中的逻辑代码
  export default {}
</script>

<style>
/* 组件样式 */
h1 {
  color: red;
}
</style>
```

```js
// webpack.config.js 配置：
module: {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    }
  ]
}
```

### 使用单文件组件
```js
import Vue from 'vue'
// 导入 App 组件
import App from './App.vue'

const vm = new Vue({
  el: '#app',
  // 通过 render 方法，渲染App组件
  render: c => c(App)
})
```

### 单文件组件+路由
- [vue - Vue.use](https://cn.vuejs.org/v2/api/#Vue-use)

```js
import Vue from 'vue'
import App from './App.vue'

// ------------- vue路由配置 开始 --------------
import Home from './components/home/Home.vue'
import Login from './components/login/Login.vue'

// 1 导入 路由模块
import VueRouter from 'vue-router'
// 2 调用use方法使用插件
Vue.use(VueRouter)
// 3 创建路由对象
const router = new VueRouter({
  routes: [
    { path: '/home', component: Home },
    { path: '/login', component: Login }
  ]
})

// ------------- vue路由配置 结束 --------------

const vm = new Vue({
  el: '#app',
  render: c => c(App),
  // 4 挂载到 vue 实例中
  router
})
```

## Mint-UI
- 基于 Vue.js 的移动端组件库
- [Mint-UI](http://mint-ui.github.io/#!/zh-cn)

### 快速开始
- 安装：`npm i -S mint-ui`

```js
// 1 导入 mint-ui模块
import MintUI from 'mint-ui'
// 2 导入 样式
import 'mint-ui/lib/style.css'
// 3 注册插件
Vue.use(MintUI)
```

## MUI
- [MUI](http://dev.dcloud.net.cn/mui/)
- 使用：从github下载包，找到dist文件夹，只需要导入样式即可

```js
// 导入样式
import './lib/mui/css/mui.min.css'
```

## ElementUI
- 安装：`npm i -S element-ui`
- [饿了吗 - ElementUI](http://element.eleme.io/#/zh-CN/component/quickstart)

```js
{
  "presets": [
    ["es2015", { "modules": false }], "stage-0"
  ],

  "plugins": [
    ["component", [
      {
        "libraryName": "mint-ui",
        "style": true
      },
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-default"
      }
    ]]
  ]
}
```

## 代码托管 - oschina
- [码云](https://gitee.com/)
- 说明：使用方式跟github完全相同，并且是中文版（非常友好！！！）


## ES6模块化 - import和export
```js
// a.js
// export default 只能出现一次
const num = 123
export default num

// main.js
// 可以自定义接收名称
// import num from './a'
import num1 from './a'
```

```js
// a.js
export const str = 'abc'

// main.js
// 注意 导入名称 必须与 导出名称 相同
// 注意 必须使用花括号
import { str } from './a'
```

