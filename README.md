# lcx-ui

一个基于Vue CLI 3.0，Babel7，VUE2.6封装的VUE-UI组件库模版，


## 安装

```bash
yarn add bes-ui -S
# OR
npm install bes-ui -S
```

## 示例

```js
// 统一加载
import lcxUI from 'lcx-ui'
Vue.use(lcxUI)

// 只加载部分
import { Modal } from 'lcx-ui'
Vue.use(Modal)
```

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="/package/lcx-ui.css">
<!-- 引入脚本 -->
<script src="/package/lcx-ui.umd.min.js"></script>
<script>
    Vue.use(window['lcx-ui'])
</script>
```

## License

Copyright (c) 2019-present, Echi