import lcxModal from './lcxModal.vue' // 导入组件

lcxModal.install = function (Vue) {
  Vue.component('lcxModal', lcxModal)
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(lcxModal);
  }
}
export default lcxModal;