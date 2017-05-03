import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {GlobalService} from "../../providers/global-service";
import {googlemaps} from 'googlemaps';
import {Geolocation} from "@ionic-native/geolocation";
import {Estimate} from "../estimate/estimate";
import { LocationAutocompleteComponent } from 'ng2-location-autocomplete/index';
import { LocationAutocompleteService } from 'ng2-location-autocomplete/index';
import {Location} from "../modals/location";
declare var google: any;
/*
 Generated class for the PlainMap page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'maps-page',
  templateUrl: 'mapspage.html'
})
export class MapsPage{
  location: Location;
    marker: Location;
    latitude;
    longitude;
 public address;
  constructor(public navCtrl: NavController,private viewCtrl : ViewController ,public globalservice: GlobalService  , public geolocation: Geolocation,public navParams: NavParams) {
      console.log("hello");

  }

  onSetMarker(event:any){
    console.log(event);
    this.marker = new Location(event.coords.lat, event.coords.lng);
    this.globalservice.savedlat = event.coords.lat;
    this.globalservice.savedlng =  event.coords.lng;
  }
onSave(){
/*
    this.viewCtrl.dismiss({location:this.marker});
*/
  this.globalservice.getaddress().subscribe(
    data=>{
      this.address = data.results[0].formatted_address;
      this.globalservice.distination = this.address;
      console.log(this.address);
        this.navCtrl.push(Estimate,{
          dist: this.address
        })
      this.distance();
    }
  )
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
        this.globalservice.distance = this.getdist.distance;
        this.globalservice.car_no = this.getdist.car_no;
        this.globalservice.driver_rate = this.getdist.rating;
        console.log("my distance",this.globalservice.distance);
      }
    )
  }

}
