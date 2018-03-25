<template>
  <p class="cls">
    这是 About 组件 -- {{ msg }}</p>
</template>

<script>
export default {
  data() {
    return {
      msg: '单文件组件中的数据演示'
    }
  }
}
</script>

<style>
.cls {
  color: red;
  font-size: 30px;
}
</style>
