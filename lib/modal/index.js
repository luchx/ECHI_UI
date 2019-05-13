import Modal from './src/modal.vue';

Modal.install = function (Vue) {
    console.info('Modal----install----')
    Vue.component(Modal.name, Modal)
}

export default Modal