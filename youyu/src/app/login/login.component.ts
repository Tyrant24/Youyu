import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { ApiConfig } from '../api.config';
import { AppUtil } from '../app.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[InstApi,MemberApi]
})
export class LoginComponent extends AppBase {
  instinfo = null;
  username='';
  password='';
  isremember=false;
  content='';
  agreement="";
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public memberApi:MemberApi,
  ) {
    super(router,activeRoute,instApi,memberApi);
    this.isLoginPage=true;
   }
   loginunicode="";
   readagreement=false;
   onMyLoad(){
     this.params;
     this.instApi.info({  }).then((instinfo) => {
      this.instinfo = instinfo;
    });

     

    if (this.params.v == undefined) {
      
    } else {
      var str = this.base64decode(this.params.v);
      console.log(str);
      var emailstr = str.split("&")[0];
      this.username = emailstr.split("=")[1];
      var codestr = str.split("&")[1];
      this.loginunicode = codestr.split("=")[1];
    }
   }

    
   onMyShow(){
   // this.content=AppUtil.HtmlDecode(this.instinfo.agreement);

    

    this.username=window.localStorage.getItem("lastusername");
      this.password=window.localStorage.getItem("lastpassword");
      if(this.password==null){
        this.password="";
        this.isremember = false;
      }else if (this.password != ''){
        this.isremember = true;
      }
   }

   inputs(){
     console.log(this.readagreement);
     this.readagreement=this.readagreement;
   }
   show(content){
      
      this.agreement=AppUtil.HtmlDecode(content); 
      
   }
  
   login(){
     console.log(this.username,this.password)
    if(this.username=="" || this.password==""){
      return
    }
    this.memberApi.agentlogin({
      account:this.username,
      password:this.password,
    }).then((ret:any)=>{
      console.log(ret);

      if(ret.code=='0'){
            var token=ret.return;
            window.localStorage.setItem("lastusername",this.username);
            
            if(this.isremember==true){
              window.localStorage.setItem("lastpassword",this.password);
            }

            window.sessionStorage.setItem("token",token);

            ApiConfig.SetToken(token);
            this.memberApi.agentinfo({id:ret.result}).then((info: any) => {
              window.sessionStorage.setItem("agentinfo",JSON.stringify(info));
              //this.navigate("/");
             window.location.href="/";
              console.log(info,'信息')
          })
        }else{
          this.toast(ret.result)
        }
    })
    

    // this.memberApi.kehulogin({
    //   name:this.username,
    //   password:this.password,
    //   loginunicode:this.loginunicode
    // }).then((res:any)=>{
    //   console.log(res);
    //   if(res.code=='0'){
    //     var token=res.return;
    //     window.localStorage.setItem("lastusername",this.username);
        
    //     if(this.isremember==true){
    //       window.localStorage.setItem("lastpassword",this.password);
    //     }
    //     window.sessionStorage.setItem("token",token);

    //     ApiConfig.SetToken(token);
    //     this.memberApi.kehuinfo({}).then((info: any) => {
    //       window.sessionStorage.setItem("memberinfo",JSON.stringify(info)) ;
    //       //this.navigate("/");
    //       window.location.href="/";
    //   })


    //   }else {
    //     this.toast(res.result);
    //   }
    // })
    
   }

   tishi(){
      this.toast("请先同意电子协议")
   }


  
}
