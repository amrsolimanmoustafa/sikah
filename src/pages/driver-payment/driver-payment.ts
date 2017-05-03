import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Done} from "../done/done";
import {Help} from "../help/help";
import {End} from "../end/end";
import {GlobalService} from "../../providers/global-service";

/**
 * Generated class for the DriverPayment page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-driver-payment',
  templateUrl: 'driver-payment.html',
})
export class DriverPayment {
  public val;
  constructor(public navCtrl: NavController,public globalservice: GlobalService,public navParams: NavParams) {
    this.val = navParams.get('value');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverPayment');
  }
  end(){
    this.navCtrl.push(Done);
  }
  help(){
    this.navCtrl.push(Help);
  }
  cont(){
    this.navCtrl.push(End);
  }
}
