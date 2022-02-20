import { Component, OnInit,AfterViewInit, ElementRef,EventEmitter,Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api'; 
import { AgentApi } from 'src/providers/agent.api'; 

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [InstApi, MemberApi,AgentApi]
})
export class MainComponent extends AppBase {
  static Instance: MainComponent = null;
  instinfo = null;
  toggle = false;
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public agentApi: AgentApi,
    private el:ElementRef,
    private renderer2: Renderer2
  ) {
    super(router, activeRoute, instApi, memberApi);
    this.instinfo = {};
    this.instApi.info({ unicode: "talentSaaS" }).then((instinfo) => {
      this.instinfo = instinfo;
    });
    MainComponent.Instance = this;
  }


  module = "home";
  module2 = "";
  password='';
  shenqingshu=0;
  shensu=0;
  onMyLoad() {
    // this.agentApi.shenqing({shenqingstatus:'A'}).then((res:any)=>{ 
    //   this.shenqingshu=res.length;  
    // })

    // this.agentApi.appeallist({appeal_status:'A'}).then((res:any)=>{ 
    //   this.shensu= res.length;
    //  })
  }

  newhuman = 0;
  neworder = 0;
  
  onMyShow() {
    var today = new Date();
    var timespan = today.getTime();

    
    if (this.memberinfo != null
      &&
      this.memberinfo.expireddatetimespan / 24 / 3600 / 1000 - timespan / 24 / 3600 / 1000 < 30) {
      this.warning("Account Expired", "Your license would be expired in " + this.memberinfo.manpower.expired_date + ", please content support to update your license.");
    }

    
    this.renderer2.setStyle(this.el.nativeElement.querySelector('#loadingimg'),'background','green');
  }
   

  setModule(module, module2) {
    this.module = module;
    this.module2 = module2; 
   
    this.refreshSummary(); 
 

    console.log("列表",module,module2)
     
  }
 

  
  recentunreadlist = [];
  infoboxsummary = {
    unreadcount: 0
  };
  searchkey = "";

  searchkeyquicklist = [];


  refreshSummary() {
    this.searchkey=""; 
  }

  toggleSidebar() {
    console.log('jjjjjj')
    this.toggle = !this.toggle;

  }
  changlan(val) {
    console.log(val, '123123')
    window.localStorage.setItem("langcode", val);
    window.location.reload();
  }
  getSearchList(key){
    var list=[];
     
    return list;
  }

  submit(){
    this.agentApi.updateagentinfo({password:this.password}).then((res:any)=>{
      this.toast('请重新登录');
      this.logout();
    })
  }

}
