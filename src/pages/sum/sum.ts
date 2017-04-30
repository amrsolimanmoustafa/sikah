import { DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';
import {NavController, AlertController} from 'ionic-angular';
import {GlobalService} from "../../providers/global-service";
import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Icon} from 'ionic-angular/components/icon/icon';
import {HomePage} from "../home/home";
import {CustomToast} from "../../general-components/toast.component";
import {Canceled} from "../canceled/canceled";
@Component({
  selector: 'page-sum',
  templateUrl: 'sum.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class Sum {
  public link : SafeResourceUrl;
  public url;
  public cost;
  public userid;
  public orderid;
  public rate;
  constructor(public navCtrl: NavController,public globalservice: GlobalService,private sanitizer: DomSanitizer,private alertCtrl : AlertController ) {
    this.url = sanitizer.bypassSecurityTrustResourceUrl('http://sikkh.com/ws/en/map/'+this.globalservice.orderid);
  }
  @Input() public score: number = 1;
  @Input() public max: number = 5;

  @Input() public iconEmpty: string = 'star-outline';
  @Input() public iconHalf: string = 'star-half';
  @Input() public iconFull: string = 'star';

  public update(index: number) {
    this.score = index;
    console.log(this.score);
    this.userid = this.globalservice.user.userid;
    this.orderid = this.globalservice.orderid;
    if(this.score == 5){
      let alert = this.alertCtrl.create({
        title: "Thanks",
        message: "thanks for using SIKKH",
        buttons: [
          {
            text: 'OK',
            handler: data => {
              this.globalservice.postUserRate(this.userid,this.orderid,this.score).subscribe(
                data => {
                  this.rate = data;
                  console.log(this.rate);
                }
              )
              this.navCtrl.setRoot(HomePage);
            }
          }
        ]
      });
      alert.present();
    }else {
      this.globalservice.postUserRate(this.userid,this.orderid,this.score).subscribe(
        data => {
          this.rate = data;
          console.log(this.rate);
        }
      )
      this.navCtrl.setRoot(Canceled);
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
