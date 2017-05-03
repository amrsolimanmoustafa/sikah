
import { NavController } from 'ionic-angular';
import {GlobalService} from "../../providers/global-service";
import {Payment} from "../payment/payment";
import {Onway} from "../onway/onway";
import { Component} from '@angular/core';
import { DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'page-arrived',
  templateUrl: 'arrived.html'
})
export class Arrived {
public user;
public orderid;
public payment;
public cost;
public map;
public link : SafeResourceUrl;
  constructor(public navCtrl: NavController , private globalservice : GlobalService,private sanitizer: DomSanitizer) {
    this.user = this.globalservice.user;
    console.log(this.user);
    console.log(this.globalservice.myLat)
/*
    this.map = this.link + this.globalservice.orderid;
*/
    this.map = sanitizer.bypassSecurityTrustResourceUrl('http://sikkh.com/ws/en/map/'+this.globalservice.orderid);
  }

sendCar(){
    this.user = this.globalservice.user.userid;
    this.orderid = this.globalservice.orderid;
    this.globalservice.postPayment(this.user,this.orderid).subscribe(
      data => {
        this.payment = data;
        console.log(this.payment);
        this.cost = this.payment.cost;
        this.globalservice.trip_time = this.payment.trip_time;
        this.navCtrl.push(Payment,{
          cost : this.cost,
          trip_time :this.payment.trip_time
        });
      }
      )
}
ride(){
  this.navCtrl.push(Onway);
}
}
