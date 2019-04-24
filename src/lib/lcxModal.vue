<template>
  <transition name="toggle">
    <section class="modal" v-show="visible">
      <div class="modal-mask" v-show="showMask" @click="clickMask"></div>
      <section class="modal-content modal-center" :style="contentStyle">
        <header class="modal-header" :class="{ 'modal-plain': plain }" v-if="showHeader">
          <slot name="header">{{ title }}</slot>
          <span class="closed" v-if="showClose" @click.stop="onClose">
            关闭
          </span>
        </header>
        <main class="modal-body">
          <slot>
            <div class="text-tips">{{ text }}</div>
          </slot>
        </main>
        <footer class="modal-footer" v-if="showFooter">
          <slot name="footer">
            <button class="modal-btn modal-btn-primary" @click.stop="onConfirm">
              {{ confirmBtnText }}
            </button>
            <button class="modal-btn modal-btn-default" @click.stop="onClose">
              {{ cancelBtnText }}
            </button>
          </slot>
        </footer>
      </section>
    </section>
  </transition>
</template>

<script>
  export default {
    name: "lcx-modal",
    props: {
      visible: {
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
      contentStyle: {
        type: Object,
        default: () => {}
      },
      showClose: {
        type: Boolean,
        default: true
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
      },
      // 如果设定的数值小于10,则会乘以1000;否则按传递的数值计算
      duration: {
        type: Number,
        default: 0
      }
    },
    watch: {
      visible(nv) {
        if (nv) {
          this.closeTimerHandle()
        }
      }
    },
    data() {
      return {
        closeTimer: null,
      }
    },
    methods: {
      onClose() {
        this.$emit("on-close");
        this.hide();
      },
      onConfirm() {
        this.$emit("on-confirm");
      },
      hide() {
        this.$emit("update:visible", false);
        this.$emit("on-closed");
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      },
      clickMask() {
        if (this.onMask && this.showMask) {
          this.hide();
        }
      },
      closeTimerHandle() {
        try {
          if (this.duration <= 0) {
            return;
          }
          const duration = (this.duration < 10) ? (this.duration * 1000) : this.duration;
          clearTimeout(this.closeTimer);
          this.closeTimer = setTimeout(() => {
            this.onClose();
          }, duration);
        } catch (e) {
          console.log(e)
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  *,
  :after,
  :before {
    box-sizing: border-box;
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  $color-tips: #1ab394;
  $color-text: rgba(255, 255, 255, 0.6);
  $color-info: #ff9900;
  $color-default: #ccc;

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
      display: flex;
      flex-direction: column;
      min-width: 360px;
      box-shadow: 0 1px 8px 0 rgba(0, 30, 24, 0.05);
      background-color: #fff;
      border-radius: 6px;
      overflow: hidden;
    }

    .modal-header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 44px;
      font-size: 18px;
      padding: 0 20px;
      font-weight: 500;
      color: #fff;
      background-color: $color-tips;
      z-index: 9999;

      .closed {
        position: absolute;
        top: 50%;
        right: 0;
        font-size: 12px;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        color: #fff;
        transform: translateY(-50%);
      }

      &.modal-plain {
        background-color: rgba(245,
          245,
          245,
          1);
        color: $color-tips;

        .closed {
          color: $color-info;
        }
      }
    }

    .modal-body {
      display: block;
      flex: 1;
      background-color: #fff;
      overflow: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .modal-footer {
      display: block;
      width: 100%;
      padding: 20px 30px;
      text-align: center;
      background-color: #fff;

      .modal-btn {
        width: 80px;

        +.modal-btn {
          margin-left: 8px;
        }
      }
    }
  }

  .text-tips {
    display: block;
    width: 100%;
    font-size: 16px;
    text-align: center;
    color: #333;
    padding: 40px 60px;
  }

  .modal-btn {
    display: inline-flex;
    padding: 0 12;
    margin: 0;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 400;
    height: 32px;
    text-align: center;
    white-space: nowrap;
    touch-action: manipulation;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    cursor: pointer;
    user-select: none;
    background-image: none;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 4px;
    transition: all .3s ease;

    &:link,
    &:visited,
    &:hover,
    &:active {
      text-decoration: none;
    }
  }

  .modal-btn-default {
    background-color: $color-default;
    color: #fff;

    &:link {
      color: #fff;
      background-color: $color-default;
    }

    &:visited {
      color: #fff;
      background-color: $color-default;
    }

    &:hover {
      color: #fff;
      background-color: rgba(170, 170, 170, .85);
    }

    &:active {
      color: #fff;
      background-color: $color-default;
    }

    &[plain] {
      background-color: #fff;
      color: $color-default;
      border: 1px solid $color-default;
    }
  }

  .modal-btn-primary {
    background-color: $color-tips;
    color: #fff;

    &:link {
      color: #fff;
      background-color: $color-tips;
    }

    &:visited {
      color: #fff;
      background-color: $color-tips;
    }

    &:hover {
      color: #fff;
      background-color: rgba(26, 179, 148, 0.85);
    }

    &:active {
      color: #fff;
      background-color: $color-tips;
    }

    &[plain] {
      background-color: #fff;
      color: $color-tips;
      border: 1px solid $color-tips;
    }
  }

  .toggle-enter,
  .toggle-leave-active {
    opacity: 0;
    transform: translatey(-10px);
  }

  .toggle-enter-active,
  .toggle-leave-active {
    transition: all ease .2s;
  }
</style>