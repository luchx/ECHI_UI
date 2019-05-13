import CButton from './src/button.vue';
const name = process.env.VUE_APP_COM_PREFIX + 'Button';

export default {
    name,
    install(Vue) {
        Vue.component(name, CButton);
    }
};