import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';
import {ActiveCodePagePage} from "../active-code-page/active-code-page";
import {GlobalService} from "../../providers/global-service";
import { CustomToast } from '../../general-components/toast.component';
import { BeforeSignupPage} from '../before-signup/before-signup';
import { BeforeLoginPage} from '../before-login/before-login';
import {HomePage} from "../home/home";
import {Online} from "../online/online";
import {DriverHome} from "../driver-home/driver-home";
import {Lang} from "../lang/lang";
/*
  Generated class for the MobilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mobile-page',
  templateUrl: 'mobile-page.html'
})
export class MobilePagePage {
  public user;
  public BeforeSignupPage = BeforeSignupPage ;
  public BeforeLoginPage = BeforeLoginPage ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private globalService : GlobalService,
              private customToast : CustomToast ,
              private loadingCtrl : LoadingController) {
        this.user = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MobilePagePage');
  }
  gotoactivecode(){
    // 1  for driver
    // 0 for user
    this.presentLoad();
    if(this.user.type == BeforeSignupPage.userType &&
        this.user.operation == BeforeLoginPage.signupCode)
    {
        this.userSignUp();
    }
    else if(this.user.type == BeforeSignupPage.userType &&
        this.user.operation == BeforeLoginPage.loginCode)
    {
        this.userLogin();
    }
    else if( this.user.type == BeforeSignupPage.driverType &&
        this.user.operation == BeforeLoginPage.signupCode )
    {
        this.driverSignUp();
    }
    else{
        this.driverLogin();
    }
  }
    presentLoad()
    {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 750
    });
    loader.present();
  }
    driverLogin()
    {
      this.user.gcm_regid = this.globalService.deviceToken;
      console.log("device token =>" , this.user.gcm_regid);
      this.globalService.driverLogin(this.user).subscribe(
        (driver)=>{
          if(driver.driverid)
          {
            this.globalService.driverWname = driver.first_name;
            this.customToast.toast("success driver login");
            //this.globalService.setUser(driver);
            this.globalService.setDriver(driver);
            this.globalService.loggedIn = true;
            this.navCtrl.setRoot(Lang);
           /* this.nativeStorage.setItem('driver', {driver: driver})
              .then(
                () => {
                  this.globalService.driver = driver ;
                  this.globalService.loggedIn = true ;
                  this.navCtrl.setRoot(DriverHomePage);
                }

                (error) => {
                  this.customToast.toast('Error storing item');
                }
              );
              */
          }
          else
          {
            this.customToast.toast(driver.error);
          }
        }
      );
    }
    userLogin()
    {
      this.user.gcm_regid = this.globalService.deviceToken;
      console.log("device token =>" , this.user.gcm_regid);
        this.globalService.userLogin(this.user).subscribe(
            (user)=>{
              console.log(user);
                if(user.userid)
                {
                    this.customToast.toast("success user login");
                    this.globalService.setUser(user);
                    this.navCtrl.setRoot(HomePage);
                    console.log(user);
                }
                else
                {
                    this.customToast.toast(user.error);
                }
            }
        );
    }
    userSignUp()
    {
    this.globalService.userSignUp(this.user).subscribe(
        (user)=>{
          if(user.userid)
          {
            this.navCtrl.push(ActiveCodePagePage,{user:user,type:BeforeSignupPage.userType});
          }
          else
          {
            this.customToast.toast(user.error);
          }
        }
    );
  }
    driverSignUp()
    {
    this.globalService.driverSignUp(this.user).subscribe(
        (driver)=>{
          console.log(driver)
          if(driver.driverid)
          {
            console.log("in");
            this.navCtrl.push(ActiveCodePagePage,{driver:driver,type:BeforeSignupPage.driverType});
          }
          else
          {
            console.log("out");
            this.customToast.toast(driver.error);
          }
        }
    );
  }



}
