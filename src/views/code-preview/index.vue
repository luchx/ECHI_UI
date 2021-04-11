<template>
  <div class="preview-block">
    <m-page-header title="示例预览">
      <m-space :size="16" align="center" slot="extra">
        <m-button type="text" icon="el-icon-video-play" @click="handleRun">
          运行
        </m-button>
        <m-button type="text" icon="el-icon-refresh" @click="handleReset">
          清空
        </m-button>
        <m-button type="text" icon="el-icon-download" @click="handleSave">
          保存
        </m-button>
      </m-space>
    </m-page-header>
    <div class="preview-panel">
      <div class="preview-source">
        <codemirror v-model="codeSource" :options="cmOptions" />
      </div>
      <div class="preview-code">
        <component :is="is" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css"; // 核心样式
import "codemirror/theme/monokai.css"; //编辑器主题样式，配置里面theme需要设置monokai
import "codemirror/mode/javascript/javascript"; // 这js模式必须引入的
import "codemirror/mode/css/css";
import "codemirror/addon/selection/active-line"; //光标行背景高亮，配置里面也需要styleActiveLine设置为true
import "codemirror/keymap/sublime"; //sublime编辑器效果
import "codemirror/mode/vue/vue.js"; // 代码风格
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";

import { local } from "@/utils/storage";
import { scopedCss, stripTemplate, stripScript, stripStyle } from "@/utils";
import { version } from "mui";

// 基础例子
const defaultCode = `
<template>
  <div>
    <el-alert type="success" :closable="false">
      欢迎使用 lcx-ui 当前版本为 ${version}
    </el-alert>
  </div>
</template>

<script>
  export default {
    
  };
\<\/script>

<style>
</style>`.trim();

export default {
  name: "CodePreview",
  components: {
    codemirror
  },
  data() {
    return {
      codeSource: "",
      source: "",
      is: null,
      cmOptions: {
        tabSize: 2,
        theme: "monokai",
        mode: "text/x-vue",
        indentWithTabs: true,
        smartIndent: true,
        styleActiveLine: true,
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true
      }
    };
  },
  watch: {
    source(nv = defaultCode) {
      const html = stripTemplate(nv);
      const script = stripScript(nv);
      const style = stripStyle(nv);
      this.renderCode({ script, html });
      this.insertCss({ style });
    }
  },
  mounted() {
    const source = local.get("preview-source") || defaultCode;
    this.source = source;
    this.codeSource = source;
  },
  methods: {
    renderCode({ script, html }) {
      const js = script.replace(/export default/, "return ");
      const renderComponent = new Function(js)();
      renderComponent.template = `<div id="previewApp">${html}</div>`;
      this.is = renderComponent;
    },
    insertCss({ style }) {
      let css = document.querySelector("#preview-style");
      if (!css) {
        css = document.createElement("style");
        css.setAttribute("id", "preview-style");
        css.setAttribute("type", "text/css");
      }
      css.innerHTML = scopedCss(style, "preview-code");
      document.head.appendChild(css);
    },
    handleRun() {
      this.source = this.codeSource;
    },
    handleReset() {
      this.$confirm("您当前的代码尚未保存，确认要清空吗？", "清空确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.source = defaultCode;
          this.codeSource = defaultCode;
          local.set("preview-source", defaultCode);
        })
        .catch(() => {});
    },
    handleSave() {
      this.$message("此功能暂未开放~");
    }
  }
};
</script>

<style lang="scss" scoped>
.preview-block {
  display: flex;
  flex-direction: column;
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: 0.3s;
  height: 100vh;
  overflow: hidden;
}
.preview-header {
  display: flex;
  align-items: center;
  height: 60px;
}
.preview-panel {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.preview-source {
  display: block;
  width: 50%;
  background-color: #f3f4f5;
  overflow: auto;
}
.preview-code {
  display: block;
  width: 50%;
  padding: 24px;
  overflow: auto;
}
</style>
