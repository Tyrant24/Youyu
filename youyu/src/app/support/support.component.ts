import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { ApiConfig } from '../api.config';
import { ContentApi } from 'src/providers/content.api';
import { AppUtil } from '../app.util';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  providers:[ContentApi]
})
export class SupportComponent  extends AppBase {
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
    public contentApi:ContentApi
  ) {
    super(router, activeRoute, instApi, memberApi);

    this.isLoginPage = true;
  }
  keycode="kehusupport";
  title="";
  content="";
  onMyLoad(){
    //this.keycode=this.params.keycode;
    this.contentApi.get({keycode:this.keycode}).then((content:any)=>{
      console.log(content);
      this.title=content.name;
      this.content=AppUtil.HtmlDecode( content.content);
    });
  }
  
  onMyShow() {
    
    if (MainComponent.Instance != null) {
      MainComponent.Instance.setModule("support", "");
    }
    
  }

}
