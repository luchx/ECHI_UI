# 快速上手

本节将介绍如何在项目中使用 mui

## 完整引入

在 main.js 中写入以下内容：

```js
import Vue from 'vue'
import mui from 'lcx-ui'
import 'lcx-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(mui)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

以上代码便完成了 `lcx-ui` 的引入。需要注意的是，样式文件需要单独引入。

## 按需引入

借助 [babel-plugin-component](https://github.com/ElementUI/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```bash
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```json
{
  "presets": [
    ["@babel/preset-env", { "modules": false }]
  ],
  "plugins": [["component", [
    {
      "libraryName": "lcx-ui",
      "styleLibraryName": "theme-chalk"
    }
  ]]]
}
```

接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```js
import Vue from 'vue'
import { Button, Select } from 'lcx-ui'
import App from './App.vue'

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: h => h(App)
})
```

## 全局配置

在引入 `lcx-ui` 时，可以传入一个全局配置对象。该对象目前仅支持 size 字段，用于改变组件的默认尺寸。按照引入 `lcx-ui` 的方式，具体操作如下：

完整引入 `lcx-ui`

```js
import Vue from 'vue'
import mui from 'lcx-ui'
Vue.use(mui, { size: 'small' })
```

按需引入 `lcx-ui`

```js
import Vue from 'vue'
import { Button } from 'element-ui'

// 由于项目是依赖于 element-ui，所以按需引入的方式与 element-ui 一致
Vue.prototype.$ELEMENT = { size: 'small' }
Vue.use(Button)
```

按照以上设置，项目中所有拥有 size 属性的组件的默认尺寸均为 'small'。

## 开始使用

至此，一个基于 Vue 和 Element 的开发环境已经搭建完毕，现在就可以编写代码了。启动开发模式：

```bash
# 执行如下命令后访问 localhost:7000
npm run serve
```

编译：

```bash
npm run release
```

各个组件的使用方法请参阅它们各自的文档。
