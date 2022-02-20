
<!-- home -->
<template>
  <div class="about-container">
    <div class="warpper">
      222
    </div>
  </div>
</template>

<script>
// 请求接口
import { getZhenShu } from '@/api/user.js'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      wechat: `${this.$cdn}/wx/640.gif`
    }
  },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted () {
    this.initData()
    console.log('111')
  },
  methods: {
    // 请求数据案例
    initData () {
      // 请求接口数据，仅作为展示，需要配置src->config下环境文件
      const params = { user: 'sunnie' }
      getZhenShu(params).then(res => {
        console.log(res)
      })
    },
    // Action 通过 store.dispatch 方法触发
    doDispatch () {
      this.$store.dispatch('setUserName')
    },
    goGithub (index) {

      // window.location.href = 'https://github.com/sunniejs/vue-h5-template'
    }
  }
}
</script>
<style lang="scss">
.about-container {
  /* 你的命名空间 */
  background: #fff;
  height: 100vh;
  box-sizing: border-box;
  .warpper {
    padding: 50px 12px 12px 12px;
    .list {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #666;
      font-size: 14px;
      .demo-home__title {
        margin: 0 0 6px;
        font-size: 32px;
        .demo-home__title img,
        .demo-home__title span {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .item {
        font-size: 14px;
        line-height: 34px;
        a {
          text-decoration: underline;
        }
        .van-button {
          /* vant-ui 元素*/
          background: #ff5500;
        }
      }

      .logo {
        width: 120px;
        height: 120px;
        background: url($cdn+'/weapp/logo.png') center / contain no-repeat;
      }
      .wechat {
        width: 200px;
        height: 200px;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
.abnf {
  font-size: 20px;
}
</style>
