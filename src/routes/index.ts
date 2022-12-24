import {createRouter, createWebHashHistory} from "vue-router";
import Layout from '@/layout/index.vue'

import children from "pages-generated"; // vite-plugin-pages 生成的路由信息

const routes = [{
    path: '/',
    component: Layout,
    name: 'Layout',
    redirect: '/dashboard',
    children
}]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
