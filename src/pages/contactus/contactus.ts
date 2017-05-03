import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Commonques} from '../commonques/commonques';


@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class Contactus {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Contactus');
  }
  gocom(){
    this.navCtrl.push(Commonques);
  }

}
