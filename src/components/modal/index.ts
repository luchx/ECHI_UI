import Modal from './src/modal.vue';
const name = process.env.VUE_APP_COM_PREFIX + 'Modal';

export default {
    name,
    install(Vue) {
        Vue.component(name, Modal);
    }
};