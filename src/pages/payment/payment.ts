import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {Help} from "../help/help";
import {Onway} from "../onway/onway";

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class Payment {
public cost;
  constructor(public navCtrl: NavController,public navParams: NavParams) {
    this.cost = navParams.get('cost');
  }
help(){
    this.navCtrl.push(Help);
}
follow(){
  this.navCtrl.push(Onway);
}
}
