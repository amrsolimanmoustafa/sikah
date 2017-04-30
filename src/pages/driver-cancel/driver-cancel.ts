import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {GlobalService} from "../../providers/global-service";
import {DriverHome} from "../driver-home/driver-home";

/**
 * Generated class for the DriverCancel page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-driver-cancel',
  templateUrl: 'driver-cancel.html',
})
export class DriverCancel {
  public reasons;
  radio:any;
  public message;
  public driverid;
  public orderid;
  public thereason;
    constructor(public navCtrl: NavController,public alertCtrl:AlertController ,public globalservice: GlobalService,public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverCancel');
    this.getreasons();
  }
  getreasons(){
    this.globalservice.getdriverReasons().subscribe(
      data => {
        this.reasons = data;
        console.log(this.reasons)
      }
    )
  }
  send(){
    this.driverid = this.globalservice.driver.driverid;
    this.orderid = this.globalservice.orderid;
    console.log("driverid",this.driverid);
    console.log("the value",this.kh);
    this.globalservice.postReasonDriver(this.driverid,this.orderid,this.kh,this.message).subscribe(
      data =>{
        this.thereason = data;
        if (data != null){
          let alert = this.alertCtrl.create({
            title: "Thanks",
            message: "thanks for using SIKKH , we will improve our treatment",
            buttons: [
              {
                text: 'OK',
                handler: data => {
                  this.navCtrl.setRoot(DriverHome);
                }
              }
            ]
          });
          alert.present();
        }
        console.log( "the response : ",this.thereason);
      }
    )
  }
  public kh;
  selected(value : string){
    this.kh = value;
    console.log(this.kh);
  }

}
