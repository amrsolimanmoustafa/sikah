import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Changepass1} from "../changepass1/changepass1";
import {Changelicense} from "../changelicense/changelicense";
@Component({
  selector: 'page-editaccount',
  templateUrl: 'editaccount.html',
})
export class Editaccount {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Editaccount');
  }
 enterold(){
   this.navCtrl.push(Changepass1);
 }
 golicennse(){
   this.navCtrl.push(Changelicense);
 }
}
