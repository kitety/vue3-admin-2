<template>
  <div>
    <!-- 测试展开收起 -->
    <h4 @click="isCollapse=!isCollapse">展收测试</h4>
    <el-menu
        :active-text-color="scssVariables.menuActiveText"
        :background-color="scssVariables.menuBg"
        :collapse="isCollapse"
        :collapse-transition="true"
        :default-active="activeMenu"
        :text-color="scssVariables.menuText"
        class="sidebar-container-menu"
        mode="vertical"
    >
      <sidebar-item
          v-for="route in menuRoutes"
          :key="route.path"
          :base-path="route.path"
          :item="route"
      />
    </el-menu>
  </div>
</template>

<script lang="ts">

import {computed, defineComponent, ref} from "vue";
import {useRoute} from "vue-router";
// 导入路由表
import variables from "@/styles/variables.scss?inline";
// el-menu-item封装
import SidebarItem from "./SidebarItem.vue";
import {routes} from "@/routes";


export default defineComponent({
  name: 'Sidebar',
  components: {SidebarItem},
  setup() {
    const route = useRoute()
    // 根据路由路径 对应 当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
    const activeMenu = computed(() => {
      const {path} = route;
      return path
    })
    // scss变量
    const scssVariables = computed(() => variables)
    console.log('scssVariables', scssVariables);
    // 菜单展开收起状态 后面会放store里
    const isCollapse = ref(false);

    // 渲染路由
    const menuRoutes = computed(() => routes);
    console.log('menuRoutes', menuRoutes);

    return {
      // ...toRefs(variables), // 不有toRefs原因 缺点variables里面变量属性来源不明确
      scssVariables,
      isCollapse,
      activeMenu,
      menuRoutes
    };
  }
})

</script>

<style scoped>

</style>
