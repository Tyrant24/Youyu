import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { AgentApi } from 'src/providers/agent.api';

@Component({
  selector: 'app-appeallist',
  templateUrl: './appeallist.component.html',
  styleUrls: ['./appeallist.component.scss'],
  providers: [InstApi, MemberApi,AgentApi]
})
export class AppeallistComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public agentApi: AgentApi,
    public memberApi: MemberApi,
  ) {
    super(router, activeRoute, instApi, memberApi);

  }
 
  appeallist=[];
  onMyLoad() {
    this.params; 
  }

  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("set", "appeallist");
    }
    this.agentApi.appeallist({}).then((res:any)=>{
     this.appeallist=res; 
     console.log(res);
     this.pagination(res, res.length);
    })
  }
  update(id){

   console.log(id,'kjlk')
  
   this.agentApi.updateappeal({id:id}).then((res:any)=>{ 

    this.pageList=[];
    this.onMyShow();
   }) 
  }

  
 

}