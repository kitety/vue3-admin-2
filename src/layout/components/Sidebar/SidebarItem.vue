<template>
  <div v-if="!item.meta || !item.meta.hidden" class="sidebar-item-container">
    <!-- 只渲染一个路由 并且路由只有一个子路由时直接渲染这个子路由 -->
    <template
        v-if="
        theOnlyOneChildRoute &&
        (!theOnlyOneChildRoute.children ||
          theOnlyOneChildRoute.noShowingChildren)
      "
    >
      <sidebar-item-link
          v-if="theOnlyOneChildRoute.meta"
          :to="resolvePath(theOnlyOneChildRoute.path)"
      >
        <el-menu-item :index="resolvePath(theOnlyOneChildRoute.path)">
          <i
              v-if="item.meta && item.meta.icon.includes('el-icon')"
              :class="icon"
          ></i>
          <svg-icon v-else-if="item.meta && item.meta.icon" :icon-class="icon" class="menu-icon"></svg-icon>
          <template #title>
            <span>{{ theOnlyOneChildRoute.meta.title }}</span>
          </template>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <!-- 有多个子路由时 -->
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <svg-icon
            v-if="item.meta.icon"
            :icon-class="item.meta.icon"
            class="menu-icon"
        ></svg-icon>
        <span class="submenu-title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          :is-nest="true"
          :item="child"
      >
      </sidebar-item>
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
import path from "path";
import {computed, defineComponent, PropType, toRefs} from "vue";
import {RouteRecordRaw} from "vue-router";
import SidebarItemLink from "./SidebarItemLink.vue";
import {isExternal} from "@/utils/validate";

export default defineComponent({
  name: "SidebarItem",
  components: {
    SidebarItemLink,
  },
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
    basePath: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const {item} = toRefs(props);

    // 子路由数量
    const showingChildNumber = computed(() => {
      const children = (props.item.children || []).filter((child) => {
        // hidden属性控制路由是否渲染成菜单 像login 401 404等路由都不需要渲染成菜案
        if (child.meta && child.meta.hidden) return false;
        return true;
      });
      return children.length;
    });

    // 只有一个可渲染的子路由直接渲染这个子路由 （由于我们有的路由 layout布局组件是一级路由 二级路由才是我们要渲染成菜单）
    const theOnlyOneChildRoute = computed(() => {
      // 多个children
      if (showingChildNumber.value > 1) {
        return null;
      }

      // 子路由只有一个时 并且做个hidden筛选 children是数组类型 所以循环下
      if (item.value.children) {
        for (const child of item.value.children) {
          // hidden属性控制路由是否渲染成菜单 像login 401 404等路由都不需要渲染成菜单
          if (!child.meta || !child.meta.hidden) {
            return child;
          }
        }
      }

      // showingChildNumber === 0
      // 没有可渲染chiildren时 就渲染当前父路由item 可能children都是hidden或没有
      return {
        ...props.item,
        path: "", // resolvePath避免resolve拼接时 拼接重复
        noShowingChildren: true, // 无可渲染chiildren
      };
    });

    // menu icon
    const icon = computed(() => {
      // 子路由 如果没有icon就用父路由的
      return (theOnlyOneChildRoute.value?.meta?.icon || (props.item.meta && props.item.meta.icon)) as string
    });

    // 拼接路径 父路径+子路径
    const resolvePath = (childPath: string) => {
      // 如果是带协议外链 直接返回
      if (isExternal(childPath)) {
        return childPath;
      }
      // 如果不是外链 需要和basePath拼接
      return path.resolve(props.basePath, childPath);
    };

    return {
      theOnlyOneChildRoute,
      icon,
      resolvePath,
    };
  },
});
</script>

<style lang="scss">
.sidebar-item-container {
  .menu-icon {
    margin-right: 16px;
    margin-left: 5px;
    vertical-align: middle;
  }
}
</style>
