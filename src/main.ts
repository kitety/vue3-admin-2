import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { store } from "./store";
import router from "./routes";
import "virtual:svg-icons-register";
import initSvgIcon from "@/icons/index";
// element-plus
import installElementPlus from "./plugins/element";

// 初始化css 重置css默认样式
import "normalize.css/normalize.css";
// 全局 css
import "@/styles/index.scss";

const app = createApp(App);
app.use(router);
app.use(initSvgIcon);
app.use(store);
app.use(installElementPlus);
app.mount("#app");
