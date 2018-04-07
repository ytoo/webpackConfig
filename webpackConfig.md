## 安装webpack
- 全局安装：`npm i -g webpack`
  + 目的：在任何目录中通过CLI使用 `webpack` 这个命令
- 项目安装：`npm i -D webpack`
  + 目的：执行当前项目的构建

## webpack的基本使用
- 安装：`npm i -D webpack`
- webpack的使用方式：配置文件（`webpack.config.js`）
- 四个核心概念：**入口(entry)**、**输出(output)**、**加载器loader**、**插件(plugins)**

### 配置文件方式（推荐）

```js
/* 
  webpack.config.js
  运行命令：webpack  （需要配置webpack.config.js文件中的module.exports中的entry和output）
  entry 入口的配置说明：
  https://doc.webpack-china.org/concepts/entry-points
*/
var path = require('path')
module.exports = {
  // 入口文件
  entry: path.join(__dirname, 'src/js/main.js'), 
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
- 使用方式：`npm run dev`
- 注意：**配置到目前这一步，只能启动默认端口8080的本地服务，需要手动在地址栏输入地址才能访问页面，这就需要继续配置`package.json`文件中的`scripts`项来自动开启服务器、自动编译、监视文件变化、自动打开页面，并实现热更新**

```json
"scripts": {
  "dev": "webpack-dev-server"
}
```

### 优势
- 1 开启服务器
- 2 监视文件的变化，重新编译打包，自动刷新浏览器
- 3 将输出的文件存储在内存（注意：这是存储的位置是内存，不是在硬盘中的文件里面）中，提高编译和加载速度，效率更高

- 注意：开启服务自动打开页面时，webpack输出的文件被放到项目根目录中
  + `webpack output is served from /`
  + 在`index.html`页面中需要通过 `/bundle.js` 来引入文件，因为这是存储的位置是当前目录下的内存，不是硬盘中的当前文件的里面

### `package.json` 中 `scripts`配置说明 - CLI配置
- `--contentBase` ：主页面目录
  + `--contentBase ./`：当前工作目录
  + `--contentBase ./src`：webpack-dev-server 启动的服务器，我们在浏览器中打开的时候会自动展示 ./src 中的 index.html 文件
- `--open` ：自动打开浏览器
- `--port` ：端口号
- `--hot` ：热更新，只加载修改的文件(按需加载修改的内容)，而非全部加载（更新加载时不用刷新浏览器）
- 使用方式：`npm run dev`

```js
/* package.json */
{
  "scripts": {
    "dev": "webpack-dev-server --contentBase ./src --open --port 8888 --hot"
  }
}
```

- 注意：**以上index.html中的bundle.js是需要手动引入的，即<script type="text/javascript" src="/bundle.js"></script>,但是我们可以使用`html-webpack-plugin`插件让`bundle.js`、`css`等文件自动被引入**


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
    // 在根目录内存中生成页面名字，名字可自定义，但一般默认为index.html
    filename: 'index.html'
  })
]
```

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
import './css/index.css'
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
- [整理 node-sass 安装失败的原因及解决办法](https://segmentfault.com/a/1190000010984731)

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
  entry: ['babel-polyfill',  path.join(__dirname, './src/js/main.js')]
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
