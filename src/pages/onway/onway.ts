import { Component } from '@angular/core';
import { DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';
import { NavController } from 'ionic-angular';
import {GlobalService} from "../../providers/global-service";
declare var google;

@Component({
  selector: 'page-onway',
  templateUrl: 'onway.html'
})
export class Onway {
  public start;
  public end;
  public link : SafeResourceUrl;
  public urlen;
  public urlar;
  constructor(public navCtrl: NavController,public globalservice: GlobalService,private sanitizer: DomSanitizer) {
    this.urlen = sanitizer.bypassSecurityTrustResourceUrl('http://sikkh.com/ws/en/map/'+this.globalservice.orderid);
    this.urlar = sanitizer.bypassSecurityTrustResourceUrl('http://sikkh.com/ws/ar/map/'+this.globalservice.orderid);
  }

}
