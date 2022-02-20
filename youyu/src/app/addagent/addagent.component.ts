import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { AgentApi } from 'src/providers/agent.api';

@Component({
  selector: 'app-addagent',
  templateUrl: './addagent.component.html',
  styleUrls: ['./addagent.component.scss'],
  providers: [InstApi, MemberApi, AgentApi]
})
export class AddagentComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public agentApi: AgentApi,
    public memberApi: MemberApi,
  ) {
    super(router, activeRoute, instApi, memberApi);

  }
  type = null;
  quota = 0;
  yixiaohao = 0;
  total = 0;
  jihuoshu = 0;
  info = '';
  list = {
    name: '',
    mobile: '',
    account: '',
    primary_id:'',
    password: '',
    discount:'',
    logo: ''
  };
  primary_id="";

  onMyLoad() {
    this.params;
    this.type = this.params.type;
  }

  onMyShow() {
    // if (MainComponent.Instance != null) {
    //   MainComponent.Instance.setModule("sim", "addagent");
    // }
    if(this.params.id!=null&&this.params.id!=undefined&&this.params.id!=''){
      this.agentApi.agentinfo({ id: this.params.id }).then((ret: any) => {
        this.info = ret;
        this.list.name = ret.name;
        this.list.account = ret.account;
        this.list.password = ret.password;
        this.list.mobile = ret.mobile;
        this.list.logo = ret.logo;
        this.list.discount = ret.discount;
        this.list.primary_id=this.params.id;
        this.quota = ret.quota;
        this.yixiaohao = ret.yixiaohao;
        this.total = ret.total;
        this.jihuoshu = ret.jihuoshu;
        
        console.log(this.info, ' 信息11111');
      })
    }
    

  }

  afterupload(e) {
    console.log(e);
    var fileList = e.fileList;
    let index = e.fileList.findIndex(ele => ele.uid != e.file.uid);
    if (e.fileList.length > 0 && index != -1) {
      e.fileList.splice(index, 1);
    }
    //https://ng.ant.design/docs/getting-started/zh
    if (e.type == "success") {
      this.list.logo = e.file.response.result;
    } else if (e.type == 'removed') {
      this.list.logo = '';
    }
  }


  confirm() {
    if (this.list.name.trim() == '') {
      this.toast("请填写代理商名称");
      return
    }

    if (this.list.mobile.trim() == '') {
      this.toast("请填写代理商联系电话");
      return
    }

    if (this.list.account.trim() == '') {
      this.toast("请填写代理商账号");
      return
    }

    if (this.list.password.trim() == '') {
      this.toast("请填写代理商密码");
      return
    }
    if(this.list.discount.trim()==''){
      this.toast("请填写折扣");
      return
    }
    console.log(this.list)
    //return;

    // if(this.params.id==null||this.params.id==undefined){
    //   this.primary_id=0;
    // }else{
    //   var primary_id=this.params.id;
    // }

    this.agentApi.addagent(this.list).then((ret: any) => {
      console.log(ret);
      if (ret.code == '0') {
        this.saveing();
        // this.primary_id=res.return; 
        this.back(); 
      } else {
        this.toast(ret.result);
      }
    })

  }


}