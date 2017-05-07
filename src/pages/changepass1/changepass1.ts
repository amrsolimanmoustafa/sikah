import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Changepass2} from "../changepass2/changepass2";
import {ChanPassEmail} from "../chan-pass-email/chan-pass-email";



@Component({
  selector: 'page-changepass1',
  templateUrl: 'changepass1.html',
})
export class Changepass1 {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Changepass1');
  }
 
 change2(){
   this.navCtrl.push(Changepass2);
 }
 forget(){
   this.navCtrl.push(ChanPassEmail);
 }
}
