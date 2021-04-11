<template>
  <div class="box">
    <div class="item">
      <div class="item-block color-1">#1F93FF</div>
      <p class="item-text">
        主色调
        <br />
        强提醒
      </p>
    </div>
    <div class="item">
      <div class="item-block color-2">
        #3678FF~
        <br />
        <span style="float: right">~ #45B7FF</span>
      </div>
      <p class="item-text">导航栏选中</p>
    </div>
    <div class="item">
      <div class="item-block color-3">#E8F4FF</div>
      <p class="item-text">辅助色，次提醒</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorsDemo1"
};
</script>

<style lang="scss" scoped>
.color-1 {
  color: #fff;
  background-color: #1f93ff;
}

.color-2 {
  color: #fff;
  background: linear-gradient(270deg, #45b7ff, #3678ff);
}

.color-3 {
  color: #333;
  background-color: #e8f4ff;
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
