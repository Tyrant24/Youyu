import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';

declare let Chart: any;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers:[InstApi,MemberApi]
})
export class DetailComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi:InstApi,
    public memberApi:MemberApi,
  ) {
    super(router,activeRoute,instApi,memberApi);
    
   }
  
  ngOnInit(): void {
    Chart.aa();
  }

}
