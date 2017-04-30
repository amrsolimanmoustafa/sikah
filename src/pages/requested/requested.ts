import { Component } from '@angular/core';
import {GlobalService} from "../../providers/global-service";
import {NavController, AlertController, Platform} from 'ionic-angular';
import {Onway} from "../onway/onway";
import { DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';
import {HomePage} from "../home/home";
declare var google: any;
@Component({
  selector: 'page-requested',
  templateUrl: 'requested.html'
})
export class Requested {
  public start;
  public end;
  public timeLeft: number =120;
  public link : SafeResourceUrl;
  public urlen;
  public urlar;
  constructor(public navCtrl: NavController, public platform:Platform,private sanitizer: DomSanitizer,public alertCtrl: AlertController,public globalservice: GlobalService) {
   console.log(this.globalservice.orderid);
    this.urlen = sanitizer.bypassSecurityTrustResourceUrl('http://sikkh.com/ws/en/map/'+this.globalservice.orderid);
    this.urlar = sanitizer.bypassSecurityTrustResourceUrl('http://sikkh.com/ws/ar/map/'+this.globalservice.orderid);
    this.start = this.globalservice.address;
    this.end = this.globalservice.distination;
    console.log(this.end);
    console.log(this.start);
    var timer = setInterval(() => {
      if(this.timeLeft != 0) {
        this.timeLeft -=  1;
      } else {
        clearInterval(timer);
        console.log("the time finish");
        this.navCtrl.push(Onway)
      }
    }, 1000);
  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure you want to cancel ?',
      message: 'If you cancel 2 minute after requesting a fee may apply , for details visit www.sikkh.com.',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.navCtrl.setRoot(HomePage);
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        }
      ]
    });
    confirm.present();
  }
  ionViewDidLoad(){

/*
      this.calculateAndDisplayRoute();
*/

  }
 /* calculateAndDisplayRoute() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);
    directionsService.route({

      origin: "cairo",
      destination: "alexandria",
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }*/
}
