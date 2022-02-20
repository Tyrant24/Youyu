import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { AgentApi } from 'src/providers/agent.api';
import { AppUtil } from '../app.util';
@Component({
  selector: 'app-wendang',
  templateUrl: './wendang.component.html',
  styleUrls: ['./wendang.component.scss'],
  providers: [InstApi, MemberApi, AgentApi]
})
export class WendangComponent extends AppBase {

  
   
  constructor(
    public router: Router,
    private routeInfo:ActivatedRoute,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public agentApi: AgentApi,
    public memberApi: MemberApi,
  ) {
    super(router, activeRoute, instApi, memberApi);

  }
   
   
  content='';
   
  onMyLoad() {
    this.params; 

  }
  ngOnInit(){
    console.log(this.params,'快乐健康')
  }

  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("wd", "wendang");
    }
   
    this.agentApi.wendang({type:'A'}).then((res:any)=>{
      this.content=AppUtil.HtmlDecode(res[0].content); 
       console.log(res,'文档')
    })
  }
 

  
 

}