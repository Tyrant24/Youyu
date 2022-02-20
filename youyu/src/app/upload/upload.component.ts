import { Component, OnInit,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AppBase } from '../AppBase';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent extends AppBase {
  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public instApi: InstApi,
    public memberApi: MemberApi,
  ) {
    super(router, activeRoute, instApi, memberApi);


  }
  
  
  onMyLoad() {
    this.params;
  }
  onMyShow() {
    
  }
  filelist=[];
  afterupload(e){
    //https://ng.ant.design/docs/getting-started/zh
    if(e.type=="success"){
      this.filelist.push(e.file.response.result);
    }
  }
}
