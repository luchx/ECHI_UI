## Button 按钮
基础组件，触发业务逻辑时使用。

```
注意：非 template/render 模式下，需使用 c-button。
```

### 按钮类型

> 按钮类型有：默认按钮、主按钮、文字按钮以及四种颜色按钮。
通过设置type为`default`、`primary`、`info`、`danger`创建不同样式的按钮，不设置为默认样式。

<c-button>Default</c-button>
<c-button type="primary">Primary</c-button>
<c-button type="info">Info</c-button>
<c-button type="danger">Danger</c-button>

```html
  <c-button>Default</c-button>
  <c-button type="primary">Primary</c-button>
  <c-button type="info">Info</c-button>
  <c-button type="danger">Danger</c-button>
```

### 基础用法
使用```type```, ```plain```, ```disabled```, ```noBorder```, ```activedBorder```和```hoverBorder```和```radius``` 属性来定义Button 的样式

> 通过添加plain属性可将按钮设置为朴素风格。

<c-button :plain="true">朴素按钮 Default</c-button>
<c-button type="primary" :plain="true">朴素按钮 Primary</c-button>
<c-button type="info" :plain="true">朴素按钮 Info</c-button>
<c-button type="danger" :plain="true">朴素按钮 Danger</c-button>

```html
  <c-button :plain="true">朴素按钮 Default</c-button>
  <c-button type="primary" :plain="true">朴素按钮 Primary</c-button>
  <c-button type="info" :plain="true">朴素按钮 Info</c-button>
  <c-button type="danger" :plain="true">朴素按钮 Danger</c-button>
```

### 按钮样式
使用```width```, ```height```属性来定义Button 的宽高

<c-button :plain="true" :width="100" :height="32">定制宽高 Default</c-button>
<c-button type="primary" :width="100" :height="32">定制宽高 Primary</c-button>
<c-button type="info" :width="100" :height="32">定制宽高 Info</c-button>
<c-button type="danger" :width="100" :height="32">定制宽高 Danger</c-button>

```html
  <c-button :plain="true" :width="100" :height="32">定制宽高 Default</c-button>
  <c-button type="primary" :width="100" :height="32">定制宽高 Primary</c-button>
  <c-button type="info" :width="100" :height="32">定制宽高 Info</c-button>
  <c-button type="danger" :width="100" :height="32">定制宽高 Danger</c-button>
```

> 通过添加disabled属性可将按钮设置为不可用状态。

<c-button :disabled="true">不可用按钮 Default</c-button>
<c-button type="primary" :disabled="true">不可用按钮 Primary</c-button>
<c-button type="info" :disabled="true">不可用按钮 Info</c-button>
<c-button type="danger" :disabled="true">不可用按钮 Danger</c-button>

```html
  <c-button :disabled="true">不可用按钮 Default</c-button>
  <c-button type="primary" :disabled="true">不可用按钮 Primary</c-button>
  <c-button type="info" :disabled="true">不可用按钮 Info</c-button>
  <c-button type="danger" :disabled="true">不可用按钮 Danger</c-button>
```

> 通过添加radius属性可以设置按钮的圆角

<c-button :radius="4">设置圆角 Default</c-button>
<c-button type="primary" :radius="4">设置圆角 Primary</c-button>
<c-button type="info" :radius="4">设置圆角 Info</c-button>
<c-button type="danger" :radius="4">设置圆角 Danger</c-button>

```html
  <c-button :radius="4">设置圆角 Default</c-button>
  <c-button type="primary" :radius="4">设置圆角 Primary</c-button>
  <c-button type="info" :radius="4">设置圆角 Info</c-button>
  <c-button type="danger" :radius="4">设置圆角 Danger</c-button>
```

> 通过添加noBorder属性可以去除按钮的边框

<c-button :noBorder="true">去除边框 Default</c-button>
<c-button type="primary" :noBorder="true">去除边框 Primary</c-button>
<c-button type="info" :noBorder="true">去除边框 Info</c-button>
<c-button type="danger" :noBorder="true">去除边框 Danger</c-button>

```html
  <c-button :noBorder="true">去除边框 Default</c-button>
  <c-button type="primary" :noBorder="true">去除边框 Primary</c-button>
  <c-button type="info" :noBorder="true">去除边框 Info</c-button>
  <c-button type="danger" :noBorder="true">去除边框 Danger</c-button>
```

> 通过添加activedBorder属性可以去除按钮选中时的边框

<c-button :activedBorder="false">去除选中边框 Default</c-button>
<c-button type="primary" :activedBorder="false">去除选中边框 Primary</c-button>
<c-button type="info" :activedBorder="false">去除选中边框 Info</c-button>
<c-button type="danger" :activedBorder="false">去除选中边框 Danger</c-button>

