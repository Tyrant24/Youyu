import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { MainComponent } from '../main/main.component'; 

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [InstApi, MemberApi ]
})
export class SearchComponent extends AppBase {

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi, 
  ) {
    super(router, activeRoute, instApi, memberApi);

  }

  keyword = "";
  inputkeyword = "";
  humanlist = [];
  orderlist = [];

  onMyLoad() {
    this.params;
    if (this.params.key != undefined) {
      this.inputkeyword = this.params.key;
    }
  }

  onMyShow() {
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("search", "");
    }
    this.search();
  }
  tab = "human";
  search() {
    this.keyword = this.inputkeyword;
    if (this.keyword == "") {
      this.humanlist = [];
      this.orderlist = [];
      return;
    }
    
  }
}
