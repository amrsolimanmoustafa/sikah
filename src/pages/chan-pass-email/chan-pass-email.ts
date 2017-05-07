import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ChanPassOld} from "../chan-pass-old/chan-pass-old";


@Component({
  selector: 'page-chan-pass-email',
  templateUrl: 'chan-pass-email.html',
})
export class ChanPassEmail {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChanPassEmail');
  }
gooldpass(){
  this.navCtrl.push(ChanPassOld);
}
}
