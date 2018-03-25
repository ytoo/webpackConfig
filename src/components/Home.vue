<template>
  <h1>这是 Home 组件 <span>这是span</span></h1>
</template>

<script>
// 这是 ES6中 导出模块的语法
export default {
  // 钩子函数
  created() {
    this.fn()
  },

  // 数据
  data() {
    return {

    }
  },

  methods: {
    fn() {

    }
  },

  // 指令
  directives: {

  }
}
</script>

<style lang="scss" scoped>
/* 可以给 style 添加 scoped 属性，让样式只对当前组件起作用 */
/* 通过 lang 属性，可以指定style使用的预编译语言 */
  h1 {
    color: yellow;

    span {
      color: green
    }
  }
</style>
