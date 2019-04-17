<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <EchiModal msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import EchiModal from "./components/EchiModal.vue";

export default {
  name: "app",
  components: {
    EchiModal
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
