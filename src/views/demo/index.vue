<template>
  <div>
    <m-button @click="visible = true">点击</m-button>
    <m-dialog :visible.sync="visible"></m-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  }
};
</script>

<style></style>
