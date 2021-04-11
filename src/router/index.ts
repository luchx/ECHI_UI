import Vue from "vue";
import nprogress from "nprogress";
import "@/assets/styles/nprogress.scss";
import VueRouter, { RouteConfig } from "vue-router";
import routerConfig from "@/router.config";

/**
 * 返回异步组件
 * @param path 组件路径
 * @returns
 */
const load = (path: string): Function => () => {
  const component = import(
    /* webpackChunkName: "[request]" */ `@/docs${path}.md`
  );
  component.catch(e => {
    console.error(e);
  });
  return component;
};

/**
 * 返回文档组件路由元数据
 * @param routers
 * @param mergeRouter
 * @returns
 */
const componentsRouter = (
  routers: any[],
  mergeRouter: Array<RouteConfig> = []
) => {
  routers.forEach(item => {
    if (item.path) {
      mergeRouter.push({
        name: `comp-${item.title}`,
        path: item.path,
        meta: {
          title: item.title,
          isComponent: true
        },
        component: load(item.path)
      });
    }
    if (item.children && item.children.length) {
      componentsRouter(item.children, mergeRouter);
    }
  });
  return mergeRouter;
};

Vue.use(VueRouter);
const routes: Array<RouteConfig> = componentsRouter(routerConfig);

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes: [
    ...routes,
    {
      path: "/code-preview",
      name: "CodePreview",
      meta: {
        title: "在线示例预览"
      },
      component: () =>
        import(
          /* webpackChunkName: "[request]" */ `@/views/code-preview/index.vue`
        )
    },
    {
      path: "*",
      redirect: "/guide/introduction"
    }
  ]
});

// nprogress.configure({ showSpinner: false });

router.beforeEach((to: Record<string, any>, from, next) => {
  if (to.path !== from.path && !Vue.component(to.name)) {
    nprogress.start();
  }
  next();
});

router.afterEach(() => {
  nprogress.done();
});

export default router;

export { routes };
