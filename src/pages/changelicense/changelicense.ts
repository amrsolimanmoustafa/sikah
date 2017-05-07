import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Changephotos} from "../changephotos/changephotos";

@Component({
  selector: 'page-changelicense',
  templateUrl: 'changelicense.html',
})
export class Changelicense {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Changelicense');
  }

  gophotos(){
    this.navCtrl.push(Changephotos);
  }

}
