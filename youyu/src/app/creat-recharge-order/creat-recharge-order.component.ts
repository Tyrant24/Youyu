import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { AgentApi } from 'src/providers/agent.api';

declare let Chart: any;
@Component({
  selector: 'app-creat-recharge-order',
  templateUrl: './creat-recharge-order.component.html',
  styleUrls: ['./creat-recharge-order.component.scss'],
  providers: [InstApi, MemberApi,AgentApi]
})
export class CreatRechargeOrderComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public agentApi: AgentApi,
  ) {
    super(router, activeRoute, instApi, memberApi);

  }
  quota=0;
  packagelist=[];
  simcardlist=[];
  simcard_id='';
  package_id='';
  idx='';
  simcardidx='';
  remarks='';
  id=null;
  onMyLoad() {
    this.params;
    this.id=this.params.id;
  }
  onMyShow() {

    this.agentApi.packagelist({ 
status:'A'
    }).then((ret:any)=>{
        this.packagelist=ret;
        console.log(this.packagelist);
    })

    this.agentApi.simcardlist({ 
      usestatus:'B'
    }).then((ret:any)=>{
        this.simcardlist=ret; 
    })

    Chart.setselect2("simcardlist",(v)=>{
      this.simcardidx=v;
    });
    
  }
  chakan(){
    console.log("23123")
  }
 

  confirm() {

    console.log(this.packagelist[this.idx]);

    //return;
    this.package_id=this.packagelist[this.idx].id;
   var danwei=this.packagelist[this.idx].danwei;
   var month=this.packagelist[this.idx].month;
   
  
    var price=parseInt(this.packagelist[this.idx].price);
    var productid=this.packagelist[this.idx].productid;
    var cardnumber=this.simcardlist[this.simcardidx].cardnumber;
    this.simcard_id=this.simcardlist[this.simcardidx].id;

    if(this.simcardidx==""){
      this.toast("请选择需要充值的SIM卡");
      return
    }
    if (this.idx=="") {
      this.toast("请选择充值套餐");
      return
    }

    console.log(price,'++++',this.agentinfo.quota)


    if(price>this.agentinfo.quota||this.agentinfo.quota<=0){
      this.toast("您的额度不足，无法充值");
      return
      }

      console.log(danwei,'_----------',month)
 
     //return;
 
    this.agentApi.creatorder({ simcard_id:this.simcard_id,package_id:this.package_id,remarks:this.remarks,price:price,danwei:danwei,month:month}).then((ret: any) => {
      console.log(ret);
      if (ret.code == '0') {

        this.agentApi.rechargerecord({package_id:this.package_id,order_id:ret.return,productid:productid,cardnumber:cardnumber,agent_id:this.agentinfo.id}).then((ret: any)=>{
          this.saveing(); 
          this.back(); 
        })
 
      } else {
        this.toast(ret.result);
      }
    })

  }
}
