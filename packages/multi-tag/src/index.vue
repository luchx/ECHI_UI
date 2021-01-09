<template>
  <section class="mui-multiTag">
    <el-dropdown trigger="click" placement="bottom-start">
      <div class="mui-multiTag-box">
        <el-tag size="small" type="info" closable>小型标签</el-tag>
        <el-input
          v-model="inputValue"
          class="mui-multiTag-input"
          placeholder="请输入..."
        />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </section>
</template>
<script>
export default {
  name: "MMultiTag",
  data() {
    return {
      inputValue: ""
    };
  }
};
</script>
