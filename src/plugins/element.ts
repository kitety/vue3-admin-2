import {App} from "vue";
import ElementPlus, {ElMessage, ElMessageBox, ElNotification,} from "element-plus";
import "element-plus/dist/index.css"; // Element Plus 组件内部默认使用英语
// https://element-plus.gitee.io/zh-CN/guide/i18n.html
import zhCn from "element-plus/es/locale/lang/zh-cn"; // Element Plus 直接使用了 Day.js 项目的时间日期国际化设置, 并且会自动全局设置已经导入的 Day.js 国际化配置。
import "dayjs/locale/zh-cn"; // $ELEMENT size属性类型

// $ELEMENT size属性类型
export type Size = "default" | "medium" | "small" | "mini";

export default (app: App): void => {
  app.use(ElementPlus, {
    locale: zhCn,
  });

  // Vue.prototype 替换为 config.globalProperties
  // 文档说明 https://v3.cn.vuejs.org/guide/migration/global-api.html#vue-prototype-%E6%9B%BF%E6%8D%A2%E4%B8%BA-config-globalproperties
  app.config.globalProperties.$message = ElMessage;
  app.config.globalProperties.$notify = ElNotification;
  app.config.globalProperties.$confirm = ElMessageBox.confirm;
  app.config.globalProperties.$alert = ElMessageBox.alert;
  app.config.globalProperties.$prompt = ElMessageBox.prompt;

  // element-plus全局配置
  // 说明文档：https://element-plus.gitee.io/#/zh-CN/component/quickstart#quan-ju-pei-zhi
  // 该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸 small，zIndex 设置弹框的初始 z-index（默认值：2000）。
  app.config.globalProperties.$ELEMENT = {
    size: "medium",
    // zIndex: 2000 弹框zIndex默认值：2000
  };
};
