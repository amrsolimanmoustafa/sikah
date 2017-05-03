import { Component } from '@angular/core';

import {NavController, AlertController} from 'ionic-angular';
import {GlobalService} from "../../providers/global-service";
import {HomePage} from "../home/home";
@Component({
  selector: 'page-canceled',
  templateUrl: 'canceled.html'
})
export class Canceled {
  public reasons;
  radio:any;
  public message;
  public userid;
  public orderid;
  public thereason;
  constructor(public navCtrl: NavController, public globalservice:GlobalService,public alertCtrl:AlertController) {
    this.getResons();
  }
  getResons(){
    this.globalservice.getReasons().subscribe(
      data => {
        this.reasons = data;
        console.log(this.reasons);
      }
    )
  }
  send(){
    this.userid = this.globalservice.user.userid;
    this.orderid = this.globalservice.orderid;
    console.log(this.message);
    console.log("the value",this.kh);
    this.globalservice.postReasonUser(this.userid,this.orderid,this.kh,this.message).subscribe(
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
                  this.navCtrl.setRoot(HomePage);
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
