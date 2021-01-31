import { PluginFunction, VueConstructor } from "vue";
import "./theme-chalk/index.scss";

// 基础组件
import Dialog from "./dialog";
import Button from "./button";
import MultiTag from "./multi-tag";
import Tooltip from "./tooltip";
import Empty from "./empty";

interface Components {
  [key: string]: any;
}
const components: Components = {
  /* 基础组件 */
  Dialog,
  Button,
  MultiTag,
  Tooltip,
  Empty
};

// 全局安装方法
interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}
const install: InstallFunction = function(Vue: VueConstructor, opts = {}) {
  if (install.installed) return;
  install.installed = true;

  Vue.prototype.$ELEMENT = {
    size: opts.size || "medium",
    zIndex: opts.zIndex || 2000
  };
  Object.keys(components).forEach(key => Vue.use(components[key]));
};

// Auto-install when vue is found (eg. in browser via <script> tag)
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

// 版本信息
import { version } from "../package.json";
if (process.env.NODE_ENV === "production") {
  console.log(`MUI：running version ${version}`);
}

export {
  version,
  install,
  /* 基础组件 */
  Dialog,
  Button,
  MultiTag,
  Tooltip,
  Empty
};

export default {
  version,
  install
};
