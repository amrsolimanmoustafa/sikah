import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
import {Online} from "../online/online";
import {GlobalService} from "../../providers/global-service";
import { DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';

/**
 * Generated class for the DriverHome page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-driver-home',
  templateUrl: 'driver-home.html',
})
export class DriverHome {
public on;

  public link : SafeResourceUrl;
  public urlen;
  public urlar;

  constructor(public navCtrl: NavController,public globalservice: GlobalService,private sanitizer: DomSanitizer) {
    this.urlen = sanitizer.bypassSecurityTrustResourceUrl('http://sikkh.com/ws/en/map/driver/'+this.globalservice.myLat + "/" + this.globalservice.myLng);
    this.urlar = sanitizer.bypassSecurityTrustResourceUrl('http://sikkh.com/ws/en/map/driver/'+this.globalservice.myLat + "/" + this.globalservice.myLng);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverHome');
  }
  online(){
    this.globalservice.postOnline(this.globalservice.driver.driverid).subscribe(
      data => {
        this.on = data;
        console.log(this.on)
        this.globalservice.driverWname = this.on.first_name;
        this.navCtrl.push(Online,{
          drivername: this.on.first_name
        });

      }
    )
  }
}
