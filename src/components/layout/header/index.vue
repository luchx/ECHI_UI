<template>
  <header class="header-container">
    <div class="title">
      <img class="logo" src="@/assets/logo.png" />
      <span>前端 UI 库</span>
    </div>
    <div class="extra">
      <theme-picker />
    </div>
  </header>
</template>

<script>
export default {
  name: "LayoutHeader"
};
</script>

<style lang="scss" scoped>
.header-container {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 9;
  height: var(--header-height-base);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 8px #f0f1f2;
  background-color: #ffffff;
  .title {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 20px;
    color: var(--color-text-primary);
  }
  .logo {
    height: 32px;
    margin-right: 16px;
  }
  .extra {
    display: flex;
    align-items: center;
  }
}
</style>
