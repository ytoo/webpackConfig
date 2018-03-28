<template>
  <div>
    <ul>
      <li><router-link to="/home">Home页面</router-link></li>
      <li><router-link to="/about">About页面</router-link></li>
    </ul>
    <!-- 定义路由插座 -->
    <router-view></router-view>
    
     <!-- 使用 mint-ui 中提供的组件 -->
    <mt-button type="default">default</mt-button>
    <mt-button type="primary" size="large">primary</mt-button>
    <mt-button type="danger">danger</mt-button>
    <h1> App.vue </h1>
    Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。
    与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。 <br> 
    Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。
    另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

    <mt-swipe :auto="2000">
      <mt-swipe-item><img src="./images/theme1.png" alt=""></mt-swipe-item>
      <mt-swipe-item><img src="./images/theme2.png" alt=""></mt-swipe-item>
      <mt-swipe-item><img src="./images/theme3.png" alt=""></mt-swipe-item>
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
img {
  width:100%;
}
.mint-swipe {
  height: 240px;
}
.mint-swipe-item {
  background-color: pink
}
</style>
