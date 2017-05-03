import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {GlobalService} from "../../providers/global-service";
import {Requested} from "../requested/requested";
declare var google;
@Component({
  selector: 'page-estimate',
  templateUrl: 'estimate.html'
})
export class Estimate {
  public start;
  public end;
 public distination;
 public cost;
 public distance;
 public address;
  constructor(public navCtrl: NavController,public globalservice: GlobalService,public navParams: NavParams) {
     this.start = this.globalservice.address;
    this.distination = this.navParams.get('dist');
    this.end = this.distination;
   this.distance = this.globalservice.distance;
     this.cost = this.navParams.get('cost');
     console.log(this.globalservice.cost);
     console.log(this.distination)
  }

  ionViewDidLoad(){
      this.calculateAndDisplayRoute();
  }

  calculateAndDisplayRoute() {

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);

    directionsService.route({

      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
}
  request(){
    this.navCtrl.push(Requested);
  }
}
