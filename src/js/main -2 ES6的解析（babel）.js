// 第一行引入
require("babel-polyfill")

import $ from 'jquery'

// 实现: 隔行变色的效果
$('#list > li:odd').css('background-color', 'pink')
$('#list > li:even').css('background-color', 'green')


// ES6的class关键字的使用
// webpack 只能识别一部分的ES6代码（比如：模块化），但是对于其他的ES6语法，webpack自身无法处理。此时，就需要一个loader来处理ES6语法
// babel：将ES6的语法转化为ES5的语法，再在浏览器中执行！

// 创建类
class Student {
  // constructor 是固定的
  constructor() {
    // 实例属性
    this.name = '学生-小明'
  }

  // 静态属性
  // 浏览器识别不了es6的语法，所以需要设置一个.babelrc文件
  static test = '通过 static 关键字，给Student类添加一个静态属性'
}

var stu = new Student()
console.log(Student.test);

// --------------------------------------------------

// 构造函数
function Person() {
  // 实例属性
  this.name = 'jack'
  this.age = 19
}

// 添加静态属性
Person.test = '这是一个静态属性'

// 实例对象
var p = new Person()

// console.log(stu.name);
// console.log(p.name);

// console.log(p.test);
// console.log(Person.age);

// console.log(Person.test);

// 实例对象可以直接使用的属性叫做：实例属性
// 构造函数能够直接使用的属性叫做：静态属性


// 使用 ES6中的 padStart方法
// 但是要在这个文档的第一行设置导入babel-polyfill做兼容各种浏览器的API,
// 并且要在config.js中的entry里面也要设置一下
console.log('abc'.padStart(10));