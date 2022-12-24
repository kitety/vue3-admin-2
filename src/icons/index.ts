import {App} from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
//如果上面这句不行就把上面这句注释掉，使用下面这句
import "virtual:svg-icons-register";

// 使用require.context 加载./svg目录下所有svg文件
const files = import.meta.globEager<any>("./svg/*.svg");

export default (app: App) => {
    // 全局注册svg-icon组件
    app.component("svg-icon", SvgIcon);
};
