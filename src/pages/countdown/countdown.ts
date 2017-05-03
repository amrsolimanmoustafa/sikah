import { Component } from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {GlobalService} from "../../providers/global-service";
import {DriverHome} from "../driver-home/driver-home";
import {ClientWait} from "../clientwait/clientwait";
import {WaitCnf} from "../waitcnf/waitcnf";

@Component({
  selector: 'page-countdown',
  templateUrl: 'countdown.html'
})
export class Countdown {
  public timeLeft: number =15;
  public dont : boolean = true;
  public orderid;
  public conf;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public globalservice: GlobalService) {
    var timer = setInterval(() => {
      if(this.timeLeft != 0) {
        this.timeLeft -=  1;
      } else if(this.dont !=false) {
        clearInterval(timer);
        this.navCtrl.push(DriverHome)
      }
    }, 1000);
  }
  confirm(){
    console.log("confirm")
    this.dont = false;
    this.orderid = this.globalservice.driverOrderID;
    console.log("orderid : ",this.orderid);
    this.globalservice.postConfirmOrderDriver(this.globalservice.driver.driverid,this.orderid).subscribe(
      data =>{
        this.conf = data;
        console.log(this.conf);
        this.globalservice.user_name = this.conf.user_name;
        this.navCtrl.push(ClientWait,{
          mob : this.conf.user_mobile
        })
      }
    )
  }
  /*presentContactModal() {
    this.dont = false;
    this.globalservice.postConfirmOrderDriver(this.globalservice.driver.driverid,this.orderid).subscribe(
      data =>{
        this.conf = data;
        console.log(this.conf);
        let contactModal = this.modalCtrl.create(WaitCnf);
        contactModal.present();
      }
    )

  }*/
}
