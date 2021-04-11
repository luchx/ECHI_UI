<template>
  <div id="app" class="container">
    <layout v-if="isComponent" />
    <router-view v-else />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    isComponent() {
      // 组件文档带有 isComponent
      return this.$route.meta.isComponent;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: block;
  width: 100vw;
  height: 100vh;
}
</style>
