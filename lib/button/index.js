import Button from './src/button.vue';

Button.install = function (Vue) {
    console.info('Button----install----')
    Vue.component(Button.name, Button)
}

export default Button