<template>
  <div class="modal" v-show="value">
    <div class="modal-mask" v-show="showMask" @click="clickMask"></div>
    <div
      class="modal-content"
      :class="[
        className ? className : 'modal-center',
        showHeader ? '' : 'no-header',
        showFooter ? '' : 'no-footer',
        tinyBar ? 'tiny-bar' : ''
      ]"
      :style="vStyle"
    >
      <div
        class="modal-header"
        :class="{ 'modal-color-tips': !plain }"
        v-if="showHeader"
      >
        <slot name="header">{{ title }}</slot>
        <i class="iconfont closed" v-if="showClose" @click.stop="onCancel"
          >&#xe6cb;</i
        >
        <span class="closed" v-if="!showClose" @click.stop="onCancel">{{
          closeText
        }}</span>
      </div>
      <div class="modal-body" ref="mBody" v-if="$slots.body">
        <slot name="body">
          <div :style="textStyle">{{ text }}</div>
        </slot>
      </div>
      <slot></slot>
      <div class="modal-footer" v-if="showFooter">
        <slot name="footer">
          <button class="footer-btn save-btn" @click.stop="onConfirm">
            {{ confirmBtnText }}
          </button>
          <button class="footer-btn cancel-btn" @click.stop="onCancel">
            {{ cancelBtnText }}
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal-component",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "标题"
    },
    text: {
      type: String,
      default: "提示信息"
    },
    tinyBar: {
      type: Boolean,
      default: false
    },
    confirmBtnText: {
      type: String,
      default: "确定"
    },
    cancelBtnText: {
      type: String,
      default: "返回"
    },
    vStyle: {
      type: Object,
      default: () => {}
    },
    className: {
      type: String,
      default: ""
    },
    closeText: {
      type: String,
      default: ""
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeTime: {
      type: [Number, String],
      default: 0
    },
    plain: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showMask: {
      type: Boolean,
      default: true
    },
    onMask: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onCancel() {
      this.$emit("before-cancel");
      this.hide();
    },
    onConfirm() {
      this.$emit("on-confirm");
    },
    hide() {
      this.isShow = false;
      this.$emit("input", this.isShow);
    },
    clickMask() {
      if (this.onMask && this.showMask) {
        this.hide();
      }
    },
    setClose() {
      var self = this;
      if (self.closeTime) {
        clearTimeout(self.closeTime);
        self.closeTime = setTimeout(function() {
          self.hide();
        }, self.closeTime);
      }
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.setClose();
      } else {
        this.$emit("on-cancel");
      }
    }
  },
  computed: {
    textStyle() {
      return {
        width: "100%",
        height: "50px",
        marginTop: "30px",
        textAlign: "center"
      };
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@assets/styles/scss/mixin.scss";

.modal {
  display: block;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  .modal-mask {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .modal-content {
    display: block;
    min-width: px2em(360);
    max-height: 100%;
    padding-top: px2em(64);
    padding-bottom: px2em(100);
    box-shadow: 0 1px px2em(8) 0 rgba(0, 30, 24, 0.05);
    overflow: hidden;
    background-color: #fff;
    &.no-header {
      padding-top: 0;
    }
    &.no-footer {
      padding-bottom: 0;
    }
    &.tiny-bar {
      padding-top: px2em(44);
      border-radius: px2em(8);
      .modal-header {
        justify-content: center;
        height: px2em(44);
        font-size: px2em(18);
        color: #fff;
        background-color: $color-tips;
        .closed {
          right: 0;
          font-size: px2em(24);
          color: #fff;
        }
      }
    }
  }
  .modal-header {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: px2em(64);
    font-size: px2em(22);
    padding: 0 px2em(20);
    font-weight: 500;
    color: $color-tips;
    background-color: #fff;
    z-index: 9999;
    text-align: left;
    border-bottom: 1px solid $color-tips;
    .closed {
      position: absolute;
      right: px2em(30);
      top: 50%;
      transform: translateY(-50%);
    }
    .iconfont.closed {
      display: flex;
      align-items: center;
      right: px2em(10);
      width: px2em(50);
      height: 100%;
      font-size: px2em(30);
      cursor: pointer;
      color: inherit;
    }
    span.closed {
      font-size: px2em(14);
      padding: px2em(8) px2em(16);
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      cursor: pointer;
      color: $color-default;
      border: 1px solid $color-default;
    }
    &.modal-color-tips {
      background-color: rgba(
        245,
        245,
        245,
        1
      ); // border-top: 1px solid $color-tips;
      color: $color-tips; // text-align: center;
    }
  }
  .modal-body {
    height: 100%;
    overflow: auto;
    padding: 0;
    margin: 0;
    -webkit-overflow-scrolling: touch;
  }
  .modal-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 9999;
    display: block;
    width: 100%;
    padding: px2em(30);
    text-align: center;
    border: none;
    background-color: #fff;
  }
}
</style>
