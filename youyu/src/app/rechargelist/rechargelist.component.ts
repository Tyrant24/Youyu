 
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
  selector: 'app-rechargelist',
  templateUrl: './rechargelist.component.html',
  styleUrls: ['./rechargelist.component.scss'],
  providers: [InstApi, MemberApi,AgentApi,SimapiApi]
})
export class RechargelistComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public agentApi: AgentApi,
    public simapiApi: SimapiApi,
  ) {
    super(router, activeRoute, instApi, memberApi);

  }
  type="";
  check=false;
  rechargelist=[];
  order_id='';
  cardnumber='';
  onMyLoad() {
    this.params;
  }
  onMyShow() { 
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("order", "rechargelist");
    }
    
    this.agentApi.rechargelist({ 

    }).then((res:any)=>{
        this.rechargelist=res;
        this.pagination(res, res.length);
        console.log(this.rechargelist,'数据');
    })
    
  }

  shengxiao(order_id,cardnumber){

    this.order_id=order_id;
    this.cardnumber=cardnumber;
 
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

  queren(){
    this.pageList=[];
    this.agentApi.tiqianchong({ 
      order_id:this.order_id,cardnumber:this.cardnumber,agent_id:this.agentinfo.id
    }).then((res:any)=>{

      console.log(res);
      if(res.code==0){
        this.simapiApi.chargesimcard({}).then((res:any)=>{

          this.agentApi.rechargelist({ 
  
          }).then((res:any)=>{
              this.rechargelist=res;
              this.pagination(res, res.length); 
          })
  
        })
      }

 
    })
  }

}
