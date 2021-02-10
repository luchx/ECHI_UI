<template>
  <div>
    <div class="box">
      <div class="item">
        <div class="item-block color-1">#FAFDFF</div>
        <p class="item-text">
          表格鼠标移入
        </p>
      </div>
      <div class="item">
        <div class="item-block color-2">#F5F7FA</div>
        <p class="item-text">
          表格表头
          <br />
          弹框表头
          <br />
          输入框不可编辑
        </p>
      </div>
      <div class="item">
        <div class="item-block color-3">#EBEEF5</div>
        <p class="item-text">表格分割线</p>
      </div>
      <div class="item">
        <div class="item-block color-4">#DCDFE6</div>
        <p class="item-text">
          输入框、搜索框
          <br />
          边框颜色
        </p>
      </div>
    </div>
    <div class="box">
      <div class="item">
        <div class="item-block color-5">#F0F2F5</div>
        <p class="item-text">
          全局背景颜色
        </p>
      </div>
      <div class="item">
        <div class="item-block color-6">#F9FAFD</div>
        <p class="item-text">
          左导航栏背景色
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.color-1 {
  color: #333333;
  background-color: #FAFDFF;
}

.color-2 {
  color: #333333;
  background-color: #F5F7FA;
}

.color-3 {
  color: #333333;
  background-color: #EBEEF5;
}

.color-4 {
  color: #333333;
  background-color: #DCDFE6;
}

.color-5 {
  color: #333333;
  background-color: #F0F2F5;
}

.color-6 {
  color: #333333;
  background-color: #F9FAFD;
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