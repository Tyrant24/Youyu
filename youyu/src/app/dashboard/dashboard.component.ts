import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component';
import { SimapiApi } from 'src/providers/simapi.api';
import { AgentApi } from 'src/providers/agent.api';

import * as echarts from 'echarts';

declare let Chart: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [InstApi, MemberApi,AgentApi]
})
export class DashboardComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public agentApi: AgentApi,
  ) {
    super(router, activeRoute, instApi, memberApi);
  }


  latestorder = [];
  cardtoatl=0;
  month=0;
  days=0;
  clientaccoptions = null;
  list=[];
  datefrom='';
  dateto='';
  allprice=0;
  active_total=0;
  agent_total=0;
  zongshu=0;
  starnum=0;
  cha=0;
  start=0;
  tianshu=0;
  chongzhilv=0;
  yuelirun=0;
  onMyShow() { 
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("home", "");
    }
 
    console.log("看见了看就看",this.InstInfo)

    this.agentApi.simcardlist({}).then((res:any)=>{
         this.cardtoatl=res.length;
    })
 
    this.agentApi.statistics({ 
      
    }).then((res:any)=>{
      this.month=res.month;
      this.days=res.days;
      this.active_total=res.active_total;
      this.agent_total=res.agent_total;
      this.zongshu=parseInt(res.zongshu);
      this.list=res.list; 
      
      
      if(res.list.length!=0){
        this.datefrom=res.list[0].date;
        this.dateto=res.list[res.list.length-1].date;
      }
      
      this.allprice=res.allprice;
      
      this.tianshu=res.tianshu;
      

      if(this.tianshu==0||this.allprice==0){
        
        this.chongzhilv=0;
      }else{
        this.chongzhilv=Math.ceil((this.allprice/this.tianshu)*365);
      }
      
      if(this.chongzhilv==0){
        this.yuelirun=0;
      }else{
        this.yuelirun=Math.ceil(this.chongzhilv/12);
      }
      
      
      
      console.log(this.yuelirun,'利率多少');

      if(this.zongshu<50){ 
        this.cha=50-this.zongshu;
        this.start=0;
        console.log("走这没")
     }

      if(this.zongshu>=50&&this.zongshu<200){
         this.starnum=20;
         this.cha=200-this.zongshu;
         this.start=1;
      }
      if(this.zongshu>=200&&this.zongshu<500){
        this.starnum=40;
        this.cha=500-this.zongshu;
        this.start=2;
      }
     if(this.zongshu>=500&&this.zongshu<1000){
      this.starnum=60;
      this.cha=1000-this.zongshu;
      this.start=3;
      }
     if(this.zongshu>=1000&&this.zongshu<2000){
       this.starnum=80;
       this.cha=2000-this.zongshu;
       this.start=4;
       }
       if(this.zongshu>=2000){
        this.starnum=100; 
        this.start=5;
        }
 
      this.setClientAccOption(this.list);
      
    })
 
  }



  setClientAccOption(list) {
     
    var data = []; 
    var datelist=[];  
    for(var i=0;i<list.length;i++){ 
      datelist.push(list[i].date);
      data.push(list[i].price);
    }

    console.log(datelist,data,'立刻就快乐健康');
 
    this.clientaccoptions = {
      title: {
        text:" "
      },
      tooltip: {
          trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: datelist,
        axisTick: {
          show: false
       },
       axisLine:{
        show:false
    },
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false
       },
       axisLine:{
               show:false
           },
      },
      grid: {
         top: 28,
        left: 38,
        right: 38,
        height:350
        
      },
      series: [{
        data: data,
        type: 'line',
        itemStyle: {
          color: '#0091FF'
        },
        lineStyle: {
          normal:{
              width:4
          } 
        },
        symbolSize:10,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#5A99FF'
        }, {
            offset: 1,
            color: '#FFFFFF'
        }])
        }
      }]
    };

  }

  

}
