import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {NavigateTouser} from "../navigate-touser/navigate-touser";

@Component({
  selector: 'page-starttrip',
  templateUrl: 'starttrip.html'
})
export class StartTrip {

  constructor(public navCtrl: NavController) {

  }
  navigate(){
    this.navCtrl.push(NavigateTouser);
  }
}
