<template>
  <el-dialog
    class="mui-dialog"
    :visible.sync="show"
    :title="title"
    @close="close"
    :before-close="beforeClose"
    :append-to-body="appendToBody"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot name="title" slot="title"></slot>
    <slot></slot>
    <slot name="footer" slot="footer" v-if="$slots.footer || showFooter">
      <m-button v-if="showCancel" v-bind="cancelButtonProps" @click="close">
        {{ cancelText }}
      </m-button>
      <m-button v-if="showConfirm" v-bind="confirmButtonProps" @click="confirm">
        {{ confirmText }}
      </m-button>
    </slot>
  </el-dialog>
</template>
<script>
export default {
  name: "MDialog",
  props: {
    // 弹窗标题
    title: {
      type: String,
      default: "标题"
    },
    // 显示弹窗
    visible: {
      type: Boolean,
      default: false
    },
    // 展示 footer
    showFooter: {
      type: Boolean,
      default: true
    },
    // 判断是否关闭，支持回调 done 关闭
    beforeClose: {
      type: Function,
      default: null
    },
    // 插入到 body 中
    appendToBody: {
      type: Boolean,
      default: true
    },
    // 显示取消按钮
    showCancel: {
      type: Boolean,
      default: true
    },
    // 取消按钮属性
    cancelProps: {
      type: Object,
      default: () => ({})
    },
    // 取消按钮文案
    cancelText: {
      type: String,
      default: "取消"
    },
    // 显示确定按钮
    showConfirm: {
      type: Boolean,
      default: true
    },
    // 确定按钮文案
    confirmText: {
      type: String,
      default: "确定"
    },
    // 确定 loading
    confirmLoading: {
      type: Boolean,
      default: false
    },
    // 确定按钮属性
    confirmProps: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      show: false
    };
  },
  watch: {
    visible(nv) {
      this.show = nv;
    },
    show(nv) {
      this.$emit("update:visible", nv);
    }
  },
  computed: {
    cancelButtonProps() {
      const ret = this.cancelProps || {};

      return {
        width: ret.width || 88,
        ...this.cancelProps
      };
    },
    confirmButtonProps() {
      const ret = this.confirmProps || {};

      return {
        type: ret.type || "primary",
        width: ret.width || 88,
        loading: ret.loading || this.confirmLoading,
        ...this.confirmProps
      };
    }
  },
  methods: {
    close() {
      // 控制关闭回调，避免出现多次调用场景
      if (!this.show) {
        return;
      }
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
    }
  }
};
</script>
