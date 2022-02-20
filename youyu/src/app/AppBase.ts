import { ApiConfig } from "./api.config";
import { AppUtil } from "./app.util";
import { AppComponent } from "./app.component";
import { ReturnStatement } from "@angular/compiler";
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { OnInit, AfterViewInit, ElementRef,EventEmitter,Renderer2 } from '@angular/core';
import { InstApi } from '../providers/inst.api';
import { MemberApi } from '../providers/member.api'; 

import {Buffer} from 'buffer';

declare let Chart: any;

export class AppBase implements OnInit {

    public right="ABC";
    public needlogin = false;
    currentpage = "";
    platformname = "";
    isModal = false;

    isLoginPage = false;

    public static StaticMemberInfo=null;

    //public devicename="";

    public static devicename = "";
    public static Lang = null;
    public static TABName = "";
    public static LASTTAB = null; 
    public static CurrentRoute: Router = null;
    public static Current: AppBase = null;
    public static myapp: AppComponent = null;
    public static UNICODE = "youyucard";

    public statusBarStyle = "X";//{DARK}
    public uploadpath: string = ApiConfig.getUploadPath(); 
    public uploadapi: string = ApiConfig.getFileUploadAPI();
    public util = AppUtil;
    public static Resources = null;
    public res = null;
    public static StaticInstInfo = null;

    public InstInfo = { name: "", tel: '', logo: '' ,version:'',copyright:'',links:'',agentname:'',agent_version:'',shensu:'',goodspage:'',password:'',guanyuedu:'',agreement:'',biaoti:'',wenan1:'',wenan2:'',wenan3:'',shuoming:'',tiqianchong:'' };


    public options = null; 
    public params: Params = null;
    
    
    
    public memberinfo = null;
    public agentinfo = null;

    mySwiperOption = {
        zoom: {
            enabled: false
        }
    }

    position = ''
    bfscrolltop; // 获取软键盘唤起前浏览器滚动部分的高度



