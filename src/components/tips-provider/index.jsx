import { on, off } from "@/utils/dom";
import TipsComponent from "./tips";
import { isType } from "@/utils/index";

/**
 * v-tips
 * @desc 全局挂载 tips 组件, 必须搭配 TipsProvider 使用
 * @example
 *
 * modifiers?: string 支持显示方向 => ["top", "right", "bottom", "left"]
 * message!: string 展示内容
 *
 * ```vue
 * 
 * Vue.use(TipsProvider);
 * 
 * 通过指令调用、模板中推荐用法
 * <tips-provider>
 *    <div v-tips.top="上侧展示">挂载节点</div>
 *    <div v-tips.right="右侧展示">挂载节点</div>
 *    <div v-tips.bottom="下侧展示">挂载节点</div>
 *    <div v-tips.left="左侧展示">挂载节点</div>
 * </tips-provider>
 * 
 * 以属性名调用、jsx 中推荐用法
 * <tips-provider>
 *    <div data-tips="上侧展示" data-position="top">挂载节点</div>
 *    <div data-tips="右侧展示" data-position="right">挂载节点</div>
 *    <div data-tips="下侧展示" data-position="bottom">挂载节点</div>
 *    <div data-tips="左侧展示" data-position="left">挂载节点</div>
 * </tips-provider>
 * ```
 */

let TipsEl = null;
const tipsEleQuene = new Set();

const TipsProvider = {
  name: "TipsProvider",
  data() {
    return {
      el: null,
    };
  },
  mounted() {
    on(this.$el, "mousemove", this.handleEnter);
  },
  beforeDestory() {
    off(this.$el, "mousemove", this.handleEnter);
  },
  methods: {
    handleEnter(event) {
      const target = event.target;
      const rect = target.getBoundingClientRect();
      TipsEl.close();
      if (tipsEleQuene.has(target)) {
        const modifiers =
          isType(target.__TipsModifiers__) === "string"
            ? target.__TipsModifiers__
            : Object.keys(target.__TipsModifiers__ || {}).join(",");

        TipsEl.open({
          title: target.__TipsValue__,
          elRect: rect,
          position: modifiers,
        });
        return;
      }
      const hasTips = target.hasAttribute("data-tips");
      if (hasTips) {
        const dataTips = target.getAttribute("data-tips");
        const position = target.getAttribute("data-position");
        TipsEl.open({
          title: dataTips,
          elRect: rect,
          position,
        });
      }
    },
  },
  render() {
    return this.$slots.default;
  },
};

export default {
  install(Vue) {
    let TipsVNode = Vue.extend(TipsComponent);
    if (!TipsEl) {
      TipsEl = new TipsVNode().$mount();
      document.body.appendChild(TipsEl.$el);
    }

    Vue.component("TipsProvider", TipsProvider);
    Vue.directive("tips", {
      bind(el, binding) {
        el.__TipsValue__ = binding.value;
        el.__TipsModifiers__ = binding.modifiers;
        tipsEleQuene.add(el);
      },
      unbind(el) {
        tipsEleQuene.delete(el);
      },
    });
  },
};
