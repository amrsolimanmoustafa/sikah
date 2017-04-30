import { Component } from '@angular/core';
import {NavController } from 'ionic-angular';
import {SafeResourceUrl, DomSanitizer} from "@angular/platform-browser";
import {GlobalService} from "../../providers/global-service";

/**
 * Generated class for the NavigateTouser page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-navigate-touser',
  templateUrl: 'navigate-touser.html',
})
export class NavigateTouser {
  public orderid;
  public link : SafeResourceUrl;
  public url;
  constructor(public navCtrl: NavController,public globalservice: GlobalService,private sanitizer: DomSanitizer) {
    //TODO replace 159 with the orderid
    this.orderid = this.globalservice.driverOrderID;
    this.url = sanitizer.bypassSecurityTrustResourceUrl('http://sikkh.com/ws/en/map/driver/'+ this.globalservice.myLat + "/"+ this.globalservice.myLng+"/" +this.orderid);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NavigateTouser');
  }

}
