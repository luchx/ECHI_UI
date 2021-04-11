# Dialog 对话框

模态对话框。

## 基础用法

Dialog 弹出一个对话框，适合需要定制性更大的场景。

> 需要设置 `visible` 属性，它接收 `Boolean`，当为 `true` 时显示 `Dialog`。Dialog 分为两个部分：`body` 和 `footer`，footer 需要具名为 `footer` 的 `slot`。`title` 属性用于定义标题，它是可选的，默认值为 `标题`。最后，本例还展示了 `before-close` 的用法。

::: demo

```vue
<template>
  <div>
    <m-button type="text" @click="dialogVisible = true">
      点击打开 Dialog
    </m-button>

    <m-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      @confirm="dialogVisible = false"
    >
      <span>这是一段信息</span>
    </m-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {
          console.log(123);
        });
    }
  }
};
</script>
<style></style>
```

:::

## 异步关闭

点击确定后异步关闭对话框，例如提交表单。

::: demo

```vue
<template>
  <div>
    <m-button type="text" @click="dialogVisible = true">
      点击打开 Dialog
    </m-button>

    <m-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :confirm-loading="confirmLoading"
      @confirm="handleConfirm"
    >
      <span>点击确定，将在两秒后关闭</span>
    </m-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      confirmLoading: false
    };
  },
  methods: {
    handleConfirm() {
      this.confirmLoading = true;
      setTimeout(() => {
        this.dialogVisible = false;
        this.confirmLoading = false;
      }, 2000);
    }
  }
};
</script>
<style></style>
```

:::

## 自定义模态宽度

使用 `width` 来设置模态对话框的宽度。

::: demo

```vue
<template>
  <div>
    <m-button type="text" @click="dialogVisible = true">
      点击打开 Dialog
    </m-button>

    <m-dialog
      title="提示"
      width="300px"
      :visible.sync="dialogVisible"
      @confirm="dialogVisible = false"
    >
      <span>一段文本信息...</span>
    </m-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  }
};
</script>
<style></style>
```

:::

## 自定义页脚属性

传入 `confirmProps` 和 `cancelProps` 可分别自定义确定按钮和取消按钮的 `props`。

::: demo

```vue
<template>
  <div>
    <m-button type="text" @click="dialogVisible = true">
      点击打开 Dialog
    </m-button>

    <m-dialog
      title="提示"
      width="300px"
      :visible.sync="dialogVisible"
      :confirm-props="{ disabled: true, type: 'danger', loading: true }"
      :cancel-props="{ disabled: false, type: 'success' }"
      @confirm="dialogVisible = false"
    >
      <span>一段文本信息...</span>
    </m-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  }
};
</script>
<style></style>
```

:::

## 隐藏页脚

::: demo

```vue
<template>
  <div>
    <m-button type="text" @click="dialogVisible = true">
      点击打开 Dialog
    </m-button>

    <m-dialog
      title="提示"
      width="300px"
      :visible.sync="dialogVisible"
      :show-footer="false"
      @confirm="dialogVisible = false"
    >
      <span>一段文本信息...</span>
    </m-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  }
};
</script>
<style></style>
```

:::

## API

模态对话框的属性说明如下：

| 参数                  | 说明                                                                     | 类型                                 | 可选值 | 默认值 |
| --------------------- | ------------------------------------------------------------------------ | ------------------------------------ | ------ | ------ |
| visible               | 是否显示 Dialog，支持 .sync 修饰符                                       | string                               | —      | false  |
| title                 | Dialog 的标题，也可通过具名 slot （见下表）传入                          | boolean                              | —      | —      |
| width                 | Dialog 的宽度                                                            | string                               | —      | 50%    |
| fullscreen            | 是否为全屏 Dialog                                                        | boolean                              | —      | false  |
| top                   | Dialog CSS 中的 margin-top 值                                            | string                               | —      | 15vh   |
| modal                 | 是否需要遮罩层                                                           | boolean                              | —      | true   |
| modal-append-to-body  | 遮罩层是否插入至 body 元素上，若为 false，罩层会插入至 Dialog 的父元素上 | boolean                              | —      | true   |
| append-to-body        | Dialog 自身是否插入至 body 元素上。                                      | boolean                              | —      | true   |
| lock-scroll           | 是否在 Dialog 出现时将 body 滚动锁定                                     | boolean                              | —      | true   |
| custom-class          | Dialog 的自定义类名                                                      | string                               | —      | —      |
| close-on-click-modal  | 是否可以通过点击 modal 关闭 Dialog                                       | boolean                              | —      | true   |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Dialog                                         | boolean                              | —      | true   |
| show-close            | 是否显示关闭按钮                                                         | boolean                              | —      | true   |
| before-close          | 关闭前的回调，会暂停 Dialog 的关闭                                       | function(done)，done 用于关闭 Dialog | —      | null   |
| destroy-on-close      | 关闭时销毁 Dialog 中的元素                                               | boolean                              | —      | false  |
| confirm-loading       | confirm 按钮 loading                                                     | boolean                              | —      | false  |
| confirm-text          | confirm 按钮文字                                                         | string                               | —      | 确定   |
| confirm-props         | confirm 按钮 props                                                       | object                               | —      | —      |
| show-confirm          | 显示 confirm 按钮                                                        | boolean                              | —      | true   |
| cancel-text           | 取消按钮文字                                                             | string                               | —      | 取消   |
| cancel-props          | cancel 按钮 props                                                        | object                               | —      | —      |
| show-cancel           | 显示 cancel 按钮                                                         | boolean                              | —      | true   |
| show-footer           | 展示 footer                                                              | boolean                              | —      | true   |

## Slots

| name   | 说明                    |
| ------ | ----------------------- |
| —      | Dialog 的内容           |
| title  | Dialog 标题区的内容     |
| footer | Dialog 按钮操作区的内容 |

## Events

| 事件名称 | 说明                        | 回调参数 |
| -------- | --------------------------- | -------- |
| open     | Dialog 打开的回调           | —        |
| opened   | Dialog 打开动画结束时的回调 | —        |
| close    | Dialog 关闭的回调           | —        |
| closed   | Dialog 关闭动画结束时的回调 | —        |
