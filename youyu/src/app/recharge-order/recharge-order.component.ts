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
  selector: 'app-recharge-order',
  templateUrl: './recharge-order.component.html',
  styleUrls: ['./recharge-order.component.scss'],
  providers: [InstApi, MemberApi,AgentApi,SimapiApi]
})
export class RechargeOrderComponent extends AppBase {

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
  orderlist=[];
  show=false;
  order_id='';
  cardnumber='';
  cardid='';
  orderno='';
  xianshi='B';
  starttime='';
  endtime='';
  onMyLoad() {
    this.params;
  }
  onMyShow() { 
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("order", "rechargeorder");
    }

    this.agentApi.orderlist({ 

    }).then((res:any)=>{
        for(var i=0;i<res.length;i++){
          res[i].show=false;
        }
        this.orderlist=res;
        this.pagination(res, res.length);
        
        console.log(this.orderlist,'数据');
    })
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

  showall(idx){
    if(this.orderlist[idx].show==true){
      this.orderlist[idx].show=false;
    }else{
      this.orderlist[idx].show=true;
    }
    
  }

  shengxiao(order_id,cardnumber){

    this.order_id=order_id;
    this.cardnumber=cardnumber;

    console.log(cardnumber,'-----',order_id);
 
  }

  queren(){
   // this.pageList=[];
   this.xianshi='A';
    this.agentApi.tiqianchong({ 
       order_id:this.order_id,cardnumber:this.cardnumber,agent_id:this.agentinfo.id
    }).then((res:any)=>{

      console.log(res);
      if(res.code==0){
       
        this.simapiApi.chargesimcard({}).then((res:any)=>{
            this.pageList=[]; 
            this.onMyShow();
            setTimeout(() => {
              this.xianshi='B';
              this.succ("操作成功！");
            }, 500);
        })
      }
 
    })
  }



  search(){
    this.pageList = [];
    
    this.agentApi.orderlist({ 
      simcardname:this.cardid,
      orderno:this.orderno,
      starttime:this.starttime,
      endtime:this.endtime
    }).then((res:any)=>{
        for(var i=0;i<res.length;i++){
          res[i].show=false;
        }
        this.orderlist=res;
        this.pagination(res, res.length); 
        console.log(this.orderlist,'数据');
    })
    
  }


  reset(){
     this.cardid='';
     this.orderno='';
  }


}