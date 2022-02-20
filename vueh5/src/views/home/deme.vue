<!-- home -->
<template>
  <div>111</div>
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
}
var content = new Content();
var body = content.generateBodyJson();


export default body;
</script>
<style lang="scss" scoped>
.index-container {
  .warpper {
    padding: 12px;
    background: #fff;
    .demo-home__title {
      margin: 0 0 6px;
      font-size: 32px;
      .demo-home__title img,
      .demo-home__title span {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        width: 32px;
      }
      span {
        margin-left: 16px;
        font-weight: 500;
      }
    }
    .demo-home__desc {
      margin: 0 0 20px;
      color: rgba(69, 90, 100, 0.6);
      font-size: 14px;
    }
  }
}
</style>
