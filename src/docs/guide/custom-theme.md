# 自定义主题

默认主题配置与 `element-ui` 一致，如有需要需自行编译好 `element-ui` 样式进行引入。

## 在项目中改变 SCSS 变量

`lcx-ui` 的 `theme-chalk` 使用 `SCSS` 编写，如果你的项目也使用了 `SCSS`，那么可以直接在项目中改变 `lcx-ui` 的样式变量。新建一个样式文件，例如 `lcx-ui-variables.scss`，写入以下内容：

> 请注意，这种方式会将所有样式全部引入

```scss
/* 改变主题色变量 */
$--color-primary: teal;

/* 改变 icon 字体路径变量，必需 */
$--font-path: '~lcx-ui/lib/theme-chalk/fonts';

@import "~lcx-ui/packages/theme-chalk/src/index";
```

之后，在项目的入口文件中，直接引入以上样式文件即可（无需引入 `lcx-ui` 编译好的 CSS 文件）：

```js
import Vue from 'vue'
import mui from 'lcx-ui'
import './mui-variables.scss'

Vue.use(mui)
```

## 命令行主题工具

### 修改变量

直接编辑 `packages/theme-chalk/src/commom/theme.scss` 文件，例如修改主题色为红色。

```scss
$--color-primary: red;
```

### 编译主题

```bash
npm run build:theme
```

重新将编译后的 css 文件进行引用即可。
