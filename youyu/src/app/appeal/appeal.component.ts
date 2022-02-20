import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { AgentApi } from 'src/providers/agent.api';

@Component({
  selector: 'app-appeal',
  templateUrl: './appeal.component.html',
  styleUrls: ['./appeal.component.scss'],
  providers: [InstApi, MemberApi, AgentApi]
})
export class AppealComponent extends AppBase {

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
  shensu='';
  lianxi='';
  onMyLoad() {
    this.params; 
  }

  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("set", "appeal");
    }
    
  }
  confirm(){
   console.log(this.shensu);
   this.agentApi.addappeal({content:this.shensu,agent_id:this.agentinfo.agent_id,agent2_id:this.agentinfo.id,lianxifangshi:this.lianxi}).then((res:any)=>{ 
     console.log(res,'222222')
    if(res.code==0){
     this.toast('提交成功!');
     this.back();
    }else{
      this.toast('提交失败!')
    }
   }) 
  }

  
 

}