// 这个配置文件中，不支持 ES6的模块化语法（import / export）
// 只支持module.exports/require  即commonJs的 模块化语法
const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口
  // entry: path.join(__dirname, './src/js/main.js'),

  // 使用 babel-polyfill 实现浏览器兼容新的API
  entry: ['babel-polyfill', path.join(__dirname, './src/js/main.js')],

  // 出口
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },

  // 配置 webpack-dev-server
  devServer: {
    contentBase: path.join(__dirname, './src'),
    open: true,
    port: 8888,
    // 热更新 与package.json里面的"dev2"结合使用的方法是3.2.1
    // 设置hot:true以后与下面的plugins里面的new webpack.HotModuleReplacementPlugin()结合使用的方法是3.2.2
    hot: true
  },

  // 处理非JS的静态资源：比如 css、字体、图片
  module: {
    rules: [
      // 注意：use中使用的loader顺序不能颠倒！！！
      // 注意：loader中的执行顺序，从右往左
      // 首先， 由 css-loader 读取css文件，并生成JS代码（这个文件被打包到bundle.js中，作为一个独立的模块）
      // 然后，style-loader将js模块化的代码，创建style标签，插入到页面中
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // 处理 sass 文件
      { test: /\.(scss|sass)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      // 处理 图片
      // 默认情况下，url-loader会将图片解析为base64格式的字符串
      // { test: /\.(jpg|png|jpeg|bmp|gif)$/, use: 'url-loader' }

      // 可以通过 limit 参数来限制图片的大小
      // 如果图片的大小比limit的值大，此时，图片不会被解析为base64编码的字符串，而是作为url路径。
      // 此时，这张图片会被通过MD5计算出一个唯一的值出来，这个值就被当作当前图片的名称，所以，最终在页面中引入的时候，我们发现，引入图片的名称被修改了
      // 目的：为了防止重复引入同一张图片，而浪费资源
      // 如果图片的大小比limit的值小，此时，图片会被解析为base64嵌套在页面中

      {
        test: /\.(jpg|png|jpeg|bmp|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      },

      // 处理 字体文件
      // 使用 file-loader 加载 字体文件
      // { test: /\.(woff|woff2|eot|ttf|otf|svg)$/, use: 'file-loader' }
      // 注意：此时，字体文件被解析为 base64编码
      { test: /\.(woff|woff2|eot|ttf|otf|svg)$/, use: 'url-loader' },

      // 处理 js（ES6）
      // exclude 排除 node_modules中的js代码，提高babel转化的性能，
      // 并且在config.js同目录下创建一个.babelrc文件，在里面配置presets和plugins
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },

      // 解析 .vue 单文件组件
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  },

  plugins: [
    // 热更新 ,这里用到webpack，所以需要导入wenpack包
    new webpack.HotModuleReplacementPlugin(),

    // 使用 html-webpack-plugin 插件，在根目录内存中生成一个filename: 'index.html'(即这个不是我们自己创建的那个index.html),
    // 并且这个内存中的index.html是最终要展示在页面中的文件
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html'
    })
  ]
}