    public constructor(
        public router: Router,
        public activeRoute: ActivatedRoute,
        public instApi: InstApi, 
        public memberApi: MemberApi,  
        
         
    ) {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            this.params = params;
          
        });
        this.res = [];

        this.agentinfo=JSON.parse( window.sessionStorage.getItem("agentinfo"));
    }


    setStatusBar() {
        //  this.statusBar.styleLightContent();
        console.log('123123')
    }
    ngOnInit() {
       // console.log('坎坎坷坷扩扩扩扩扩扩扩')
        this.bfscrolltop = document.body.scrollTop;
        ApiConfig.SetUnicode(AppBase.UNICODE);


        this.CheckPermission();
        this.getResources();
        this.getInstInfo();
        this.onMyLoad();
        this.setStatusBar();

        this.checktime();
        this.getlang();
        this.getcountry();

      
 
    }
    

 
    
    CheckPermission() {
        //console.log(this.agentinfo,'信息信息信息');
        if (this.isLoginPage == false) {
            var token = window.sessionStorage.getItem("token");

           // console.log("token", '--', token);

            //console.log(this.agentinfo,'信息信息信息');

            if (token == null) {
                this.navigate("login");
            } else {
                ApiConfig.SetToken(token);
                var id=this.agentinfo.id;
                this.memberApi.agentinfo({id:id}).then((info: any) => {
                    console.log(info)
                    if (info != null) {
                        window.sessionStorage.setItem("agentinfo",JSON.stringify(info)); 
                        if(this.agentinfo==null){
                            this.agentinfo=info;
                        }
                        console.log(this.agentinfo,'代理商代理商代理商');
                    } else {
                       this.navigate("login");
                    }

                })

            }
        }
    }
    checktime() {
        if (this.isLoginPage == true) {
            let nowtime = (new Date()).getTime();
            let oldtime = window.localStorage.getItem("oldtime");

            if (nowtime > Number(oldtime)) {
                // var al = alert("长时间不操作，请重新登录！")
                // this.navigate('/login');
            }
        }


    }
    countrylist=[];
    humantype=[];
    civilstatuslist=[];
    genderlist=[];
    workstatuslist=[];
    getcountry(){
        
    }

    onMyLoad() {


    }

    lang: any = {};

    langcode = "ch";
    getlang() {
        if (AppBase.Lang == null) {
            // this.instApi.language({}, false).then((lang: any) => {
            //     console.log(lang, 'lang');
            //     AppBase.Lang = lang;
            //     this.refreshLang();
            // })
        } else {
            this.refreshLang();
        }
    }

    refreshLang() {
        if (AppBase.Lang != null) {
            var langcode = window.localStorage.getItem("langcode");
            if (langcode != null) {
                this.langcode = langcode;
            }
            this.lang = AppBase.Lang[this.langcode];
            console.log("refreshLang", this.lang);
        }
    }

    getInstInfo() {

        if (AppBase.StaticInstInfo == null) {
            this.instApi.info({}, false).then((instinfo: any) => {
                AppBase.StaticInstInfo = instinfo;
                this.InstInfo = instinfo;
                console.log(instinfo, 'inst');
                this.instLoaded();
            });
        } else {

            this.InstInfo = AppBase.StaticInstInfo;
            this.instLoaded();
        }
    }

    instLoaded(){

    }

    getMemberInfo() {

    }
    getResources() {
        if (AppBase.Resources == null) {
            this.instApi.resources({}, false).then((res) => {
                AppBase.Resources = res;
                this.res = res;
            });
        } else {
            this.res = AppBase.Resources;
        }
    }

    ngAfterViewInit() {

        this.onMyShow();
    }
    
    onMyShow() {
        this.getInstInfo();
    }
    windowslocation(url) {
        window.location.href = url;
    }
    navigate(pagename, param = {}) {
        this.router.navigate([pagename], { queryParams: param });
    }
    back() {
        window.history.back();
    }

    decode(val) {
        return AppUtil.HtmlDecode(val);
    }
    contentToLine(str) {
        if (str == null) {
            return "";
        }
        return str.split("\n");
    }

    tel(tel) {
        window.location.href = "tel:" + tel;
    }
    logout() {
        var loginunicode=this.agentinfo.loginunicode;
        var zhanhu=this.agentinfo.account;
        var url=this.base64encode("email="+(zhanhu)+"&loginunicode="+(loginunicode));
        this.navigate("/login",{v:url})
        window.sessionStorage.removeItem("token");
        window.localStorage.removeItem("token");
    }



    showAlert(content, title = "提示") {


    }

    changedate(page) {
        if (page < 1 || page > this.pages) return;

        if (page > 2) {
            var newpageList = [];
            for (var i = (page - 3); i < ((page + 2) > this.pages ? this.pages : (page + 2)); i++) {
                newpageList.push(i + 1);
            }
            this.pageList = newpageList;
        }
        this.selPage = page;
        this.setData();
        this.isActivePage(page);
    }
    isActivePage(page) {
        return this.selPage == page;
    }

    Previous() {
        this.changedate(this.selPage - 1);
    }

    Next() {
        this.changedate(this.selPage + 1);
    }
    pageSize = 20;
    pages = null;
    newPage = null;
    selPage = null;
    data = null;
    pageList = [];
    danyexuan=[];
    setData = null;
    pagination(list, length) {
        console.log(length,'长度?');
        this.pages = Math.ceil(length / this.pageSize);
        console.log(this.pages,'页面数?');
        this.newPage = this.pages > 5 ? 5: this.pages;
        this.selPage = 1;

        this.setData = function () {
            this.data = list.slice(this.pageSize * (this.selPage - 1), this.pageSize * this.selPage);
        }
        this.data = list.slice(0, this.pageSize);


        for (var i = 0; i < this.newPage; i++) {
            this.pageList.push(i + 1);
        }

        for(var j=0;j<this.pages;j++){
            this.danyexuan.push({
              idx:j+1,checked:false
            })
        }

         console.log(this.pageList,'多少');

    }

    querySelector(str) {
        return document.querySelector(str);
    }
    upload(key,module,callback){
      Chart.upload(ApiConfig.getFileUploadAPI(),key,module,callback);
    }

    checkMailFormat(email){
        //^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$
		var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
		if(reg.test(email)){
			return true;
		}else{
			return false;
		}
    }

    base64encode(str){
        return new Buffer(str).toString("base64");
    }
    base64decode(str){

        return new Buffer(str,'base64').toString()
    }
    warning(title,body){
        Chart.warning("警告",title,body);
    }
    toast(com){
        Chart.toast("警告："+com);
    }
    saveing(){
        Chart.saveing();
    }
    hidemodel(){
        Chart.hidemodel();
    }
    succ(com){
        Chart.succ(com);
    }
}
