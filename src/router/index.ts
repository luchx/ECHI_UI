import Vue from 'vue';
import Router from 'vue-router';

/**
 *  返回异步组件
 * @tips 请注意页面只能挂载在views文件下,非此路径请勿使用
 */
const AsyncComponentHook = (path: String): Function => (): any => {
    let component = import(/* webpackChunkName: "view-[request]" */ `@/views/${path}`);
    component.catch((e) => {
        // 拦截错误
        console.error(e);
    });
    return component;
};

Vue.use(Router);

export default new Router({
    routes: [{
        name: 'button',
        path: '/button',
        meta: {
            title: '按钮'
        },
        component: AsyncComponentHook('button')
    }, {
        name: 'modal',
        path: '/modal',
        meta: {
            title: '模态框'
        },
        component: AsyncComponentHook('modal')
    }],
});