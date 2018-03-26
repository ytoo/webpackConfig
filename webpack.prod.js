const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

// 每次打包之前，自动删除文件夹
const cleanWebpackPlugin = require('clean-webpack-plugin')

// 分离 css 到独立的文件中
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 压缩 css 资源文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  // 入口
  entry: {
    // 项目代码入口
    app: path.join(__dirname, './src/js/main.js'),
    // 第三方包入口
    vendor: ['vue', 'vue-router', 'vue-resource', 'vuex', 'moment', 'mint-ui', 'vue-preview']
  },
  // 出口
  output: {
    path: path.join(__dirname, './dist'),
    // 设置公共路径
    publicPath: '/',
    // 此处的name由 entry 中的属性名决定
    // chunk 表示一个代码块（webpack模块化分析代码后的结构）
    filename: 'js/[name].[chunkhash].js',
    // ------添加 chunkFilename, 指定输出js文件的名称------
    chunkFilename: 'js/[name].[chunkhash].js',
  },

  // 配置loader，处理不同的静态资源
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        // 抽离和压缩css
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(sass|scss)$/,
        // 抽离和压缩 scss
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|bmp|webp)$/, use: {
          loader: 'url-loader',
          options: {
            limit: 6518,
            // name: 'images/imgs-[hash:7].[ext]'
            // [name] 使用图片的名称作为最终生成的文件名称
            // [ext]  使用图片的默认后缀
            // name: '[name].[ext]'
            // images/ 表示图片生成后存放的路径
            name: 'images/[hash:10].[ext]'
          }
        }
      },
      {
        // 参考上面图片的配置，进行配置即可
        test: /\.(ttf|woff|woff2|svg|eot)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: 'fonts/[hash:10].[ext]'
          }
        }
      },
      { test: /\.vue$/, use: 'vue-loader' },
    ]
  },

  // source-map 定位错误的
  // devtool: 'cheap-module-source-map',

  // 配置 htmlWebpackPlugin
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
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

    // 自动删除dist目录
    // 参数：表示要删除文件的路径，可以是多个
    new cleanWebpackPlugin(['./dist']),

    // 分离第三方包（公共包文件）
    new webpack.optimize.CommonsChunkPlugin({
      // 第三方包入口名称，对应 entry 中的 vendor 属性
      // 将 entry 中指定的 ['vue', 'vue-router', 'vue-resource'] 打包到名为 vendor 的js文件中
      name: 'vendor',
    }),

    // 压缩js代码
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,

      // 压缩
      compress: {
        // 移除警告
        warnings: false
      }
    }),

    // 指定环境，设置为生产环境
    // 开发期间我们使用vue的为压缩版本，项目上下了，只需要将环境修改为
    // 生产环境，那么，vue就会自动变为 压缩版本
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    // 通过插件抽离 css (参数)
    // 参数：表示将抽离的css文件生成到哪个目录中
    new ExtractTextPlugin("css/style.css"),
    // 压缩抽离之后的css
    new OptimizeCssAssetsPlugin(),
    
    // 启用 scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}