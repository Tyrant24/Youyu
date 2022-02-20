import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { AgentApi } from 'src/providers/agent.api';
import { SimapiApi } from 'src/providers/simapi.api';

@Component({
  selector: 'app-selectpage',
  templateUrl: './selectpage.component.html',
  styleUrls: ['./selectpage.component.scss'],
  providers: [InstApi, MemberApi,SimapiApi,AgentApi]
})
export class SelectpageComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public simapiApi: SimapiApi,
    public agentApi: AgentApi,
    public memberApi: MemberApi,
  ) {
    super(router, activeRoute, instApi, memberApi);
    this.isLoginPage=true;
  }
  info=null;
  simcardid='';
  orderlist=[];
  all=0;
  yonyou=0;
  onMyLoad() {
    this.params;
    this.simcardid=this.params.cardid;
    this.chakan();

    document.title='流量查询';
  }
  onMyShow() {
     console.log(document.title,'当前页面');

  }

  chakan(){

    //simcardname:this.simcardid
    this.agentApi.orderlist({ 
     type:'A',
     simcardname:this.simcardid
    }).then((res:any)=>{ 
        this.orderlist=res; 
        console.log(this.orderlist);
        for(var i=0;i<res.length;i++){
         
          res[i].zong=(parseInt(res[i].package_traffic)/1000)*res[i].recordlist.length;

        }

        
    })
 

    this.simapiApi.simcardinfo({simcard:this.simcardid}).then((ret:any)=>{
     this.info=ret;
     var dataPackagelist=ret.dataPackage;
      for(var i=0;i<dataPackagelist.length;i++){
         if(dataPackagelist[i].status==1){
          this.info.toacanjihuodate=dataPackagelist[i].createTime;
         }
      }
    
     if(ret.code=="400"){
        this.toast("请输入正确的卡号");
     }
     console.log(this.info,'详情')
    })

  }
}