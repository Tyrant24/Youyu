import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { AgentApi } from 'src/providers/agent.api';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-agentlist',
  templateUrl: './agentlist.component.html',
  styleUrls: ['./agentlist.component.scss'],
  providers: [InstApi, MemberApi,AgentApi]
})
export class AgentlistComponent extends AppBase {

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
  agentlist=[];
  shanshow=false;
  nowid=null;
  name="";
  account="";
  mobile="";
  onMyLoad() {
    this.params;
  }
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("agent", "agentlist");
    }
    this.pageList = [];
    this.agentApi.agentlist({ 

    }).then((ret:any)=>{
        this.agentlist=ret;
        this.pagination(ret, ret.length);
        console.log(this.agentlist);
    })
  }
  

  search(){
    this.pageList = [];
    this.agentApi.agentlist({ 
     account:this.account,
     name:this.name,
     mobile:this.mobile
    }).then((res:any)=>{
        this.agentlist=res;
        this.pagination(res, res.length);
        console.log(this.agentlist);
    })
  }


  reset(){
    this.name="";
    this.account="";
    this.mobile="";
  }

  update(id,status){
     
    if(status=="A"){
      var zhuangtai='I';
    }else{
      var zhuangtai='A';
    }
    this.agentApi.updatestatus({status:zhuangtai,id:id}).then((ret: any) => {
      
      this.onMyShow();

    })
  }

  
  delete(){
    this.shanshow = false;
    
    this.agentApi.updatestatus({status:'D',id:this.nowid}).then((ret: any) => { 
      this.onMyShow();
    })
  }

  tanchuan(id){
    this.shanshow = true;
    this.nowid=id;
  }

  ordertype(type){
    this.type=type;
  }

  detail(id){
    this.navigate('/addagent', { id: id,type:'B' })
  }

  choose(){
  if(this.check==false){
   this.check=true;
  }else{
    this.check=false;
  }
  }
}