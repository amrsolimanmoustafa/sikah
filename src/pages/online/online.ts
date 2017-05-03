import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {SafeResourceUrl, DomSanitizer} from "@angular/platform-browser";
import {GlobalService} from "../../providers/global-service";

@Component({
  selector: 'page-online',
  templateUrl: 'online.html'
})
export class Online {

  public link : SafeResourceUrl;
  public urlen;
  public urlar;
  public drivername;
  constructor(public navCtrl: NavController,public navParams: NavParams ,public globalservice: GlobalService,private sanitizer: DomSanitizer) {
    this.urlen = sanitizer.bypassSecurityTrustResourceUrl('http://sikkh.com/ws/en/map/driver/'+this.globalservice.myLat + "/" + this.globalservice.myLng);
    this.urlar = sanitizer.bypassSecurityTrustResourceUrl('http://sikkh.com/ws/ar/map/driver/'+this.globalservice.myLat + "/" + this.globalservice.myLng);
     this.drivername = navParams.get('drivername');
     console.log(this.drivername)
  }
}
