import {
  basename
} from 'path'
import {
  baseUrl,
  imgBaseUrl,
  fileUploadAPI
} from '../config/env'
import http from '@/config/http'


// import { PhotoMgr } from '@/plugins/PhotoMgr';
// import { FileMgr } from '@/plugins/FileMgr';




export class AppBase {
  // data = {
  //   PageTitle: "",
  //   InstInfo: {},
  //   res: [],
  //   MemberInfo: null,
  //   uploadpath: imgBaseUrl
  // };
  static Setting = { alert: 'Y', sound: 'Y', shushi: '1', mashu: '1', fanshen: '1', lang: 'cn', lost: '0' };
  static Resources = null;
  static InstInfo = null;
  static AIDiapers = [];
  Params = {};
  static BabyList = [{ baby: {}, aidevice: null }];
  Page = null;
  title = 'aa';
  constructor(page) {

  }


  onBaseLoad (options) {
    console.log('onBaseLoad:param')
    console.log(this.$route)

    this.onMyLoad()
  }
  onMyLoad (options) {
    console.log('onMyLoad')
  }

  onBaseShow () {
    console.log('onBaseShow')

    console.log(AppBase.InstInfo);

    if (AppBase.InstInfo == null) {
      this.post('inst', 'info', {}).then((InstInfo) => {
        this.InstInfo = InstInfo
        AppBase.InstInfo = InstInfo
      })
    } else {
      this.InstInfo = AppBase.InstInfo
    }


    if (1 === 1 || AppBase.Resources == null) {
      this.post('inst', 'resources', {}).then((resources) => {
        this.res = resources
        AppBase.Resources = resources
      })
    } else {
      this.res = AppBase.Resources
      console.log(this.res)

    }

    console.log('token----')
    console.log(token)
    var token = window.localStorage.getItem('UserToken')
    //  alert(token);
    // alert(token);


    if (token == null) {
      // alert("牛逼1");
      const code = this.getUrlKey('code')
      if (code != undefined) {
        // alert("牛逼2");
        this.login1()
      }

      this.MemberInfo = null
      this.onMyShow()
    } else {
      this.post('member', 'info', {}).then((memberinfo) => {
        if (memberinfo == null) {
          memberinfo = null
        } else {

        }
        console.log('说几把呢')
        console.log(memberinfo)
        this.MemberInfo = memberinfo
        this.loadAIDipaer()
        this.onMyShow()
      })
    }
  }

  onMyShow () {
    console.log('onMyShow')
  }

  loadAIDipaer () {

  }

  post (model, func, params) {
    return http.post(`api/${model}/${func}`, params).then(ret => ret)
  }

  setData (data) {
    return data
  }

