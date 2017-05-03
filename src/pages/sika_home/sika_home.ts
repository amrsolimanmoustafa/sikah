import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController , ModalController } from 'ionic-angular';
import {GlobalService} from "../../providers/global-service";
import {Cluster} from "../cluster-map/cluster";
import {HomePage} from "../home/home";
declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Sika_home {
  public lat = 0.0;
  public lng = 0.0;
  /* map: any;
   infowindow = [];*/
  public user;
  public address;

  constructor(public navCtrl: NavController, public globalservice: GlobalService, private geolocation: Geolocation,public modalCtrl:ModalController) {
    this.user = this.globalservice.user;
    console.log(this.globalservice.user);
    this.getaddres2();
  }

  ionViewDidLoad() {
  }


  openMap() {
    this.navCtrl.push(HomePage);
/*const modal = this.modalCtrl.create(MapsPage);
  modal.present();*/
  }
      getaddres2(){
    this.globalservice.getaddress2().subscribe(
      data => {
        this.address = data.results[0].formatted_address;
        this.globalservice.address = this.address;
        console.log(this.address);
      }
    )
      }

     initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 6
      });
     var infoWindow = new google.maps.InfoWindow;

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.globalservice.saveCurrentLat = position.coords.latitude;
          this.globalservice.saveCurrentLng = position.coords.longitude;
          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(pos);
        }, function () {
          this.handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false, infoWindow, map.getCenter());
      }
    }

     handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open();
    }

}
