<!-- home -->
<template>


</template>

<script >

import { AppBase } from "../../app/AppBase";

class Content extends AppBase {
  constructor() {
    super();
  }


  setData (data) {

    return data;
  }

  onMyLoad () {

    console.log("789");

  }

  // goPage (url) {
  //   this.$router.push({ path: url })
  // }
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

</style>
