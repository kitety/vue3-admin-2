<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar/>
    </div>
    <div class="main-container">
      <div class="header">
        <div class="navbar">navbar</div>
        <div class="tags-view">tagsview</div>
      </div>
      <!-- AppMain router-view -->
      <app-main/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Sidebar from "./components/Sidebar/index.vue";
import AppMain from "./components/AppMain.vue";

export default defineComponent({
  components: {
    Sidebar,
    AppMain,
  },
});
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;

  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;

    .header {
      background: cyan;

      .navbar {
        height: 50px;
        background: #1890ff;
      }

      .tags-view {
        height: 34px;
        background: #12efff;
      }
    }

    .app-main {
      /* 50= navbar  50  如果有tagsview + 34  */
      min-height: calc(100vh - 84px);
    }
  }
}
</style>
