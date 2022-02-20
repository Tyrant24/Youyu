import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { ListComponent } from '../list/list.component';
import { DetailComponent } from '../detail/detail.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import { UploadComponent } from '../upload/upload.component';
import { SupportComponent } from '../support/support.component'; 
import { SearchComponent } from '../search/search.component'; 
import { OrderlistComponent } from '../orderlist/orderlist.component';
import { SimcardComponent } from '../simcard/simcard.component';
import { AgentlistComponent } from '../agentlist/agentlist.component';
import { AddagentComponent } from '../addagent/addagent.component';
import { CreatorderComponent } from '../creatorder/creatorder.component';
import { RechargelistComponent } from '../rechargelist/rechargelist.component';
import { QueryComponent } from '../query/query.component';
import { RechargeOrderComponent } from '../recharge-order/recharge-order.component';
import { ApplicationComponent } from '../application/application.component';
import { MemberlistComponent } from '../memberlist/memberlist.component';
import { AddshenqingComponent } from '../addshenqing/addshenqing.component';
import { PackagelistComponent } from '../packagelist/packagelist.component';
import { CreatRechargeOrderComponent } from '../creat-recharge-order/creat-recharge-order.component';
import { AppealComponent } from '../appeal/appeal.component';
import { AppeallistComponent } from '../appeallist/appeallist.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { WendangComponent } from '../wendang/wendang.component';
import { Wendang2Component } from '../wendang2/wendang2.component';
import { Wendang3Component } from '../wendang3/wendang3.component';
import { Wendang4Component } from '../wendang4/wendang4.component';
import { Wendang5Component } from '../wendang5/wendang5.component';
import { Wendang6Component } from '../wendang6/wendang6.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: "", component: DashboardComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "list", component: ListComponent },
      { path: "detail", component: DetailComponent },
      { path: "upload", component: UploadComponent },
      { path: "404", component: NotfoundComponent }, 
      { path: "support", component: SupportComponent },
      { path: "search", component: SearchComponent }, 
      { path: "orderlist", component: OrderlistComponent }, 
      { path: "simcard", component: SimcardComponent }, 
      { path: "agentlist", component: AgentlistComponent }, 
      { path: "addagent", component: AddagentComponent }, 
      { path: "creatorder", component: CreatorderComponent }, 
      { path: "rechargelist", component: RechargelistComponent }, 
      { path: "recharge-order", component: RechargeOrderComponent }, 
      { path: "query", component: QueryComponent },
      { path: "application", component: ApplicationComponent },
      { path: "memberlist", component: MemberlistComponent },
      { path: "addshenqing", component: AddshenqingComponent },
      { path: "packagelist", component: PackagelistComponent },
      { path: "creatrechargeorder", component: CreatRechargeOrderComponent },
      { path: "appeal", component: AppealComponent },
      { path: "appeallist", component: AppeallistComponent },
      { path: "resetpassword", component: ResetPasswordComponent },
      { path: "wendang", component: WendangComponent },
      { path: "wendang2", component: Wendang2Component },
      { path: "wendang3", component: Wendang3Component },
      { path: "wendang4", component: Wendang4Component },
      { path: "wendang5", component: Wendang5Component },
      { path: "wendang6", component: Wendang6Component },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