```html
  <c-button :activedBorder="false">去除选中边框 Default</c-button>
  <c-button type="primary" :activedBorder="false">去除选中边框 Primary</c-button>
  <c-button type="info" :activedBorder="false">去除选中边框 Info</c-button>
  <c-button type="danger" :activedBorder="false">去除选中边框 Danger</c-button>
```

> 通过添加hoverBorder属性可以去除按钮hover时的边框

<c-button :hoverBorder="false">去除选中边框 Default</c-button>
<c-button type="primary" :hoverBorder="false">去除选中边框 Primary</c-button>
<c-button type="info" :hoverBorder="false">去除选中边框 Info</c-button>
<c-button type="danger" :hoverBorder="false">去除选中边框 Danger</c-button>

```html
  <c-button :hoverBorder="false">去除选中边框 Default</c-button>
  <c-button type="primary" :hoverBorder="false">去除选中边框 Primary</c-button>
  <c-button type="info" :hoverBorder="false">去除选中边框 Info</c-button>
  <c-button type="danger" :hoverBorder="false">去除选中边框 Danger</c-button>
```

### 按钮图标

> 通过设置`prefixIcon`、`suffixIcon`、`iconSize`设置按钮的图标。

<c-button prefixIcon="icon" suffixIcon="icon" :iconSize="20">Default</c-button>
<c-button type="primary" prefixIcon="icon" suffixIcon="icon" :iconSize="20">Primary</c-button>
<c-button type="info" prefixIcon="icon" suffixIcon="icon" :iconSize="20">Info</c-button>
<c-button type="danger" prefixIcon="icon" suffixIcon="icon" :iconSize="20">Danger</c-button>

```html
  <c-button prefixIcon="icon" suffixIcon="icon" :iconSize="20">Default</c-button>
  <c-button type="primary" prefixIcon="icon" suffixIcon="icon" :iconSize="20">Primary</c-button>
  <c-button type="info" prefixIcon="icon" suffixIcon="icon" :iconSize="20">Info</c-button>
  <c-button type="danger" prefixIcon="icon" suffixIcon="icon" :iconSize="20">Danger</c-button>
```

### 按钮偏移值

> 通过设置`skewTop`、`skewRight`、`skewBottom`、`skewLeft`设置按钮的margin偏移值。

<c-button :skewTop="20" :skewRight="20" :skewBottom="20" :skewLeft="20">Default</c-button>
<c-button type="primary" :skewTop="20" :skewRight="20" :skewBottom="20" :skewLeft="20">Primary</c-button>
<c-button type="info" :skewTop="20" :skewRight="20" :skewBottom="20" :skewLeft="20">Info</c-button>
<c-button type="danger" :skewTop="20" :skewRight="20" :skewBottom="20" :skewLeft="20">Danger</c-button>

```html
  <c-button :skewTop="20" :skewRight="20" :skewBottom="20" :skewLeft="20">Default</c-button>
  <c-button type="primary" :skewTop="20" :skewRight="20" :skewBottom="20" :skewLeft="20">Primary</c-button>
  <c-button type="info" :skewTop="20" :skewRight="20" :skewBottom="20" :skewLeft="20">Info</c-button>
  <c-button type="danger" :skewTop="20" :skewRight="20" :skewBottom="20" :skewLeft="20">Danger</c-button>
```

### Button props
| 参数      | 说明          | 类型      | 默认值  |
|---------- |-------------- |---------- |-------- |
| type | 按钮类型，可选值为default、primary、info、danger或者不设置 | string | default |
| disabled | 设置按钮为禁用状态 | Boolean | false |
| radius | 设置按钮的圆角 | Number | — |
| noBorder | 去除按钮的边框 | Boolean | false |
| activedBorder | 去除按钮选中时的边框 | Boolean | false |
| plain | 设置按钮为朴素风格 | Boolean | false |
| nativeType | 设置按钮的原生类型 | String | button |
| skewTop | 设置按钮向上的间隔 | Number | — |
| skewRight | 设置按钮向右的间隔 | Number | — |
| skewBottom | 设置按钮向下的间隔 | Number | — |
| skewLeft | 设置按钮向左的间隔 | Number | — |


### Button event
| 参数      | 说明          | 返回值 |
|---------- |-------------- |---------- |
| click | 按钮点击事件 | 无 |

### Button slot
| 参数      | 说明          |
|---------- |-------------- |
| prefix | 自定义前置内容 |
| suffix | 自定义后置内容 |
| 无 | 按钮主体内容 |