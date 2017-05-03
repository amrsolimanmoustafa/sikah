import {Component, ChangeDetectionStrategy,Input} from '@angular/core';

import {NavController, AlertController} from 'ionic-angular';
import {GlobalService} from "../../providers/global-service";
import {DriverHome} from "../driver-home/driver-home";
import {Help} from "../help/help";
import {DriverFeed} from "../driverfeed/driverfeed";
import {Online} from "../online/online";

@Component({
  selector: 'page-done',
  templateUrl: 'done.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Done {
public off;
  constructor(public navCtrl: NavController, public alertCtrl : AlertController, public globalservice : GlobalService) {

  }
offline(){
    this.globalservice.postOffline(this.globalservice.driver.driverid).subscribe(
      data =>{
        this.off = data;
        console.log(this.off);
        this.navCtrl.setRoot(DriverHome);
      }
    )
}
help(){
  this.navCtrl.push(Help);
}
  @Input() public score: number = 1;
  @Input() public max: number = 5;

  @Input() public iconEmpty: string = 'star-outline';
  @Input() public iconHalf: string = 'star-half';
  @Input() public iconFull: string = 'star';
  public driverid;
  public orderid;
  public rate;
  public update(index: number) {
    this.score = index;
    console.log(this.score);
    this.driverid = this.globalservice.driver.driverid;
    this.orderid = this.globalservice.orderid;
    if(this.score == 5){
      let alert = this.alertCtrl.create({
        title: "Thanks",
        message: "thanks for using SIKKH",
        buttons: [
          {
            text: 'OK',
            handler: data => {
              this.globalservice.postUserRate(this.driverid,this.orderid,this.score).subscribe(
                data => {
                  this.rate = data;
                  console.log(this.rate);
                }
              )
              this.navCtrl.setRoot(Online);
            }
          }
        ]
      });
      alert.present();
    }else {
      this.globalservice.postUserRate(this.driverid,this.orderid,this.score).subscribe(
        data => {
          this.rate = data;
          console.log(this.rate);
        }
      )
      this.navCtrl.push(DriverFeed);
    }
  }

  public icons(): string[] {
    let step = 0.5;
    let score = Math.ceil(this.score / step) * step;

    let icons = [];
    for (let i = 1; i <= this.max; i++) {
      if (i <= score) {
        icons.push(this.iconFull);
      } else if (i - step <= score) {
        icons.push(this.iconHalf);
      } else {
        icons.push(this.iconEmpty);
      }
    }
    return icons;
  }
}
