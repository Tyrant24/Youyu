import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { AgentApi } from 'src/providers/agent.api';
@Component({
  selector: 'app-addshenqing',
  templateUrl: './addshenqing.component.html',
  styleUrls: ['./addshenqing.component.scss'],
  providers: [InstApi, MemberApi,AgentApi]
})
export class AddshenqingComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public agentApi: AgentApi,
  ) {
    super(router, activeRoute, instApi, memberApi);

  }
  quota=0; 
   
  remarks='';

  onMyLoad() {
    this.params;
  }
  onMyShow() {
    if (MainComponent.Instance != null) {
        MainComponent.Instance.setModule("set", "addshenqing");
      }
     
  }

  confirm() {
    var agent_id=this.agentinfo.agent_id;
    var agent2_id=this.agentinfo.id;
    //return; 

    if (this.quota==0) {
      this.toast("请输入申请的额度");
      return
    }
    
    this.agentApi.addshenqing({agent_id:agent_id,agent2_id:agent2_id,remarks:this.remarks,quota:this.quota}).then((ret: any) => {
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