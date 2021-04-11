<template>
  <section class="basic-container">
    <layout-header class="header" />
    <layout-aside />
    <main id="scroll-main" class="main" ref="content">
      <div class="main-box">
        <transition name="transTop">
          <router-view></router-view>
        </transition>
        <layout-page-nav />
      </div>
    </main>
    <el-backtop target="#scroll-main" />
  </section>
</template>

<script>
export default {
  name: "Layout",
  watch: {
    "$route.path": {
      handler() {
        this.$nextTick(() => {
          const content = this.$refs.content;
          content.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
    }
  },
  methods: {
    scrollToTop() {
      const content = this.$refs.content;
      content.scrollTo({ top: 0, behavior: "smooth" });
      this.scrollTop = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.basic-container {
  display: block;
  width: 100vw;
  height: 100vh;
  .main {
    position: fixed;
    top: var(--header-height-base);
    left: var(--aside-width-base);
    right: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    overflow: auto;
  }
  .main-box {
    display: block;
    width: 100%;
    max-width: 1400px;
    min-height: 100%;
    padding: 0 40px;
    margin: 0 auto;
  }
}
</style>
