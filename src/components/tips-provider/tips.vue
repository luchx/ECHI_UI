<template>
  <m-animation name="toggle">
    <section class="tips-wrapper" v-show="visible" :style="tipsStyle">
      <span :class="['tips-arrow', `tips-arrow-${position}`]"></span>
      <main class="tips-main" ref="main">{{title}}</main>
    </section>
  </m-animation>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      title: "",
      offset: 8, //偏移值
      top: 0,
      left: 0,
      timer: null,
      position: "top",
    };
  },
  computed: {
    tipsStyle() {
      return {
        left: this.left,
        top: this.top,
      };
    },
  },
  methods: {
    close() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.visible = false;
      }, 30);
    },
    open({ title, elRect, position }) {
      this.title = title;
      this.visible = true;
      clearTimeout(this.timer);

      this.$nextTick(() => {
        const { left, right, top, bottom, height } = elRect;
        const clientHeight = this.$refs.main.clientHeight;
        const clientWidth = this.$refs.main.clientWidth;

        this.position = position;
        switch (position) {
          case "right":
            this.left = right + this.offset + "px";
            this.top = top + height / 2 - clientHeight / 2 + "px";
            break;
          case "bottom":
            this.left = left + "px";
            this.top = bottom + this.offset + "px";
            break;
          case "left":
            this.left = left - clientWidth - this.offset + "px";
            this.top = top + height / 2 - clientHeight / 2 + "px";
            break;
          case "top":
          default:
            this.left = left + "px";
            this.top = top - clientHeight - this.offset + "px";
            console.error("只能设置四个方向：top、right、bottom、left");
            break;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tips-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1050;
  .tips-arrow {
    position: absolute;
    display: block;
    width: 16px;
    height: 16px;
    overflow: hidden;
    background: transparent;
    pointer-events: none;
    &.tips-arrow-top {
      bottom: -16px;
      left: 16px;
    }
    &.tips-arrow-right {
      left: -16px;
      top: 8px;
      &::before {
        transform: translateX(8px) rotate(45deg);
      }
    }
    &.tips-arrow-bottom {
      top: -16px;
      left: 16px;
      &::before {
        transform: translateY(8px) rotate(45deg);
      }
    }
    &.tips-arrow-left {
      right: -16px;
      top: 8px;
      &::before {
        transform: translateX(-8px) rotate(45deg);
      }
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: block;
      width: 8px;
      height: 8px;
      margin: auto;
      background-color: rgba(0, 0, 0, 0.75);
      pointer-events: auto;
      transform: translateY(-8px) rotate(45deg);
    }
  }
  .tips-main {
    display: block;
    min-width: 30px;
    word-break: break-all;
    max-width: 300px;
    min-height: 32px;
    padding: 6px 8px;
    color: #fff;
    text-align: left;
    text-decoration: none;
    word-wrap: break-word;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
}
</style>