  generateBodyJson () {
    const base = this
    return {
      Base: base,
      data () {
        return base.setData({
          PageTitle: '',
          InstInfo: {},
          res: [],
          MemberInfo: null,
          uploadpath: imgBaseUrl
        })
      },


      methods: {
        computed: base.computed,
        onMyLoad: base.onMyLoad,
        onMyShow: base.onMyShow,
        onBaseLoad: base.onBaseLoad,
        onBaseShow: base.onBaseShow,
        loadAIDipaer: base.loadAIDipaer,
        post: base.post,
        isLogin: base.isLogin,
        push: base.push,
        pushParam: base.pushParam,
        back: base.back,
        store: base.store,
        dataReturn: base.dataReturn,
        dataReturnCallback: base.dataReturnCallback,
        logout: base.logout,
        gohome: base.gohome,
        shangyiye: base.shangyiye,
        login: base.login,
        login1: base.login1,
        getUrlKey: base.getUrlKey,
        InitWechat: base.InitWechat,
        InitWechat1: base.InitWechat1

      },
      onMyLoad: base.onMyLoad,
      onMyShow: base.onMyShow,
      beforeCreate: base.beforeCreate,
      created: base.created,
      beforeMount: base.beforeMount,
      mounted: base.mounted,
      beforeUpdate: base.beforeUpdate,
      updated: base.updated,
      beforeDestory: base.beforeDestory,
      destroyed: base.destroyed,

    }
  }
  getUrlKey (name) {
    console.log('真的牛逼')
    console.log(name)

    return decodeURIComponent((new RegExp(`[?|&]${name}=` + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
  }
  login () {
    localStorage.removeItem("UserToken");
    console.log(this.InstInfo.h5appid)

    const redirecturl = window.location.href
    const redurl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.InstInfo.h5appid
      }&redirect_uri=${redirecturl}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
    console.log({ redurl })
    window.location.href = redurl
  }

  login1 () {

    this.post('member', 'getuserinfo1', { h5: 'Y', code: this.getUrlKey('code'), grant_type: 'authorization_code' }).then((memberinfo) => {
      console.log(memberinfo)
      // window.sessionStorage.setItem("memberinfo",JSON.stringify(this.MemberInfo));

      memberinfo.h5openid = memberinfo.openid
      AppBase.MemberInfo = memberinfo
      this.MemberInfo = memberinfo

      this.post('member', 'update', memberinfo).then((

        res) => {


        window.localStorage.setItem('UserToken', memberinfo.openid)

        console.log('结果')
        console.log(res)
        console.log(res.openid)
        this.onMyShow()
      })

      // ApiConfig.SetToken(memberinfo.h5openid);
      // ApiConfig.SetTokenKey(memberinfo.unionid);
    })

    // AppBase.memberapi.getuserinfo({ h5: "Y", code: this.params.code, grant_type: "authorization_code" }).then((memberinfo) => {
    //   memberinfo.h5openid = memberinfo.openid;
    //   AppBase.MemberInfo = memberinfo;
    //   this.MemberInfo = memberinfo;

    //   window.sessionStorage.setItem("memberinfo", JSON.stringify(this.MemberInfo));

    //   ApiConfig.SetToken(memberinfo.h5openid);
    //   ApiConfig.SetTokenKey(memberinfo.unionid);
    //   AppBase.memberapi.updateh5(memberinfo).then((res) => {
    //     this.onMyShow();
    //   });

    // });
  }


  InitWechat (type) {
    let rul = window.location.href
    this.post('inst', 'gensign', { url: rul }).then((config) => {
      const json = {
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.InstInfo.h5appid, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      }
      console.log('intwechat', json)

      wx.config(json)

      encodeURIComponent('中文')

      const a = `fxmember_id=${this.MemberInfo.id}zhenti_id${this.$route.params.id}`
      // a=encodeURIComponent(a);
      rul = `http://kdbj.dingerkaoyan.com.cn/test/jiesuo/123?${a}`
      console.log('牛逼')
      console.log(rul)
      wx.ready(() => {
        wx.onMenuShareAppMessage({
          title: this.InstInfo.h5sharetitle,
          desc: this.InstInfo.h5sharedesc,
          link: rul,
          imgUrl: `${this.uploadpath}inst/${this.InstInfo.h5sharelogo}`,
          trigger (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            // alert('用户点击发送给朋友');
          },
          success (res) {
            // alert('已分享');
          },
          cancel (res) {
            // alert('已取消');
          },
          fail (res) {
            // alert("onMenuShareAppMessage" + JSON.stringify(res));
          }
        })

        wx.onMenuShareTimeline({
          title: this.InstInfo.h5sharetitle,
          desc: this.InstInfo.h5sharedesc,
          link: rul,
          imgUrl: `${this.uploadpath}inst/${this.InstInfo.h5sharelogo}`,
          trigger (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            // alert('用户点击分享到朋友圈');
          },
          success (res) {
            // alert('已分享');
          },
          cancel (res) {
            // alert('已取消');
          },
          fail (res) {
            // alert("onMenuShareTimeline" + JSON.stringify(res));
          }
        })
      })
    })
    if (type == 'A') {
      this.info('点击右上角转发')
    } else {

    }

  }


  InitWechat1 () {
    console.log("///////");
    let rul = window.location.href
    this.post('inst', 'gensign', { url: rul }).then((config) => {
      const json = {
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.InstInfo.h5appid, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      }
      console.log('intwechat', json)

      wx.config(json)

      encodeURIComponent('中文')

      const a = `fxmember_id=${this.MemberInfo.id}zhenti_id${this.$route.params.id}`
      // a=encodeURIComponent(a);
      rul = `http://kdbj.dingerkaoyan.com.cn`;
      console.log('牛逼')
      console.log(rul)
      wx.ready(() => {
        wx.onMenuShareAppMessage({
          title: this.InstInfo.h5fenxian,
          desc: this.InstInfo.fenxianmiaoshu,
          link: rul,
          imgUrl: `${this.uploadpath}inst/${this.InstInfo.fenxiantubiao}`,
          trigger (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            // alert('用户点击发送给朋友');
          },
          success (res) {
            // alert('已分享');
          },
          cancel (res) {
            // alert('已取消');
          },
          fail (res) {
            // alert("onMenuShareAppMessage" + JSON.stringify(res));
          }
        })

        wx.onMenuShareTimeline({
          title: this.InstInfo.h5sharetitle,
          link: rul,
          imgUrl: `${this.uploadpath}inst/${this.InstInfo.fenxiantubiao}`,
          trigger (res) {
            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            // alert('用户点击分享到朋友圈');
          },
          success (res) {
            // alert('已分享');
          },
          cancel (res) {
            // alert('已取消');
          },
          fail (res) {
            // alert("onMenuShareTimeline" + JSON.stringify(res));
          }
        })
      })
    })


  }

  shangyiye () {

    this.$router.go(-1)

  }

  gohome () {
    this.$router.push({ path: '/' })
    // window.location.href = '/home'
  }
  computed () {
    console.log('computed')
  }
  beforeCreate () {
    console.log('beforeCreate')
  }
  created () {
    console.log('created')
    this.onBaseLoad()
  }
  beforeMount () {
    console.log('beforeMount')
  }
  mounted () {
    console.log('mounted')
    this.onBaseShow()
  }
  beforeUpdate () {
    // console.log("beforeUpdate");
  }
  updated () {
    // console.log("updated");
  }
  beforeDestory () {
    console.log('beforeDestory')
  }
  destroyed () {
    console.log('destroyed')
  }
  // toast(message, position = '', icon = '') {
  //   Toast({
  //     message,
  //     position,
  //     iconClass: icon,
  //     duration: (message.length / 5) * 1000 
  //   })
  // }
  // info(message) {
  //   MessageBox.alert(message)
  // }
  // confirm(message, callback) {
  //   return MessageBox.confirm(message, '提示').then(callback

  //   )
  // }
  isLogin () {
    return this.MemberInfo != null
  }
  logout () {
    this.MemberInfo = null
    window.localStorage.removeItem('UserToken')

    this.back()
  }

  push (url, needlogin = false) {

    if (needlogin == false) {
      this.$router.push(url)
    } else if (this.isLogin() == false) {
      this.push('/mobilelogin')
    } else {
      this.$router.push(url)
    }
  }
  pushParam (name, param, needlogin = false) {
    console.log('go to push param')
    console.log(param)
    if (needlogin == false) {
      this.$router.push({ name, params: param })
    } else if (this.isLogin() == false) {
      this.push('/login')
    } else {

      this.$router.push({ name: name, params: param })
    }
  }

  back (level = -1) {
    this.$router.go(level)
  }

  store (name, value = null) {
    if (value == null) {
      return window.localStorage.getItem(name)
    }
    window.localStorage.setItem(name, value)
    return ''
  }
  dataReturn (data) {
    this.$emit('dataReturnCallback', data)
  }
  dataReturnCallback (retdata) {
    console.log(retdata)
  }
  // //拍照
  // takePhoto(success){
  //   PhotoMgr.takePhoto(success,(e)=>{
  //     console.log("take photo fail");
  //     console.log(e);
  //   });
  // }
  // //获取手机图片
  // choosePhoto(success){
  //   PhotoMgr.getPicture(success,(e)=>{
  //     console.log("get photo fail");
  //     console.log(e);
  //   });
  // }

  // uploadFile(  filepath, module,callback,allcompletecallback=undefined) {
  //   var filearr=[];
  //   if(Array.isArray(filepath)){
  //     filearr=filepath;
  //   }else{
  //     filearr.push(filepath);
  //   }
  //   var uploadapi=fileUploadAPI + "?field=img&module=" + module;
  //   Indicator.open({
  //     text: '上传中',
  //     spinnerType: 'fading-circle'
  //   });
  //   var all=filearr.length;
  //   var rets=[];
  //   var count=0;
  //   for(var f of filearr){
  //     FileMgr.Upload(f,uploadapi,(data)=>{
  //       console.log(data);
  //       count++;
  //       var ret=data.response.toString().split("|~~|")[1];
  //       rets.push(ret);
  //       if(count>=all){
  //         Indicator.close();
  //         if(allcompletecallback!=undefined){
  //           allcompletecallback(rets);
  //         }
  //       }
  //       if(callback!=undefined){
  //         callback(ret);
  //       }
  //     },(uploadfile)=>{
  //       count++;
  //       if(count>=all){
  //         Indicator.close();
  //       }
  //     });
  //   }
  // }

  //   let options: FileUploadOptions = {
  //       fileKey: 'img'
  //   }


  //   var fileTransfer: FileTransferObject = transfer.create();

  //   return fileTransfer.upload(filepath, ApiConfig.getFileUploadAPI() + "?field=img&module=" + module, options)
  //       .then((data) => {
  //           // success
  //           //alert(data);
  //           return data.response.toString().split("|~~|")[1];
  //       }, (err) => {
  //           alert("upload faile");
  //           // error
  //       })
  // }
}
