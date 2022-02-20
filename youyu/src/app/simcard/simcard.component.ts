import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { AgentApi } from 'src/providers/agent.api';
import { SimapiApi } from 'src/providers/simapi.api'; 
import { AppUtil } from '../app.util';

@Component({
  selector: 'app-simcard',
  templateUrl: './simcard.component.html',
  styleUrls: ['./simcard.component.scss'],
  providers: [InstApi, MemberApi, AgentApi,SimapiApi]
})
export class SimcardComponent extends AppBase {

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
  type = "";
  check = false;
  simcardlist = [];
  idno = '';
  idno2='';
  allchose=false;
  datajson=[];
  agentlist=[];
  agent_id='';
  agent_idx='';
  sim_id='';
  idlist=[];
  fenpeitype='';
  info=null;
  wechatid='';
  cardid=''; 
  statuslist=[{id:0,name:'未激活'},{id:1,name:'已激活'},{id:2,name:'已关闭'},{id:3,name:'已过期'},{id:4,name:'已销户'}];
  accountStatus='';
  agent='';
  orderlist=[];
  fenye=0;
  //danyexuan=[];
  onMyLoad() {
    this.params;
  }
  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("simcard", "simcard");
    }
    this.pageList = [];
    this.agentApi.agentlist({  
    }).then((ret:any)=>{
        this.agentlist=ret; 
        console.log(this.agentlist);
    })

  this.simcard();
  }

  copy(cardnumber){
    console.log(cardnumber);
    var input = <HTMLInputElement>document.getElementById("inputs"); 
      input.value = "http://"+window.location.host+'/selectpage?cardid='+cardnumber; // 修改文本框的内容
      input.select(); // 选中文本
      document.execCommand("copy"); // 执行浏览器复制命令
      
      this.succ("复制成功！");

    //  return;
    //  this.navigate("selectpage",{cardid:cardnumber}); 

  }

  // chakan(cardnumber){

  //   this.simapiApi.simcardinfo({simcard:cardnumber}).then((ret:any)=>{
  //    this.info=ret;
  //    console.log(this.info,'详情')
  //   })
  // }


  chakan(cardnumber){

    //simcardname:this.simcardid
    this.agentApi.orderlist({ 
     agent:this.agentinfo.id,
     simcardname:cardnumber
    }).then((res:any)=>{ 
        this.orderlist=res; 
        for(var i=0;i<res.length;i++){
         
          res[i].zong=(parseInt(res[i].package_traffic)/1000)*res[i].recordlist.length;

        }
        console.log(this.orderlist,'数据');
    })
  
    this.simapiApi.simcardinfo({simcard:cardnumber}).then((ret:any)=>{
     this.info=ret; 
      
     console.log(this.info,'详情')
    })

  }




  simcard(){
    this.pageList = [];
    this.agentApi.simcardlist({ 
    }).then((res: any) => { 
      for (var i = 0; i < res.length; i++) {
        res[i].checking = false; 

        if(res[i].accountStatus!=0){
          res[i].seq=1;
         }else{
           res[i].seq=0;
         }

      } 

      
    res=res.sort(AppUtil.compare('seq'))

      this.simcardlist = res; 
      this.pagination(res, res.length);
      console.log(this.simcardlist);
    })
  }

  chooseagent(id,usestatus){
    if(usestatus=="A"){
      this.toast("该卡已经被激活无法分配!");
      return
     }
   this.sim_id=id;
   this.fenpeitype='A';

  }

  return(){
    for(var i=0;i<this.simcardlist.length;i++){
      if(this.simcardlist[i].checking==true){
       var list2={id:this.simcardlist[i].id,agent_id:this.agentinfo.agent_id};
       this.idlist.push(list2);
      }
   }

   var datajson=JSON.stringify(this.idlist);
   this.agentApi.fenpei({
    datajson:datajson,type:'B'
  }).then((res: any) => {
    this.simcard();
  })

  }

  fenpei() {

    
    this.idlist=[];
    var agent_id=this.agentlist[this.agent_idx].id;
    var qudao=this.agentlist[this.agent_idx].qudao;
    if(agent_id.trim()==""){
      this.toast("请选择需要分配的代理商");
      return
    }


    if(this.fenpeitype=="A"){
      var list={id:this.sim_id,agent_id:agent_id,qudao:qudao};
      this.idlist.push(list);
    }else{
      for(var i=0;i<this.simcardlist.length;i++){
        if(this.simcardlist[i].checking==true){
         var list2={id:this.simcardlist[i].id,agent_id:agent_id,qudao:qudao};
         this.idlist.push(list2);
        }
     }
     
    }

    console.log(this.idlist);
   
 
    var datajson=JSON.stringify(this.idlist);
    console.log('sim:'+this.sim_id+'---'+'agent:'+this.agent_id)
    this.agentApi.fenpei({
      datajson:datajson
    }).then((res: any) => {
      this.simcard();
    })
    
  }



  piliang(){
    this.fenpeitype='B';
  }



  search() {

    console.log(this.agent);
   // return

    this.pageList = [];
    this.agentApi.simcardlist({
      cardnumber:this.idno,
      cardnumber2:this.idno2,
      accountStatus:this.accountStatus,
      agent:this.agent
    }).then((res: any) => { 
      for (var i = 0; i < res.length; i++) {
        res[i].checking = false;
      } 
      this.simcardlist = res; 
      this.pagination(res, res.length);
      console.log(this.simcardlist);
    })
  }

  reset() {
    this.idno='';
    this.idno2='';
    this.accountStatus='';
    this.agent='';
  }

  ordertype(type) {
    this.type = type;
  }
  
  chooseone(i,item) {
    console.log(item)

    if(item.accountStatus!=0||item.agent_id!=this.agentinfo.id){
      this.toast("该卡无法分配!");
      return
     }
      
    item.checking = !item.checking;

    if (item.checking == false) {
      this.allchose = false;
    }
    if (!this.chch()) {
      this.allchose = true;
    }
      
  }

  chooseall(idx) {
    
  // console.log(this.data);
   console.log(this.danyexuan);
   console.log(this.danyexuan[idx]);

   this.danyexuan[idx].checked=!this.danyexuan[idx].checked;

    this.allchose = !this.allchose;
    // if(this.fenye==idx){
    //   this.fenye=0;
    // }else{
    //   this.fenye=idx;
    // }

    //console.log(this.fenye,'当前分页');

    if (this.danyexuan[idx].checked == true) {
      for (let item of this.data) {
        if(item.accountStatus==0&&item.agent_id==this.agentinfo.id){
          item.checking = true; 
        }
         
      }
    } else {
 
      for (let item of this.data) { 
        item.checking = false; 
      }

    }
  }
 


  chch() {
    for (let item of this.simcardlist) {
      if (item.checking == false) {
        //console.log('断1')
        return true
      }
    }
    console.log('断2')
    return false
  }


  chongzhi(id,status){

    if(status=="B"){
      this.toast("该卡未激活无法充值!");
      return
     }

     this.navigate('creatrechargeorder',id)

  }
  wechat(id,status,wechatid){
    // if(wechatid!=undefined&&wechatid!=""){
    //   this.toast("该卡已填写微信号!");
    //   return
    // }
    this.cardid=id;
  }
  tianxie(){
    this.agentApi.updateagentinfo({type:'A',id:this.cardid,wechatid:this.wechatid}).then((res:any)=>{
        this.onMyShow();
    })
  }

}
