<template>
  <el-button
    class="mui-button"
    v-bind="$attrs"
    v-on="$listeners"
    :style="btnStyle"
  >
    <slot></slot>
  </el-button>
</template>
<script>
export default {
  name: "MButton",
  props: {
    width: {
      type: Number,
      default: null
    }
  },
  computed: {
    btnStyle() {
      const ret = {};
      if (this.width) {
        ret["width"] = this.setToPx(this.width);
      }
      return ret;
    }
  },
  methods: {
    setToPx(value) {
      return value + "px";
    }
  }
};
</script>
