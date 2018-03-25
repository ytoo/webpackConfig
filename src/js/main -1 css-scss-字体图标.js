import $ from 'jquery'

// 实现: 隔行变色的效果
$('#list > li:odd').css('background-color', 'pink')
$('#list > li:even').css('background-color', 'green')


// 在js中引入 css 文件
// import 文件路径：表示引入指定文件路径的文件
import '../css/index.css'

// 导入 sass 文件
import '../css/index.scss'

// 使用 字体图片
import '../css/font-awesome-4.7.0/css/font-awesome.css'

/* 
  引入文件错误信息：
  ERROR in ./src/css/index.css
  Module parse failed: Unexpected token (1:3)
  You may need an appropriate loader to handle this file type.
  | ul {
  |   list-style: none;
  | }
  @ ./src/js/main.js 10:0-25
  @ multi (webpack)-dev-server/client?http://localhost:8888 webpack/hot/dev-server ./src/js/main.js

  如果没有这个一个加载器（loader）能够处理该类型的文件，就会报这个错！！！
*/


// webpack的两种使用方式：
// 1 命令行
//  webpack 入口文件 出口文件
// 2 配置文件
//  在项目的根目录中创建一个名为：webpack.config.js的配置文件