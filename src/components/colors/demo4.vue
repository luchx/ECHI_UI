<template>
  <div class="box">
    <div class="item">
      <div class="item-block color-1">#FF5D5D</div>
      <p class="item-text">非常紧急</p>
    </div>
    <div class="item">
      <div class="item-block color-2">#F89A11</div>
      <p class="item-text">紧急</p>
    </div>
    <div class="item">
      <div class="item-block color-3">#FFBD1B</div>
      <p class="item-text">一般</p>
    </div>
    <div class="item">
      <div class="item-block color-4">#3DB643</div>
      <p class="item-text">正面提示/完成</p>
    </div>
    <div class="item">
      <div class="item-block color-5">#999999</div>
      <p class="item-text">正常状态</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorsDemo4"
};
</script>

<style lang="scss" scoped>
.color-1 {
  color: #ffffff;
  background-color: #ff5d5d;
}

.color-2 {
  color: #ffffff;
  background-color: #f89a11;
}

.color-3 {
  color: #ffffff;
  background-color: #ffbd1b;
}

.color-4 {
  color: #ffffff;
  background-color: #3db643;
}

.color-5 {
  color: #ffffff;
  background-color: #999999;
}

.box {
  display: flex;
  margin-bottom: 24px;
}
.box .item {
  display: block;
  width: 150px;
}
.item-block {
  display: block;
  height: 100px;
  padding: 16px;
}
.item-text {
  padding: 0;
  margin: 0;
  margin-top: 16px;
  font-size: 14px;
  color: #666;
}
</style>
