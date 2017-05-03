import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Tripdetails} from '../tripdetails/tripdetails';


@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class History {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad History');
  }
  details(){
    this.navCtrl.push(Tripdetails);
  }
}
