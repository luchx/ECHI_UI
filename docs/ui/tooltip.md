# Tooltip 文字提示

简单的文字提示气泡框。

## 基础用法

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

> 使用 content 属性来决定 hover 时的提示信息。由 placement 属性决定展示效果：placement 属性值为：方向-对齐位置；四个方向：top、left、right、bottom；三种对齐位置：start, end，默认为空。如 placement="left-end"，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

::: demo [vue]

```vue
<template>
  <div class="box">
    <div class="top">
      <m-tooltip
        class="item"
        effect="dark"
        content="Top Left 提示文字"
        placement="top-start"
      >
        <m-button>上左</m-button>
      </m-tooltip>
      <m-tooltip
        class="item"
        effect="dark"
        content="Top Center 提示文字"
        placement="top"
        :ellipsis="false"
      >
        <m-button>上边</m-button>
      </m-tooltip>
      <m-tooltip
        class="item"
        effect="dark"
        content="Top Right 提示文字"
        placement="top-end"
        :ellipsis="false"
      >
        <m-button>上右</m-button>
      </m-tooltip>
    </div>
    <div class="left">
      <m-tooltip
        class="item"
        effect="dark"
        content="Left Top 提示文字"
        placement="left-start"
        :ellipsis="false"
      >
        <m-button>左上</m-button>
      </m-tooltip>
      <m-tooltip
        class="item"
        effect="dark"
        content="Left Center 提示文字"
        placement="left"
        :ellipsis="false"
      >
        <m-button>左边</m-button>
      </m-tooltip>
      <m-tooltip
        class="item"
        effect="dark"
        content="Left Bottom 提示文字"
        placement="left-end"
        :ellipsis="false"
      >
        <m-button>左下</m-button>
      </m-tooltip>
    </div>

    <div class="right">
      <m-tooltip
        class="item"
        effect="dark"
        content="Right Top 提示文字"
        placement="right-start"
        :ellipsis="false"
      >
        <m-button>右上</m-button>
      </m-tooltip>
      <m-tooltip
        class="item"
        effect="dark"
        content="Right Center 提示文字"
        placement="right"
        :ellipsis="false"
      >
        <m-button>右边</m-button>
      </m-tooltip>
      <m-tooltip
        class="item"
        effect="dark"
        content="Right Bottom 提示文字"
        placement="right-end"
        :ellipsis="false"
      >
        <m-button>右下</m-button>
      </m-tooltip>
    </div>
    <div class="bottom">
      <m-tooltip
        class="item"
        effect="dark"
        content="Bottom Left 提示文字"
        placement="bottom-start"
        :ellipsis="false"
      >
        <m-button>下左</m-button>
      </m-tooltip>
      <m-tooltip
        class="item"
        effect="dark"
        content="Bottom Center 提示文字"
        placement="bottom"
        :ellipsis="false"
      >
        <m-button>下边</m-button>
      </m-tooltip>
      <m-tooltip
        class="item"
        effect="dark"
        content="Bottom Right 提示文字"
        placement="bottom-end"
        :ellipsis="false"
      >
        <m-button>下右</m-button>
      </m-tooltip>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.box {
  width: 400px;
}
.box .top {
  text-align: center;
}

.box .left {
  float: left;
  width: 60px;
}

.box .right {
  float: right;
  width: 60px;
}

.box .bottom {
  clear: both;
  text-align: center;
}

.box .item {
  margin: 4px;
}

.box .left .m-tooltip__popper,
.box .right .m-tooltip__popper {
  padding: 8px 10px;
}
</style>
```

:::

## 主题

tooltip 组件提供了两个不同的主题：dark 和 light。

> 通过设置 effect 属性来改变主题，默认为 dark。

::: demo [vue]

```vue
<template>
  <div>
    <m-tooltip content="Top center" placement="top" :ellipsis="false">
      <m-button>Dark</m-button>
    </m-tooltip>
    <m-tooltip
      content="Bottom center"
      placement="bottom"
      effect="light"
      :ellipsis="false"
    >
      <m-button>Light</m-button>
    </m-tooltip>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
```

:::

::: warning
tooltip 内不支持 router-link 组件，请使用 vm.$router.push 代替。

tooltip 内不支持 disabled form 元素，参考MDN，请在 disabled form 元素外层添加一层包裹元素。
:::

## API

| 参数        | 说明                           | 类型    | 可选值                                             | 默认值 |
| ----------- | ------------------------------ | ------- | -------------------------------------------------- | ------ |
| size        | 尺寸                           | string  | large / medium / small / mini                      | medium |
| type        | 类型                           | string  | primary / success / warning / danger / info / text | —      |
| width       | 宽度                           | number  | —                                                  | —      |
| block       | 将按钮宽度调整为其父宽度的选项 | boolean | —                                                  | false  |
| plain       | 是否朴素按钮                   | boolean | —                                                  | false  |
| shape       | 设置按钮形状                   | string  | circle / round                                     | —      |
| loading     | 是否加载中状态                 | boolean | —                                                  | false  |
| disabled    | 是否禁用状态                   | boolean | —                                                  | false  |
| icon        | 图标类名                       | string  | —                                                  | —      |
| autofocus   | 是否默认聚焦                   | boolean | —                                                  | false  |
| native-type | 原生                           | string  | button / submit / reset                            | button |
