## vue-cli
- cli 脚手架工具（通过命令行的方式，快速搭建一个项目的目录结构）
- 全局安装：`npm install -g vue-cli`
- 基本使用：`vue init webpack 项目名称`
- [vue-cli github](https://github.com/vuejs/vue-cli)
- [vue-cli 目录结构](https://segmentfault.com/a/1190000007880723)
- [vue-cli 介绍](https://juejin.im/post/584e48b2ac502e006c74a120)

```
开发期间运行项目：npm run dev
项目打包： npm run build
```


## Webpack 发布项目
- [webpack 打包的各种坑](https://dailc.github.io/2017/03/13/webpackfreshmanualAndBug.html)

### 项目发布
- 开发期间，为了提高工作效率和编译速度，我们使用`webpack-dev-server`插件来辅助开发
- 项目发布：剔除开发期间用到的开发工具，模块化分析和打包项目代码

### 创建项目发布配置文件
- 开发期间配置文件：`webpack.config.js`
- 项目发布配置文件：`webpack.prod.js` （文件名称非固定）
- 命令：`webpack --config webpack.prod.js` 指定配置文件名称运行webpack
- 参数：` --display-error-details` 用于显示webpack打包的错误信息

```json
/* package.json */

"scripts": {
  "prod": "webpack --config webpack.prod.js"
}
```

### 初次打包的问题
- 1 js、html 没有压缩
- 2 所有的文件都放到了同一个目录中
- 3 没有css文件（实际包含在了：bundle.js 中）

### 项目上线处理方式
- 1 删除：`webapck-dev-server` 配置 以及 deltools 配置
- 2 处理文件路径（包括：图片、css、js）
- 3 处理`url-loader`参数
- 4 自动删除`dist`目录
- 5 分离第三方包
- 6 。。。

### 处理图片路径
- 注意：如果`limit`小于比图片大，那么图片将被转化为`base64`编码格式
- [name参数介绍](https://github.com/webpack-contrib/file-loader)

```js
// 处理URL路径的loader

{
  test: /\.(jpg|png|gif|bmp|jpeg)$/, 
  use: {
    loader: 'url-loader',
    options: {
      limit: 8192,
      // name参数：重命名文件以及修改文件路径
      name: 'images/imgs-[hash:7].[ext]'
    }
  }
},
```

### 自动删除dist目录
- 安装：`npm i -D clean-webpack-plugin`

```js
/* webpack.prod.js */
const cleanWebpackPlugin = require('clean-webpack-plugin')

plugins: [
  // 创建一个删除文件夹的插件，删除dist目录
  new cleanWebpackPlugin(['dist'])
]
```

### 分离第三方包
- 目的：将公共的第三方包，抽离为一个单独的包文件，这样防止重复打包！
  + 例如：3个页面中都引入了jQuery，不分离的话，会被打包3次

```js
/* webpack.prod.js */

// 入口 -- 打包文件的入口
entry: {
  // 项目代码入口
  app: path.join(__dirname, './src/js/main.js'),
  // 第三方包入口
  vendor: ['vue', 'vue-router', 'vue-resource']
},

output: {
  // 修改输出文件的名称
  filename: 'js/[name].[chunkhash].js',
},

plugins: [
  // 分离第三方包（公共包文件）
  new webpack.optimize.CommonsChunkPlugin({
    // 第三方包入口名称，对应 entry 中的 vendor 属性
    // 将 entry 中指定的 ['vue', 'vue-router', 'vue-resource'] 打包到名为 vendor 的js文件中
    name: 'vendor',
  }),
]
```

### 压缩混淆JS
```js
plugins: [
  // 优化代码
  // https://github.com/webpack-contrib/uglifyjs-webpack-plugin/tree/v0.4.6
  new webpack.optimize.UglifyJsPlugin({
    // 压缩
    compress: {
      // 移除警告
      warnings: false
    }
  }),

  // 指定环境，设置为生产环境
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
]
```

### 抽取和压缩CSS文件
- 安装：抽离 `npm i -D extract-text-webpack-plugin`
- 安装：压缩 `npm i -D optimize-css-assets-webpack-plugin`
- [webpack 抽离CSS文档](https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/)
- [压缩抽离后的CSS](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)

```js
// 分离 css 到独立的文件中
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 压缩 css 资源文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// bug描述: 生成后面的css文件中图片路径错误，打开页面找不到图片
// 解决：google搜索 webpack css loader 样式图片路径
output: {
  // ...

  // https://doc.webpack-china.org/configuration/output/#output-publicpath
  // 设置公共路径
  publicPath: '/',
},

module: {
  rules: [
    {
      test: /\.css$/, 
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    },
    {
      test: /\.scss$/, 
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ['css-loader', 'sass-loader']
      })
    },
  ]
},
plugins: [
  // 通过插件抽离 css (参数)
  new ExtractTextPlugin("css/style.css"),
  // 抽离css 的辅助压缩插件
  new OptimizeCssAssetsPlugin()
]
```

### 压缩HTML页面
- 详细的配置可以参考[html-minifier](https://github.com/kangax/html-minifier#options-quick-reference)

```js
new htmlWebpackPlugin({
  // 模板页面
  template: path.join(__dirname, './index.html'),
  // 在内容中生成页面名称
  filename: 'index.html',

  // 压缩HTML
  minify: {
    // 移除空白
    collapseWhitespace: true,
    // 移除注释
    removeComments: true,
    // 移除属性中的双引号
    removeAttributeQuotes: true
  }
}),
```

------

## source map
- [参考文档](https://doc.webpack-china.org/configuration/devtool#devtool)
- 作用：有利于代码调试，能够准确定位错误发生的位置

```js
// 在 webpack.config.js 中添加以下配置项：
devtool: 'inline-source-map',

// ------------------------------------

// 1 注意：在生产环境中使用以下配置（体积更小）
devtool: 'cheap-module-source-map',

// 2 注意：如果启用了js压缩功能，需要添加 sourceMap: true
plugins: [
  // 压缩js
  new webpack.optimize.UglifyJsPlugin({
    // 启用 source map，需要将 sourceMap属性 设置为true
    sourceMap: true
  }),
]
```

## Tree-Shaking
- [Tree Shaking](https://doc.webpack-china.org/guides/tree-shaking/)
- tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)
- 注意：**只对ES2015的模块语法有效，如果使用了babel，需要关闭babel的模块转换功能**
- 说明：`webpack`会自动标识没有引用的代码，通过`uglifyjs`来移除这部分代码
- [webpack.optimize.UglifyJsPlugin == uglifyjs-webpack-plugin/](https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin/)

```js
// .babelrc
// 关闭 modules 解析功能
"presets": [ ["es2015", { "modules": false } ] ]
```

### 使用
- 1 关闭 babel 的模块处理功能（modules: false）
- 2 通过 uglifyjs 移除被webpack标记为没有被使用的代码
  + 参考上面讲的压缩js配置

## webpack 3 - Scope Hoisting （性能优化）
- 作用：让 Webpack 打包出来的代码文件更小、运行的更快
- 说明：只支持`ES2015`模块写法，不支持`CommonJS`模块使用
- 命令：`webpack --display-optimization-bailout`
  + 参数：打印出项目无法使用 Scope Hoisting 的原因
- 注意：使用这个插件的时候，模块热替换将不起作用，所以最好只在代码优化的时候才使用这个插件
- [webpack 3 新特性](https://juejin.im/entry/59704d47f265da6c4977ba6a)

```js
/*
  webpack.config.js
  使用方式：在配置文件中添加一个新的插件 webpack.optimize.ModuleConcatenationPlugin
*/

module.exports = {
  plugins: [
    // scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
```

## vue配合webpack实现路由按需加载
- [Vue- 路由懒加载](https://router.vuejs.org/zh-cn/advanced/lazy-loading.html)
- [Vue 异步组件](https://cn.vuejs.org/v2/guide/components.html#异步组件)
- [VUE2 组件懒加载浅析](http://www.cnblogs.com/zhanyishu/p/6587571.html)
- [Vue.js路由懒加载[译]](http://www.jianshu.com/p/abb02075b56b)

### 使用步骤
- 1 修改组件的引用方式

```js
// 方式一: require.ensure()
const NewsList = r => require.ensure([], () => r(require('../components/news/newslist.vue')), 'news')
// const NewsInfo = r => require.ensure([], () => r(require('../components/news/newsinfo.vue')), 'news')

// 方式二: import()
const NewsInfo = () => import(/* webpackChunkName: "newsinfo" */ '../components/news/newsinfo.vue')
```

- 2 修改 webpack 配置文件的output

```js
output: {
  path: path.join(__dirname, './dist'),
  filename: 'js/[name].[chunkhash].js',
  
	// ------添加 chunkFilename, 指定输出js文件的名称------
  chunkFilename: 'js/[name].[chunkhash].js',
},
```