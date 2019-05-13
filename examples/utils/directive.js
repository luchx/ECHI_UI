/**
 * @author Echi
 * @desc 添加自定义指令
 */
import {
  on,
  off
} from './dom';

/**
 *  v-focus
 * @desc 点击目标获取目标焦点, 用于自动获取输入框焦点,修复在ios下获取不到焦点的bug
 * @example
 * ```vue
 * <div v-focus="handleFocus?:function">
 * ```
 */
export const focus = {
  bind(el, binding) {
    el.__callBackFocus__ = (e) => {
      el.focus();
      if (binding.expression) {
        binding.value(e);
      }
    };
    on(el, 'click', el.__callBackFocus__);
  },
  unbind(el) {
    off(el, 'click', el.__callBackFocus__);
    delete el.__callBackFocus__;
  },
};

/**
 * v-leave
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-leave="handleLeave?:function">
 * ```
 */
export const leave = {
  bind(el, binding, vnode) {
    el.__callBackLevea__ = (e) => {
      if (el.contains(e.target)) {
        return false;
      }
      if (binding.expression) {
        binding.value(e);
      }
    };
    on(document, 'click', el.__callBackLevea__);
  },
  unbind(el) {
    off(document, 'click', el.__callBackLevea__);
    delete el.__callBackLevea__;
  },
};