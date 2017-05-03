import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import {Storage} from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import {Platform} from "ionic-angular";
import {TranslateService} from "ng2-translate";

/*
  Generated class for the GlobalService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GlobalService {
    public loggedIn: boolean = false;
    public user: any;
    public myLat = 0.0;
    public myLng = 0.0;
    public myMapsLat;
    public myMapsLng;
    public savedlat;
    public savedlng;
    public saveCurrentLat;
    public saveCurrentLng;
    public distination = "";
    public address = "";
    public language = 'en';
    public cost = "";
    public distance = "";
    public car_no;
    public driver_rate;
    public deviceToken;
    public orderid;
    public drivername;
    public drivermobile;
    public origin;
    public trip_time;
    public driver;
    public driverWname;
    public driverOrderID;
    public roadDist;
    public clientmobile;
    public user_name;
    public fare;
    public userSignUp_url : string = "http://sikkh.com/ws/signup/user";
  public userConfirmCode_url : string = "http://sikkh.com/ws/confirm/user";
  public driverSignUp_url : string = "http://sikkh.com/ws/signup/driver";
  public driverConfirmCode_url : string = "http://sikkh.com/ws/confirm/driver" ;
  public userLogin_url : string = "http://sikkh.com/ws/login/user";
  public driverLogin_url : string = "http://sikkh.com/ws/login/driver";
  public userResendCode_url : string ="http://sikkh.com/ws/resend/code";
  public driverResendCode_url :string = "http://sikkh.com/ws/resend/driver";
  public userForgetPassword_url :string ="http://sikkh.com/ws/forgetpassword/user";
  public driverForgetPassword_url :string ="http://sikkh.com/ws/forgetpassword/driver";

  //TODO khaled api urls
  public getFormattedAddress : string = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
  public getFormattedAdress2 : string = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
  public requestOrder : string = "http://sikkh.com/ws/orders";
  public help : string = "http://sikkh.com/ws/help";
  public helpDriver : string = "http://sikkh.com/ws/help/driver";
  public payment: string = "http://sikkh.com/ws/billing";
  public cancelReson_en = "http://sikkh.com/ws/en/reasons";
  public cancelReson_ar = "http://sikkh.com/ws/ar/reasons";
  public map_order_en = "http://sikkh.com/ws/en/map";
  public followUpMyCar : string = "http://sikkh.com/ws/follow";
  public userRate: string = "http://sikkh.com/ws/rating";
  public postCancelReason:string = "http://sikkh.com/ws/cancel/trip/";
  public driver_online : string = "http://sikkh.com/ws/online/driver";
  public driver_cancel_en :string = "http://sikkh.com/ws/en/reasons/driver";
  public driver_cancel_ar : string = "http://sikkh.com/ws/ar/reasons/driver";
  public postCancelReasonsDriver : string = "http://sikkh.com/ws/cancel/driver";
  public driver_confirm_order : string = "http://sikkh.com/ws/confirm/order";
  public driver_finish_trip : string = "http://sikkh.com/ws/finish/driver";
  public driver_gps : string = "http://sikkh.com/ws/gps";
  public driver_arrived : string = "http://sikkh.com/ws/arrived/driver";
    constructor(public http: Http, public translate: TranslateService, public storage: Storage,
                public platform: Platform, private geolocation: Geolocation) {
     console.log('Hello GlobalService Provider');
        this.mylocation();
    }
    //user-api TODO khaled apies
    getaddress(){
       return this.http.get(this.getFormattedAddress + this.savedlat + ',' + this.savedlng).map(res => res.json());
    }
    getaddress2(){
      return this.http.get(this.getFormattedAdress2 + this.myLat + ',' + this.myLng).map(res => res.json());
    }
    mylocation(){
        this.geolocation.getCurrentPosition().then(resp => {
            this.myLng = resp.coords.longitude;
            this.myLat = resp.coords.latitude;
            console.log("lat", this.myLat);
            console.log("lng", this.myLng);

        }, (err) => {
            console.log('Geolocation err: ' + err);
            console.log(err);
        });
    }
    postUserOrder(userid,origin,origin_latitude,origin_longitude,destination,destination_latitude,destination_longitude){
      console.log(userid);
      let body = JSON.stringify({
        "userid" : userid,
        "origin" : origin,
        "origin_latitude": origin_latitude,
        "origin_longitude" : origin_longitude,
        "destination" : destination,
        "destination_latitude" : destination_latitude,
        "destination_longitude" : destination_longitude,
        "driverid" : 1
      });
      console.log(body);
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers, method: "post"});
      return this.http.post(this.requestOrder, body ,options )
        .map(res => res.json()
        );
    }
    postHelpComeents(orderid,comment){
      let body = JSON.stringify({
        "userid" : this.user.userid,
        "orderid" : orderid,
        "comment" : comment
      });
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers, method: "post"});
      return this.http.post(this.help, body ,options )
        .map(res => res.json()
        );
    }
  postHelpDriver(orderid,comment){
    let body = JSON.stringify({
      "driverid" : this.driver.driverid,
      "orderid" : orderid,
      "comment" : comment
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.helpDriver, body ,options )
      .map(res => res.json()
      );
  }
    postPayment(userid,orderid){
      let body = JSON.stringify({
        "userid" : userid,
        "orderid" : orderid
      });
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers, method: "post"});
      return this.http.post(this.payment, body ,options )
        .map(res => res.json()
        );
    }
    postUserRate(userid,orderid,rate){
      let body = JSON.stringify({
        "userid" : userid,
        "orderid" : orderid,
        "rate" : rate
      });
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers, method: "post"});
      return this.http.post(this.userRate, body ,options )
        .map(res => res.json()
        );
    }
    postFollowUp(userid,orderid){
      let body = JSON.stringify({
        "userid" : userid,
        "orderid" : orderid
      });
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers, method: "post"});
      return this.http.post(this.followUpMyCar, body ,options )
        .map(res => res.json()
        );
    }
    postReasonUser(userid,orderid,reasonid,cancel_message){
      let body = JSON.stringify({
        "userid" : userid,
        "orderid" : orderid,
        "reasonid" : reasonid,
        "cancel_message" : cancel_message
      });
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers, method: "post"});
      return this.http.post(this.postCancelReason, body ,options )
        .map(res => res.json()
        );
    }
    postMap(){
      console.log(this.orderid);

      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers, method: "post"});
      return this.http.post(this.map_order_en + "/" + this.orderid,options )
        .map(res => res.json()
        );
    }
    postOnline(driverid){
      let body = JSON.stringify({
        "driverid" : driverid,
        "online" : 1,

      });
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers, method: "post"});
      return this.http.post(this.driver_online, body ,options )
        .map(res => res.json()
        );
    }
    postOffline(driverid){
      let body = JSON.stringify({
        "driverid" : driverid,
        "online" : 0,

      });
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers, method: "post"});
      return this.http.post(this.driver_online, body ,options )
        .map(res => res.json()
        );
    }

  postReasonDriver(driverid,orderid,reasonid,cancel_message){
    let body = JSON.stringify({
      "driverid" : driverid,
      "orderid" : orderid,
      "reasonid" : reasonid,
      "cancel_message" : cancel_message
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.postCancelReason, body ,options )
      .map(res => res.json()
      );
  }
  postArrived(driverid,orderid){
    let body = JSON.stringify({
      "driverid" : driverid,
      "orderid" : orderid
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.driver_arrived, body ,options )
      .map(res => res.json()
      );
  }
  postConfirmOrderDriver(driverid,orderid){
    let body = JSON.stringify({
      "driverid" : driverid,
      "orderid" : orderid
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.driver_confirm_order, body ,options )
      .map(res => res.json()
      );
  }
  postDriverFinished(driverid,orderid){
    let body = JSON.stringify({
      "driverid" : driverid,
      "orderid" : orderid
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.driver_finish_trip, body ,options )
      .map(res => res.json()
      );
  }
  postGPS(orderid,driverid,latitude,longitude){
    let body = JSON.stringify({
      "orderid" : orderid,
      "driverid" : driverid,
      "latitude" : latitude,
      "longitude" : longitude
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers, method: "post"});
    return this.http.post(this.driver_gps, body ,options )
      .map(res => res.json()
      );
  }





    getReasons(){
      return this.http.get(this.language == 'en' ? this.cancelReson_en : this.cancelReson_ar).map(res => res.json());
    }
    getdriverReasons(){
      return this.http.get(this.language == 'en' ? this.driver_cancel_en : this.driver_cancel_ar).map(res => res.json());
    }

    getDefaultLang() {
    return this.storage.get("LANGKey");
     }
    setDefaultLang(language) {
    this.language = language;
    this.storage.set("LANGKey", language);
    console.log(language);
    language == 'en' ? this.english() : this.arabic();
   }
    english() {
    this.language = 'en';
    this.translate.use('en');
    this.platform.setDir('ltr', true);
   }

    arabic() {
    this.language = 'ar';
    this.translate.use('ar');
    this.platform.setDir('rtl', true);
   }











  //the end of khaled work




    userForgetPassword(user:any)
    {
        let body = {
            'email' : user.email
        }
    return this.http.post(this.userForgetPassword_url,body).map((res) => res.json());

    }
    driverForgetPassword(user:any)
    {
        let body = {
            'email' : user.email
        }
      return this.http.post(this.driverForgetPassword_url,body).map((res) => res.json());
    }
    userResendCode(user :any)
    {
        return this.http.post(this.userResendCode_url,user).map((res) => res.json());
    }
    driverResendCode(driver :any)
    {
        return this.http.post(this.driverResendCode_url,driver).map((res) => res.json());
    }
    userLogin(user: any)
    {
        return this.http.post(this.userLogin_url,user).map((res) => res.json());
    }
    driverLogin(driver: any)
    {
        return this.http.post(this.driverLogin_url,driver).map((res) => res.json());
    }
    userSignUp(user: any)
    {
       return this.http.post(this.userSignUp_url,user).map((res) => res.json());
    }
    driverSignUp(driver:any)
    {
       return this.http.post(this.driverSignUp_url,driver).map((res) => res.json());
    }
    driverConfirmCode(driverid: any,code: any)
    {
      var driverData = {
          code : code,
          driverid : driverid
      };
      return this.http.post(this.driverConfirmCode_url,driverData).map((res) => res.json());
    }
    userConfirmCode(userid: any,code: any)
    {
          var userData = {
              code : code,
              userid : userid
    };
  return this.http.post(this.userConfirmCode_url,userData).map((res) => res.json());
}
    setUser(user: any) {
        this.loggedIn = true;
        this.storage.set("USERKey", JSON.stringify(user));
        this.user = user;
        console.log(user);

    }

    getUser() {
        return this.storage.get("USERKey");
    }
  setDriver(driver: any) {
    this.loggedIn = true;
    this.storage.set("DriverKey", JSON.stringify(driver));
    this.driver = driver;
    console.log(driver);

  }

  getDriver() {
    return this.storage.get("DriverKey");
  }
    logout() {
        this.loggedIn = false;
        this.storage.set("USERKey", null);
        this.storage.set("DriverKey",null);
    }


}








