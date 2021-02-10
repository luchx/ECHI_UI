<template>
  <div>
    <div class="box">
      <div class="item">
        <div class="item-block color-1">#000000</div>
        <p class="item-text">
          弹框标题
          <br />
          强调文字
        </p>
      </div>
      <div class="item">
        <div class="item-block color-2">#333333</div>
        <p class="item-text">
          标题
          <br />
          正文
        </p>
      </div>
      <div class="item">
        <div class="item-block color-3">#666666</div>
        <p class="item-text">输入框标题</p>
      </div>
      <div class="item">
        <div class="item-block color-4">#999999</div>
        <p class="item-text">
          输入框不可编辑
          <br />
          内容文字
        </p>
      </div>
    </div>
    <div class="box">
      <div class="item">
        <div class="item-block color-5">#C8C8C8</div>
        <p class="item-text">
          输入框提示文字
        </p>
      </div>
      <div class="item">
        <div class="item-block color-6">#FFFFFF</div>
        <p class="item-text">
          深色背景文字
        </p>
      </div>
       <div class="item">
        <div class="item-block color-7">#818FBF</div>
        <p class="item-text">
          次级文字按钮
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
  color: #ffffff;
  background-color: #000000;
}

.color-2 {
  color: #ffffff;
  background-color: #333333;
}

.color-3 {
  color: #ffffff;
  background-color: #666666;
}

.color-4 {
  color: #ffffff;
  background-color: #999999;
}

.color-5 {
  color: #ffffff;
  background-color: #c8c8c8;
}

.color-6 {
  color: #333333;
  background-color: #ffffff;
}

.color-7 {
  color: #ffffff;
  background-color: #818fb8;
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