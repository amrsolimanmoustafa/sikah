import {Component, OnInit, Input, NgZone} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {GlobalService} from "../../providers/global-service";
import {googlemaps} from 'googlemaps';
import {Geolocation} from "@ionic-native/geolocation";
import {Observable} from "rxjs";
import {Estimate} from "../estimate/estimate";
declare var google: any;
/*
  Generated class for the PlainMap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-plain-map',
  templateUrl: 'plain-map.html'
})
export class PlainMapPage implements OnInit {
  public destination: string = "";
  public isMapIdle: boolean;
  public map: google.maps.Map;
  @Input() lat = 1.65165; //default value initiation
  @Input() lng = 15.696963600000004; //default value initiation
  constructor(public navCtrl: NavController,public zone: NgZone , public geolocation: Geolocation,public globalService: GlobalService ,public loadingCtrl: LoadingController,public alertCtrl: AlertController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlainMapPage');
  }
  ngOnInit() {
    this.map = this.createMap();
    this.addMapEventListeners();
    this.getCurrentLocation().subscribe(location => {
      this.map.panTo(location);
      this.showPickupMarker(location);
    });
  }

  saveAddress() {
    let confirm = this.alertCtrl.create({
      title: this.globalService.language == 'en' ? 'Use this address ?' : 'استخدام هذا العنوان ؟',
      message: this.destination,
      buttons: [
        {
          text: this.globalService.language == 'en' ? 'No' : 'لا',
          handler: () => {
          }
        },
        {
          text: this.globalService.language == 'en' ? 'Yes' : 'نعم',

          handler: () => {
            this.globalService.address = this.destination;
            this.globalService.myMapsLat = this.lat;
            this.globalService.myMapsLng = this.lng;
            console.log(this.destination);
            this.navCtrl.push(Estimate);
          }
        }
      ]
    });
    confirm.present();
  }

  createMap() {
    let mapEle = document.getElementById('map');
    let map = new google.maps.Map(mapEle, {
      center: {
        "lat": 25.295142,
        "lng": 51.539365
      },
      zoom: 19
    });
    google.maps.event.addListenerOnce(map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.zone.run(() => {
        this.resizeMap();
      });
    });
    return map;
  }

  addMapEventListeners() {
    google.maps.event.addListener(this.map, 'click', (e)=> {
      console.log(e);
      this.isMapIdle = false;
      this.zone.run(() => {
        this.resizeMap();
      });
      console.log('click');
      this.showPickupMarker(e.latLng);
    });
  }
  resizeMap() {
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 200);
  }
  geocoder = new google.maps.Geocoder();
  infow = new google.maps.InfoWindow();

  geoCodeIT(latlng) {
    this.geocoder.geocode({'location': latlng}, (results, status) => {
      console.log(status);
      console.log(results);
      if (status == 'OK') {
        if (results[0]) {
          this.destination = results[0].formatted_address;
          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();
          console.log(this.lat + ' ' + this.lng);
          console.log(this.destination);
          this.showBalloon();
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }


  // sudo ionic plugin add cordova-plugin-geolocation

  getCurrentLocation(): any {
    let options = {timeout: 10000, enableHighAccuracy: true};
    let loading = this.loadingCtrl.create({
      content: 'Locating...'
    });
    loading.present();
    let locationObs = Observable.create(observable => {
      this.geolocation.getCurrentPosition(options).then(resp => {
          let lat = resp.coords.latitude;
          let lng = resp.coords.longitude;
          let location = new google.maps.LatLng(lat, lng);
          //3ak ?
          this.showPickupMarker(location);
          this.map.panTo(location);
          //EO3
          observable.next(location);
          loading.dismiss();
        }, (err) => {
          console.log('Gelocation err: ' + err);
          loading.dismiss();
        }
      )
    });
    return locationObs;
  }

  private popup: google.maps.InfoWindow;

  showBalloon() {
    this.popup = new google.maps.InfoWindow({
      content: (this.destination)
    });
    this.popup.open(this.map, this.pickupMarker);
    google.maps.event.addListener(this.pickupMarker, 'click', () => {
      this.popup.open(this.map, this.pickupMarker);
    });
  }

  // centerLocation(location) :any{
  //   this.removePickupMarker();
  //   if (location) {
  //     this.map.panTo(location)
  //   } else {
  //     this.getCurrentLocation().subscribe(currentLocation => {
  //       this.map.panTo(currentLocation);
  //     })
  //   }
  // }

  private pickupMarker: google.maps.Marker;

  showPickupMarker(latlng) {
    this.geoCodeIT(latlng);
    this.removePickupMarker();
    this.pickupMarker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      position: latlng
    });
    setTimeout(() => {
      this.pickupMarker.setAnimation(null);
    }, 750);
  }

  removePickupMarker() {
    if (this.pickupMarker) {
      this.infow.close();
      this.pickupMarker.setMap(null);
      this.pickupMarker = null;
    }
  }

}
