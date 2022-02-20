import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { AgentApi } from 'src/providers/agent.api';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss'],
  providers: [InstApi, MemberApi,AgentApi]
})
export class OrderlistComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public agentApi: AgentApi,
    public memberApi: MemberApi,
  ) {
    super(router, activeRoute, instApi, memberApi);

  }
  type="";
  check=false;
  fenpeilist=[];
  name='';
  starttime='';
  endtime='';
  onMyLoad() {
    this.params;
  }
  onMyShow() { 
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("order", "orderlist");
    }

    this.agentApi.fenpeilist({ 

    }).then((res:any)=>{
        this.fenpeilist=res;
        this.pagination(res, res.length);
        console.log(this.fenpeilist,'分配数据');
    })
  }

  search(){
    this.pageList = [];
    this.agentApi.fenpeilist({  
     name:this.name, 
     starttime:this.starttime,
     endtime:this.endtime
    }).then((res:any)=>{
        this.fenpeilist=res;
        this.pagination(res, res.length);
        console.log(this.fenpeilist);
    })
  }
  reset(){
    this.name=""; 
  }

  ordertype(type){
    this.type=type;
  }

  choose(){
  if(this.check==false){
   this.check=true;
  }else{
    this.check=false;
  }
  }

}