import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Changepass2} from "../changepass2/changepass2";

@Component({
  selector: 'page-chan-pass-old',
  templateUrl: 'chan-pass-old.html',
})
export class ChanPassOld {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChanPassOld');
  }
 gonew(){
   this.navCtrl.push(Changepass2);
 }
}
