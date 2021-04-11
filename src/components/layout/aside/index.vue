<template>
  <el-aside class="aside-container" width="240px">
    <div class="nav-list">
      <div
        class="nav-box"
        v-for="(group, groupIndex) in routerConfig"
        :key="groupIndex"
      >
        <div class="nav-title">{{ group.title }}</div>
        <template v-if="group.children && group.children.length">
          <router-link
            class="nav-item"
            active-class="active"
            :to="item.path"
            v-for="(item, itemIndex) in group.children"
            :key="itemIndex"
          >
            {{ item.title }}
          </router-link>
        </template>
      </div>
    </div>
  </el-aside>
</template>

<script>
import routerConfig from "@/router.config";

export default {
  name: "LayoutAside",
  data() {
    return {
      routerConfig: routerConfig
    };
  }
};
</script>

<style lang="scss" scoped>
.aside-container {
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  z-index: 1;
  background-color: var(--background-color-bg);
  overflow: hidden;
  overflow-y: auto;
}
.nav-list {
  display: block;
  padding: 40px 0;
}
.nav-box + .nav-box {
  margin-top: 12px;
}
.nav-title {
  display: block;
  padding: 0 24px;
  height: 34px;
  line-height: 34px;
  font-weight: normal;
  font-size: 14px;
  color: var(--color-text-secondary);
}
.nav-item {
  display: block;
  padding: 0 24px 0 32px;
  height: 40px;
  line-height: 40px;
  font-weight: normal;
  font-size: 16px;
  color: var(--color-text-regular);
  border-left-width: 4px;
  border-left-style: solid;
  border-left-color: transparent;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    background-color: var(--background-color-base);
  }
  &.active {
    color: var(--color-primary);
    border-left-color: var(--color-primary);
    background-color: var(--color-primary-light);
  }
}
</style>
