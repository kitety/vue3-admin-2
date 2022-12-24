<template>
  <div>
    <h1>DashBoard Page</h1>
    <svg-icon icon-class="bug"></svg-icon>
    <!-- icon-class svg图标名称 class-name 额外的自定义类名 @click绑定事件 -->
    <svg-icon
        class-name="custom-class"
        icon-class="404"
        @click="sayHi"
    ></svg-icon>
    <el-button>Default</el-button>
  </div>
</template>

<script lang="ts" setup>

import {getCurrentInstance} from "@vue/runtime-core";

const {proxy} = getCurrentInstance()!
const sayHi = () => {
  console.log("hi svg");
  proxy?.$message.success('11111')
};
</script>

<style lang="scss">
.custom-class {
  // 自定义样式404
  cursor: pointer;
  font-size: 200px;
  color: green;
}
</style>
