<template>
  <el-dialog
    class="mui-dialog"
    :visible.sync="show"
    :title="title"
    @close="close"
    :before-close="beforeClose"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
    <slot name="footer" slot="footer" v-if="$slots.footer || showFooter">
      <m-button @click="close" :width="88">取消</m-button>
      <m-button type="primary" @click="confirm" :width="88">
        确定
      </m-button>
    </slot>
  </el-dialog>
</template>
<script>
export default {
  name: "MDialog",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    visible: {
      type: Boolean,
      default: false,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    // 判断是否关闭，支持回调 next 关闭
    beforeClose: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  watch: {
    visible(nv) {
      this.show = nv;
    },
    show(nv) {
      this.$emit("update:visible", nv);
    },
  },
  methods: {
    close() {
      const { beforeClose } = this.$props;
      if (typeof beforeClose === "function") {
        beforeClose(() => {
          this.show = false;
        });
        return;
      }
      this.show = false;
    },
    confirm() {
      this.$emit("confirm");
    },
  },
};
</script>
