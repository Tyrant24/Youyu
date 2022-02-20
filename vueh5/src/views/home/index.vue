<!-- home -->
<template>
  
</template>

<script >

import { AppBase } from "../../app/AppBase";

class Content extends AppBase {
  constructor() {
    super();
  }

  zhenti = [];
  indexbanner = [];
  setData (data) {
  
  }

  onMyLoad () {
   
  }

  onMyShow () {


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
