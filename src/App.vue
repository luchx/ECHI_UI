<template>
  <div id="app">
    <CButton type="primary">123</CButton>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue
  } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {}
</script>