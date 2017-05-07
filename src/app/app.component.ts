import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, AlertController} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Requested } from '../pages/requested/requested';
import { Onway } from '../pages/onway/onway';
import { Arrived } from '../pages/arrived/arrived';
import { Help } from '../pages/help/help';
import { Canceled } from '../pages/canceled/canceled';
import { Payment } from '../pages/payment/payment';
import { Sum } from '../pages/sum/sum';
import {BeforeSignupPage} from '../pages/before-signup/before-signup';
import {GlobalService} from "../providers/global-service";
import {Storage} from '@ionic/storage';
import {Lang} from "../pages/lang/lang";
import {Aboutsikkh} from "../pages/aboutsikkh/aboutsikkh";
import {Editaccount} from "../pages/editaccount/editaccount";
import {Clientcomments} from "../pages/clientcomments/clientcomments";
import {Fee} from "../pages/fee/fee";
import {HomePage} from "../pages/home/home";
import {Commonques} from "../pages/commonques/commonques";
import {Contactus} from "../pages/contactus/contactus";
import {History} from "../pages/history/history";
import {Inbox} from "../pages/inbox/inbox";
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import {DriverHome} from "../pages/driver-home/driver-home";
import {Online} from "../pages/online/online";
import {DriverCancel} from "../pages/driver-cancel/driver-cancel";
import {Countdown} from "../pages/countdown/countdown";
import { Geolocation } from '@ionic-native/geolocation';
import {DriverFeed} from "../pages/driverfeed/driverfeed";
import {ActiveCodePagePage} from "../pages/active-code-page/active-code-page";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public user;
  rootPage: any = Lang ;
  public driverLat;
  public driverLng;
  public driverOrderid;
  public driveG;
  pages: Array<{title: string, component: any}>;
  pageslogged: Array<{title: string, icon: string, component: any}>;
  driverPages: Array<{title: string, component: any}>;
  constructor(public platform: Platform,public alertCtrl: AlertController,public globalService : GlobalService,
              public storage: Storage,private geolocation: Geolocation, public splashscreen : SplashScreen, public statusBar : StatusBar , public push : Push) {
    this.storage.get('USERKey').then((res) => {
      if (res != null) {
        this.globalService.user = JSON.parse(res);
        console.log("user =>",this.globalService.user);
        this.globalService.loggedIn = true;
      }

    });
    this.storage.get('DriverKey').then((res) => {
      if(res != null){
        this.globalService.driver = JSON.parse(res);
        console.log("driver =>",this.globalService.driver);
        this.globalService.loggedIn = true;
      }
    })


    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
/*
      { title: 'Splash', component: Splash },
*/
      { title: 'Home', component: HomePage },
      { title: 'Help', component: Help },
      { title: 'Lang', component: Lang },
      { title: 'what is sikkh', component: Aboutsikkh },
      { title: 'Cancel My Trip', component: Canceled },
      { title: 'Inbox', component: Inbox},
      { title: 'History', component: History},
      { title: 'Contact Us ', component: Contactus },
      { title: 'Common Questions', component: Commonques },
      { title: 'Edit My Account', component: Editaccount },
      { title:'Pay a Fee', component:Fee},
      { title:'Client Comments', component:Clientcomments},
      

/*      { title: 'Cluster', component: Cluster},
*/
      { title: 'Sign-up', component: BeforeSignupPage },
      { title: 'Sign-Out', component: BeforeSignupPage },
    ];
    this.pageslogged = [
/*
      { title: 'Home', icon: 'home',component: HomePage },
*/
      { title: 'sign-In', icon: 'home',component: BeforeSignupPage },
      { title: 'sign-In', icon: 'home',component: DriverFeed },
      { title: 'Home', icon: 'home',component: HomePage },
      { title: 'Help',  icon: 'home',component: Help },
      { title: 'Lang', icon: 'home', component: Lang },


    ];
    this.driverPages = [
      {title: 'Home' , component: DriverHome},
      {title: 'Online' , component : Online},
      {title : 'driver_cancel', component : DriverCancel},
      { title: 'Lang', component: Lang },
      { title: 'Client Comments', component: Clientcomments },
      {title : 'countdown', component : Countdown},
      { title: 'Sign-up', component: BeforeSignupPage },
      { title: 'Sign-Out', component: BeforeSignupPage },
    ]

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.initPushNotification();
      this.splashscreen.hide();
    });
  }
  initPushNotification() {
   /* if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }*/
    const options: PushOptions = {
      android: {
        senderID: "333455780563"
      },
      ios: {
        alert: "true",
        badge: false,
        sound: "true"
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log("device token ->", data.registrationId);
      //TODO - send device token to server
      this.globalService.deviceToken = data.registrationId;
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('data', data);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              if(data.additionalData.type == "gps"){
                  this.driverOrderid = data.additionalData.orderid;
                  this.globalService.driverOrderID = data.additionalData.orderid;
                  console.log("driverOrderid => " , this.driverOrderid);
                  this.driverGps();
              }else if (data.additionalData.type == "confirm"){
                console.log("confirm arrived");
                this.nav.push(Countdown);
              }else if (data.additionalData.type == "confirmed"){
                this.nav.push(Requested);
              }else if (data.additionalData.type == "arrived"){
                this.nav.push(Arrived);
              }else if (data.additionalData.type == "finished"){
                this.nav.push(HomePage);
              }
              /*this.nav.push(Onway, {message: data.message});*/
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        if(this.globalService.user != null)
        this.nav.push(HomePage, {message: data.message});
        else this.nav.push(DriverHome, {message: data.message});
        console.log("Push notification clicked");
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
    driverGps(){
      this.geolocation.getCurrentPosition().then(resp => {
        this.driverLat = resp.coords.longitude;
        this.driverLng = resp.coords.latitude;
        console.log("lat", this.driverLat);
        console.log("lng", this.driverLng);
        if(this.driverLat && this.driverLng){
          console.log("orderid => ", this.driverOrderid);
          this.globalService.postGPS(this.driverOrderid,this.globalService.driver.driverid,this.driverLat,this.driverLng).subscribe(
            data => {
              this.driveG = data;
              this.globalService.roadDist = this.driveG.destination;
              this.globalService.fare = this.driveG.cost;
              console.log("driveG => ",this.driveG);
            }
          )
        }else {
          console.log("else");
        }
      }, (err) => {
        console.log('Geolocation err: ' + err);
        console.log(err);
      });
    }
  openPage(page) {

    /*if (this.globalService.loggedIn) {
     /!*this.user = this.globalService.user.username;*!/
     console.log(this.user)
     }*/
    if (page.title == 'Sign-Out') {
      this.globalService.logout();
      this.showAlert();
    } else {
      this.nav.push(page.component);
    }
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'logged out'
      /*/!*this.globalService.language == 'en' ? 'Logged out' : *!/'تسجيل الخروج'*/,
      subTitle:
      /*this.globalService.language == 'en' ? 'Logged out successfully!' : */'تم تسجيل الخروج بنجاح!',
      buttons: [/*this.globalService.language == 'en' ? 'OK' : */'حسناً']
    });
    alert.present();
  }
}
