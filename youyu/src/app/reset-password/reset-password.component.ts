import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { ApiConfig } from '../api.config';
import { AgentApi } from 'src/providers/agent.api'; 
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [InstApi, MemberApi,AgentApi]
})
export class ResetPasswordComponent extends AppBase {
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public agentApi: AgentApi,
  ) {
    super(router, activeRoute, instApi, memberApi);

    this.isLoginPage = true;
  }

  email = "";
  verifycode = "";
  password = "";
  password2 = "";

  isinvalid = false;

  invalidtext1 = "";
  invalidtext2 = "";
  invalidtext3 = "";

  oldpassword='';
  
  resetsuccess = 0;
  instinfo = null;
  onMyLoad() {
    this.params;
    this.instApi.info({  }).then((instinfo) => {
      this.instinfo = instinfo;
    });
    if (this.params.v == undefined) {
      this.email = this.params.email;
    } else {
      var str = this.base64decode(this.params.v);
      var emailstr = str.split("&")[0];
      this.email = emailstr.split("=")[1];
      var codestr = str.split("&")[1];
      this.verifycode = codestr.split("=")[1];
    }
  }
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("set", "mima");
    }
  }
  changePassword() {
 
    console.log(this.password.length,'++++');
    if(this.oldpassword==""){
      this.toast("请填写原密码！")
      return;
    }
    if(this.password==""){
      this.toast("请填写新密码！")
      return;
    }
    if(this.password2==""){
      this.toast("请再次填写新密码！")
      return;
    }
    
    if (this.password.length < 6||this.password2.length < 6) {
      this.toast("密码长度小于6位，请重新输入")
      return;
    }

    if (this.password != this.password2) {
      this.toast("两次输入的密码不一样，请重新输入") 
      return;
    }
   
    
    this.agentApi.updateagentinfo({password:this.password,oldpassword:this.oldpassword}).then((res:any)=>{
      console.log(res);
       if(res.code!=0){
        this.toast('原密码填写错误，请重新填写！');
       }else{
        this.toast('请重新登录');
        this.logout();
       }
      // this.toast('请重新登录');
      // this.logout();
    })

  }
  typeres() {
    this.isinvalid = false;
    this.invalidtext1 = "";
    this.invalidtext2 = "";
    this.invalidtext3 = "";
  }
}
