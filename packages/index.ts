import Vue, { PluginFunction, VueConstructor } from "vue";
import {
  Dialog,
  Button,
  // Icon
  Row,
  Col,
  Select,
  Option,
  Table,
  TableColumn,
  Input,
  Tree,
  Loading,
  Tag,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tooltip
  // Checkbox,
  // Radio,
  // RadioGroup,
  // RadioButton,
  // Popover,
  // Pagination
} from "element-ui";

Vue.prototype.$ELEMENT = { size: "medium" };

Vue.use(Dialog);
Vue.use(Button);
// Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Input);
Vue.use(Tree);
Vue.use(Loading);
Vue.use(Tag);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Tooltip);
// Vue.use(Checkbox);
// Vue.use(Radio);
// Vue.use(RadioGroup);
// Vue.use(RadioButton);
// Vue.use(Popover);
// Vue.use(Pagination);

import "./theme-chalk/index.scss";

// 基础组件
import MDialog from "./dialog";
import MButton from "./button";
import MMultiTag from "./multi-tag";
import MTooltip from "./tooltip";

interface Components {
  [key: string]: any;
}
const components: Components = {
  /* 基础组件 */
  MDialog,
  MButton,
  MMultiTag,
  MTooltip
};

// 全局安装方法
interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}
const install: InstallFunction = function(Vue: VueConstructor) {
  if (install.installed) return;
  install.installed = true;
  Object.keys(components).forEach(key => Vue.use(components[key]));
};

// Auto-install when vue is found (eg. in browser via <script> tag)
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

// 版本信息
import { version } from "../package.json";
if (process.env.NODE_ENV === "production") {
  console.log(`running version ${version}`);
}

export default {
  version,
  install,
  ...components
};
