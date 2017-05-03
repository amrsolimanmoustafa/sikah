import { Component } from '@angular/core';
import {ViewController, Platform, NavController} from 'ionic-angular';

@Component({
  templateUrl: 'waitcnf.html'
})

export class WaitCnf {
  public timeLeft: number =120;

  constructor(public viewCtrl: ViewController, public navCtrl:NavController ,public platform: Platform) {
    var timer = setInterval(() => {
      if(this.timeLeft != 0) {
        this.timeLeft -=  1;
      } else {
        clearInterval(timer);
        this.close();
      }
    }, 1000);
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
