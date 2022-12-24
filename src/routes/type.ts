import {RouteMeta, RouteRecordRaw} from 'vue-router' // router的meta类型

// router的meta类型
type ItemRouterMeta = RouteMeta & {
  icon: string;
  title: string;
};

// 菜单menu路由类型
export type MenuItemRouter = RouteRecordRaw & {
  meta: ItemRouterMeta;
};
