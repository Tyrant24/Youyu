import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { AgentApi } from 'src/providers/agent.api';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  providers: [InstApi, MemberApi,AgentApi]
})
export class ApplicationComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public agentApi: AgentApi,
  ) {
    super(router, activeRoute, instApi, memberApi); 
  }
  type="";
  check=false;
  shenqing=[];
  name='';
  remarks='';
  id='';
  quota='';
  agent2_id='';
  shanshow=false;
   number=0;
  onMyLoad() {
    this.params;
  }
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("agent", "application");
    }

    this.agentApi.shenqing({ 

    }).then((res:any)=>{
        this.shenqing=res;
        this.pagination(res, res.length);

        
        console.log(this.shenqing,'数据');
    })
  }

  tongyi(id,quota,agent2_id){
    this.shanshow = true;
    this.id=id;
    this.quota=quota;
    this.agent2_id=agent2_id;
  }
  bohui(id){
    this.agentApi.tongyi({  
      id:id, 
      type:'B'
     }).then((res:any)=>{
        this.pageList=[];
        this.onMyShow();
   })
  }

  confirm(){

    // console.log(this.quota,'++++',this.agentinfo.quota)
    // parseInt(this.quota)
    if(parseInt(this.quota)> parseInt(this.agentinfo.quota)){
      this.toast("剩余额度不足(剩余："+this.agentinfo.quota+")，无法分配");
      return
    }

    this.agentApi.addfenpei({quota:this.quota,agent2_id:this.agent2_id,remarks:this.remarks}).then((ret: any) => {
     
      if (ret.code == '0') {

        this.agentApi.tongyi({  
          id:this.id, 
          type:'A'
         }).then((res:any)=>{
            this.pageList=[];
            this.onMyShow();
       })
      
      } else {
        this.toast(ret.result);
      }
    })
 
  }

  search(){
    this.pageList = [];
    this.agentApi.shenqing({ 
    name:this.name
    }).then((res:any)=>{
        this.shenqing=res;
        this.pagination(res, res.length);
        console.log(this.shenqing,'数据');
    })
  }
  reset(){
    this.name=""; 
  }


}