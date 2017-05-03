import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {DriverIdPage} from "../driver-id/driver-id";

/*
  Generated class for the DriverCarNo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-driver-car-no',
  templateUrl: 'driver-car-no.html'
})
export class DriverCarNoPage {
  public user;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.data;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverCarNoPage');
  }
  goToDriverID(f:NgForm)
  {
    this.user.car_no = f.value.car_no;
    this.navCtrl.push(DriverIdPage,this.user);
  }
}
