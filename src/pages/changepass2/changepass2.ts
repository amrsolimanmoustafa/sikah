import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Changepass3} from "../changepass3/changepass3";


@Component({
  selector: 'page-changepass2',
  templateUrl: 'changepass2.html',
})
export class Changepass2 {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Changepass2');
  }
  newpass(){
    this.navCtrl.push(Changepass3);
  }

}
