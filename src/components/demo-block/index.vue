<template>
  <div
    class="demo-block"
    :class="[blockClass, { hover: hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div ref="meta" class="meta">
      <div v-if="$slots.default" class="description">
        <slot></slot>
      </div>
      <div id="highlight" class="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
    <div
      ref="control"
      :class="['demo-block-control', { 'is-fixed': isExpanded }]"
      @click="isExpanded = !isExpanded"
    >
      <transition name="arrow-slide">
        <i :class="[iconClass, { hovering: hovering }]"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
      <div class="control-button-container">
        <m-button
          v-show="hovering || isExpanded"
          size="small"
          type="text"
          class="control-button copy-button"
          @click.stop="handleCopy"
        >
          复制代码片段
        </m-button>
        <m-tooltip effect="dark" content="在线运行此示例" placement="right">
          <transition name="text-slide">
            <m-button
              v-show="hovering || isExpanded"
              size="small"
              type="text"
              class="control-button run-online-button"
              @click.stop="handleCodeView"
            >
              在线运行
            </m-button>
          </transition>
        </m-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { utils } from "mui/shared";
import { local } from "@/utils/storage";

export default {
  name: "DemoBlock",
  data() {
    return {
      codeSource: "",
      hovering: false,
      isExpanded: false
    };
  },

  computed: {
    blockClass() {
      return `demo-${this.$router.currentRoute.path.split("/").pop()}`;
    },

    iconClass() {
      return this.isExpanded ? "el-icon-caret-top" : "el-icon-caret-bottom";
    },

    controlText() {
      return this.isExpanded ? "隐藏代码" : "显示代码";
    },

    codeArea() {
      return this.$el.getElementsByClassName("meta")[0];
    },

    codeAreaHeight() {
      if (this.$el.getElementsByClassName("description").length > 0) {
        return (
          this.$el.getElementsByClassName("description")[0].clientHeight +
          this.$el.getElementsByClassName("highlight")[0].clientHeight +
          20
        );
      }
      return this.$el.getElementsByClassName("highlight")[0].clientHeight;
    }
  },

  watch: {
    isExpanded(val) {
      this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : "0";
    }
  },

  mounted() {
    // 获取代码块内容
    const highlight = this.$el.querySelector(
      "#highlight pre[class*=language-]"
    );
    if (highlight) {
      this.codeSource = highlight.innerText;
    }
  },

  methods: {
    handleCopy() {
      utils.copyToClipboard(this.codeSource, () => {
        this.$message({
          message: "Copy successfully 🎉",
          type: "success"
        });
      });
    },
    handleCodeView() {
      const codeSource = this.codeSource;
      local.set("preview-source", codeSource);
      let routeUrl = this.$router.resolve({
        name: "CodePreview"
      });

      window.open(routeUrl.href, "_blank");
    }
  }
};
</script>

<style lang="scss" scoped>
.demo-block {
  position: relative;
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: 0.3s;

  &.hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }

  code {
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }

  .demo-button {
    float: right;
  }

  .source {
    padding: 24px;
  }

  .meta {
    background-color: var(--background-color-base);
    border-top: solid 1px #eaeefb;
    overflow: hidden;
    height: 0;
    transition: height 0.3s;
  }

  .description {
    padding: 20px;
    box-sizing: border-box;
    border: solid 1px #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px;
    background-color: var(--background-color-bg);

    p {
      margin: 0;
      line-height: 26px;
    }
  }

  .highlight {
    div[class*="language-"] {
      border-radius: 0;
    }
  }

  .demo-block-control {
    position: relative;
    z-index: 9;
    border-top: solid 1px #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: var(--background-color-bg);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    &.is-fixed {
      position: sticky;
      top: 0;
      bottom: 0;
    }
    i {
      font-size: 16px;
      line-height: 44px;
      transition: 0.3s;
      &.hovering {
        transform: translateX(-40px);
      }
    }

    > span {
      position: absolute;
      transform: translateX(-30px);
      font-size: 14px;
      line-height: 44px;
      transition: 0.3s;
      display: inline-block;
    }

    &:hover {
      color: var(--color-primary);
      background-color: #f9fafc;
    }

    & .text-slide-enter,
    & .text-slide-leave-active {
      opacity: 0;
      transform: translateX(10px);
    }

    .control-button-container {
      line-height: 40px;
      position: absolute;
      top: 0;
      right: 0;
      padding-left: 5px;
      padding-right: 25px;
    }

    .control-button {
      font-size: 14px;
      margin: 0 10px;
    }
  }
}
</style>
