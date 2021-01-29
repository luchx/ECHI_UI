<template>
  <div :class="['mui-empty', { center }]">
    <div class="mui-empty-box">
      <slot>
        <img
          class="mui-empty-img"
          :src="image || require('./empty.png')"
          :style="imageStyle"
        />
        <div class="mui-empty-text" v-if="description || $slots.text">
          <slot name="text">
            {{ description }}
          </slot>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "MEmpty",
  inheritAttrs: false,
  props: {
    // 是否相对父容器居中
    center: {
      type: Boolean,
      default: true
    },
    // 展示空提示 => 设置字段为 false 时不展示
    description: {
      type: [String, Boolean],
      default: "暂无数据"
    },
    // 图片地址
    image: {
      type: [Object, String],
      default: null
    },
    // 图片样式
    imageStyle: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
