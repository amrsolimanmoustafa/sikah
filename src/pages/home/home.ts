import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import {  ActionSheetController, AlertController, App, LoadingController, NavController, Platform, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import {GlobalService} from "../../providers/global-service";
import {CustomToast} from "../../general-components/toast.component";

declare var google: any;
declare var MarkerClusterer: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;

  listSearch: string = '';
  public start;
  public end;
  map: any;
  marker: any;
  loading: any;
  search: boolean = true;
  found: boolean = false;
  request: boolean = false;
  mylist: boolean = false;
  locate: boolean = true;
  back: boolean = false;
  title:boolean = false;
  title1:boolean = true;
  menu:boolean = true;
  error: any;
  switch: string = "map";

  regionals: any = [];

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public app: App,
    public nav: NavController,
    public zone: NgZone,
    public platform: Platform,
    public alertCtrl: AlertController,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public geolocation: Geolocation,
    public globalservice: GlobalService,
    private customToast :CustomToast
  ) {
    this.platform.ready().then(() =>
      this.loadMaps());
    this.regionals = [{
      "title": "Marker 1",
      "latitude": this.globalservice.myLat,
      "longitude": this.globalservice.myLng,
    }];
  }


  loadMaps() {
    if (!!google) {
      this.initializeMap();
      this.initAutocomplete();
      this.getCurrentPosition();
      this.getaddres2();
    } else {
      this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.')
    }
  }

  errorAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.loadMaps();
          }
        }
      ]
    });
    alert.present();
  }

  mapsSearchBar(ev: any) {
    // set input to the value of the searchbar
    //this.search = ev.target.value;
    console.log(ev);
    const autocomplete = new google.maps.places.Autocomplete(ev);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          sub.next(place.geometry.location);
          sub.complete();
        }
      });
    });
  }

  initAutocomplete(): void {
    // reference : https://github.com/driftyco/ionic/issues/7223
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {
      console.log('Searchdata', location);

      let options = {
        center: location,
        zoom: 14
      };
      this.map.setOptions(options);
      this.addMarker(location, "Mein gesuchter Standort");

    });
  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          this.globalservice.savedlat = place.geometry.location.lat();
          this.globalservice.savedlng = place.geometry.location.lng();
          console.log('Search Lat', place.geometry.location.lat());
          console.log('Search Lng', place.geometry.location.lng());
          this.globalservice.getaddress().subscribe(
            data=>{
              this.address = data.results[0].formatted_address;
              this.globalservice.distination = this.address;
              console.log(this.address);
              this.calculateAndDisplayRoute();
              this.distance();
            });
          sub.next(place.geometry.location);
          //sub.complete();
          this.found = true;
          }
      });
    });
  }
  public address;
  public address2;
  getaddres2(){
    this.globalservice.getaddress2().subscribe(
      data => {
        this.address2 = data.results[0].formatted_address;
        this.globalservice.address = this.address2;
        console.log(this.address2);
      }
    )
  }
  calculateAndDisplayRoute() {

      this.globalservice.getaddress2().subscribe(
        data => {
          this.address2 = data.results[0].formatted_address;
          this.globalservice.address = this.address2;
          console.log(this.address2);
        }
      )
    this.globalservice.getaddress().subscribe(
      data=>{
        this.address = data.results[0].formatted_address;
        this.globalservice.distination = this.address;
        console.log(this.address);
      }
    )
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);
      this.start = this.address2;
      this.end = this.address;
    directionsService.route({

      origin: this.address2,
      destination: this.address,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
    this.found = false;
    this.request = true;
    this.search = false;
    this.mylist = true;
    this.locate = false;
    this.back = true;
    this.title = true;
    this.title1 = false;
    this.menu = true;
/*
    this.distance();
*/
  }
  goback(){
    this.nav.setRoot(HomePage);
  }
  public mapOrder : any;
  order(){

      let toast = this.toastCtrl.create({
        message: "your order in progress waiting a driver for confirm",
        duration: 120000
      });
      toast.present();

  }
/*
    this.customToast.toast("your order in progress waiting a driver for confirm");
*/

  saveAddress() {
    this.globalservice.getaddress().subscribe(
      data=>{
        this.address = data.results[0].formatted_address;
        this.globalservice.distination = this.address;
        console.log(this.address);
      }
    )
    let alert = this.alertCtrl.create({
      title: 'Location',
      message: 'Do you want to save the Location?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            console.log("went to estmation page");
           this.calculateAndDisplayRoute();
           this.distance();
          }
        }
      ]
    });
    alert.present();
  }
  initializeMap() {
    this.zone.run(() => {
      var mapEle = this.mapElement.nativeElement;
      console.log("service", this.globalservice.myLat);
      this.map = new google.maps.Map(mapEle, {
        zoom: 10,
        center: { lat: this.globalservice.myLat, lng: this.globalservice.myLng },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
        disableDoubleClickZoom: false,
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
      });

      let markers = [];
      for (let regional of this.regionals) {
        regional.distance = 0;
        regional.visible = false;
        regional.current = false;

        let markerData = {
          position: {
            lat: regional.latitude,
            lng: regional.longitude
          },
          map: this.map,
          title: regional.title,
        };

        regional.marker = new google.maps.Marker(markerData);
        markers.push(regional.marker);

        regional.marker.addListener('click', () => {
          for (let c of this.regionals) {
            c.current = false;
            //c.infoWindow.close();
          }

          //regional.infoWindow.open(this.map, regional.marker);
          this.map.panTo(regional.marker.getPosition());
        });
      }

      new MarkerClusterer(this.map, markers, {
        styles: [
          {
            height: 53,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 53,
            textColor: '#fff'
          },
          {
            height: 56,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 56,
            textColor: '#fff'
          },
          {
            height: 66,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 66,
            textColor: '#fff'
          },
          {
            height: 78,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 78,
            textColor: '#fff'
          },
          {
            height: 90,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 90,
            textColor: '#fff'
          }
        ]
      });




      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        google.maps.event.trigger(this.map, 'resize');
        mapEle.classList.add('show-map');
        this.bounceMap(markers);
/*
        this.getCurrentPositionfromStorage(markers)
*/
      });

      google.maps.event.addListener(this.map, 'bounds_changed', () => {
        this.zone.run(() => {
          this.resizeMap();
        });
      });


    });
  }

  //Center zoom
  //http://stackoverflow.com/questions/19304574/center-set-zoom-of-map-to-cover-all-visible-markers
  bounceMap(markers) {
    let bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }

    this.map.fitBounds(bounds);
  }

  resizeMap() {
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 200);
  }


  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  choosePosition() {
     this.getCurrentPosition();

  }

  // go show currrent location
  getCurrentPosition() {
    this.loading = this.loadingCtrl.create({
      content: 'Searching Location ...'
    });
    this.loading.present();

    let locationOptions = { timeout: 10000, enableHighAccuracy: true };

    this.geolocation.getCurrentPosition(locationOptions).then(
      (position) => {
        this.loading.dismiss().then(() => {

          this.showToast('Location found!');

          console.log(position.coords.latitude, position.coords.longitude);
          let myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          let options = {
            center: myPos,
            zoom: 14
          };
          this.map.setOptions(options);
          this.addMarker(myPos, "you are here!");

        });
      },
      (error) => {
        this.loading.dismiss().then(() => {
          this.showToast('Location not found. Please enable your GPS!');

          console.log(error);
        });
      }
    )
  }

  toggleSearch() {
    if (this.search) {
      this.search = false;
    } else {
      this.search = true;
    }
  }

  addMarker(position, content) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position
    });

    this.addInfoWindow(marker, content);
    return marker;
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
  public getdist;
  public user;
  public origin;
  public origin_latitude;
  public  origin_longitude;
  public destination;
  public destination_latitude;
  public destination_longitude;
  public cost;
  public dist;
  public distancee;
  distance(){
    this.user = this.globalservice.user.userid;
    this.origin = this.globalservice.address;
    this.origin_latitude = this.globalservice.myLat;
    this.origin_longitude = this.globalservice.myLng;
    this.destination = this.address;
    console.log("my add",this.address);
    console.log("ddddd", this.globalservice.distination);
    this.destination_latitude = this.globalservice.savedlat;
    this.destination_longitude = this.globalservice.savedlng;

    this.globalservice.postUserOrder(this.user,this.origin,this.origin_latitude,this.origin_longitude,this.destination, this.destination_latitude,this.destination_longitude).subscribe(
      data => {
        this.getdist = data;
        console.log("post request",this.getdist);
        this.cost = this.getdist.cost;
        this.globalservice.cost= this.cost;
        this.distancee = this.getdist.distance;
        this.globalservice.origin = this.getdist.origin;
        this.globalservice.distance = this.getdist.distance;
        this.globalservice.car_no = this.getdist.car_no;
        this.globalservice.driver_rate = this.getdist.rating;
        this.globalservice.orderid = this.getdist.orderid;
        this.globalservice.drivername = this.getdist.driver;
        this.globalservice.drivermobile = this.getdist.driver_mobile;
        console.log("my distance",this.globalservice.distance);
      }
    )
  }
}
