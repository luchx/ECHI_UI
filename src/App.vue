<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div>
      <button @click.stop="showModel_0 = true">
        显示默认样式
      </button>
      <button @click.stop="showModel_1 = true">
        显示素样式
      </button>
      <button @click.stop="showModel_2 = true">
        修改提示语
      </button>
      <button @click.stop="showModel_3 = true">
        自定义内容
      </button>
      <button @click.stop="showModel_4 = true">
        去除Footer
      </button>
      <button @click.stop="showModel_5 = true">
        去除Header
      </button>
      <button @click.stop="showModel_6 = true">
        设置3秒后自动关闭
      </button>
    </div>
    <EchiModal :visible.sync="showModel_0" title="显示默认样式"></EchiModal>
    <EchiModal :visible.sync="showModel_1" title="显示素样式" plain></EchiModal>
    <EchiModal :visible.sync="showModel_2" title="修改提示语" text="哈哈哈哈哈,我把提示信息修改了"></EchiModal>
    <EchiModal :visible.sync="showModel_3" title="自定义内容" :contentStyle="{width: '600px'}">
      <img alt="Vue logo" src="./assets/logo.png" />
    </EchiModal>
    <EchiModal :visible.sync="showModel_4" title="去除Footer" :showFooter="false"></EchiModal>
    <EchiModal :visible.sync="showModel_5" title="去除Header" :showHeader="false"></EchiModal>
    <EchiModal :visible.sync="showModel_6" title="设置3秒后自动关闭" :duration="3"></EchiModal>
  </div>
</template>

<script>
  import EchiModal from "./components/EchiModal.vue";

  export default {
    name: "app",
    components: {
      EchiModal
    },
    data() {
      return {
        showModel_0: false,
        showModel_1: false,
        showModel_2: false,
        showModel_3: false,
        showModel_4: false,
        showModel_5: false,
        showModel_6: false,
      }
    }
  };
</script>

<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>