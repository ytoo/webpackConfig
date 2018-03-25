<template>
  <div>
    <h1> App.vue </h1>
    这就是一个单文件组件 <br> 这是 该组件的模板内容，所有的HTML都要放到template内置组件中 <br> 这个 template 的作用与原来创建组件时候的 template 属性作用相同 <br>

    <!-- 使用 mint-ui 中提供的组件 -->
    <mt-button type="default">default</mt-button>
    <mt-button type="primary" size="large">primary</mt-button>
    <mt-button type="danger">danger</mt-button>

    <mt-swipe :auto="1000">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
// 这里面是该组件的JS代码
export default {}
</script>

<style>
/* 当前组件中的样式，在这个标签中定义 */
/* 引入的轮播图没有高度，需要自己设置高度才能显示出来 */
.mint-swipe {
  height: 300px;
}
.mint-swipe-item {
  background-color: pink
}
</style>
