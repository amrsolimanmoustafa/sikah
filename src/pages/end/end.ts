import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SafeResourceUrl, DomSanitizer} from "@angular/platform-browser";
import {GlobalService} from "../../providers/global-service";
import {DriverCancel} from "../driver-cancel/driver-cancel";
import {NavigateTouser} from "../navigate-touser/navigate-touser";
import {DriverPayment} from "../driver-payment/driver-payment";
import {SMS} from "@ionic-native/sms";

/**
 * Generated class for the End page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-end',
  templateUrl: 'end.html',
})
export class End {
  public orderid;
  public driverid;
  public endtrip;
  public link : SafeResourceUrl;
  public url;
  public tr;
  constructor(public navCtrl: NavController,private sms: SMS, public navParams: NavParams,public globalservice: GlobalService,private sanitizer: DomSanitizer) {
    //TODO replace 159 with the orderid
    this.orderid = this.globalservice.driverOrderID;
    this.url = sanitizer.bypassSecurityTrustResourceUrl('http://sikkh.com/ws/en/map/driver/'+ this.globalservice.myLat + "/"+ this.globalservice.myLng+"/" +this.orderid);
  }
  cancel(){
    this.navCtrl.push(DriverCancel);
  }
  navigate(){
    this.navCtrl.push(NavigateTouser);
  }
  end(){
    this.driverid = this.globalservice.driver.driverid;
    this.orderid = this.globalservice.driverOrderID;
    this.globalservice.postDriverFinished(this.driverid,this.orderid).subscribe(
      data =>{
        this.endtrip = data;
        console.log(this.endtrip);
        this.navCtrl.push(DriverPayment);
      }
    )
  }
  sendsms(){
    console.log(this.globalservice.clientmobile);
    this.sms.send(this.globalservice.clientmobile, '');
  }
}
