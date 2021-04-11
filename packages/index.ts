import { PluginFunction, VueConstructor } from "vue";

// 基础组件
import Dialog from "./dialog";
import Button from "./button";
import Tooltip from "./tooltip";
import Empty from "./empty";

interface Components {
  [key: string]: any;
}
const components: Components = {
  /* 基础组件 */
  Dialog,
  Button,
  Tooltip,
  Empty
};

// 全局安装方法
interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

type InstallOptions = {
  size?: string;
  zIndex?: number;
};

const install: InstallFunction = function(
  Vue: VueConstructor,
  opts: InstallOptions = {}
) {
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
  Tooltip,
  Empty
};

export default {
  version,
  install
};
