<!-- home -->
<template>

  <div v-if="res.length!=0"
       class="index-container">
    <van-nav-bar title="收银中心"
                 @click-left="shangyiye"
                 left-arrow>

    </van-nav-bar>
    <div class="warpper">

    </div>
  </div>

</template>

<script >

import { AppBase } from "../../app/AppBase";

class Content extends AppBase {
  constructor() {
    super();
  }

  zhenti = [];
  setData (data) {
    data.zhenti = [];
    return data;
  }

  onMyLoad () {

    console.log("789");

  }

  onMyShow () {
    console.log("456");

  }
  onClickLeft () {
    console.log(123123);
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.methods.onClickLeft = content.onClickLeft

export default body;
</script>
<style lang="scss" scoped>
.index-container {
  .warpper {
    background: #f9f9f9;
  }
}
</style>
