import { Component } from '@angular/core';

import {NavController, ModalController, NavParams} from 'ionic-angular';
import {WaitCnf} from "../waitcnf/waitcnf";
import {NavigateTouser} from "../navigate-touser/navigate-touser";
import {DriverCancel} from "../driver-cancel/driver-cancel";
import {EndTrip} from "../endtrip/endtrip";
import {GlobalService} from "../../providers/global-service";
import { SMS } from '@ionic-native/sms';
@Component({
  selector: 'page-clientwait',
  templateUrl: 'clientwait.html'
})
export class ClientWait {
public mobile;
public arrive;
  constructor(public navCtrl: NavController, public navParams:NavParams ,public globalservice : GlobalService,public modalCtrl : ModalController,private sms: SMS) {
   this.mobile = navParams.get('mob');
   this.globalservice.clientmobile = this.mobile;
    let contactModal = this.modalCtrl.create(WaitCnf);
    contactModal.present();
  }
  navigate(){
    this.navCtrl.push(NavigateTouser);
}
cancel(){
    this.navCtrl.push(DriverCancel);
}
start(){
this.globalservice.postArrived(this.globalservice.driver.driverid,this.globalservice.driverOrderID).subscribe(
  data => {
    this.arrive = data;
    this.navCtrl.push(EndTrip);
  }
)

}
sendsms(){
  console.log(this.mobile);
  this.sms.send(this.mobile, '');
}
}
