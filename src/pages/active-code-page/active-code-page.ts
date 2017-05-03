import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalService } from '../../providers/global-service';
import { NgForm } from '@angular/forms';
import { CustomToast } from '../../general-components/toast.component';
import {BeforeSignupPage} from "../before-signup/before-signup";
import {HomePage} from "../home/home";
import {Online} from "../online/online";
import {DriverHome} from "../driver-home/driver-home";
import {Lang} from "../lang/lang";
/*
 Generated class for the ActiveCodePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-active-code-page',
  templateUrl: 'active-code-page.html'
})
export class ActiveCodePagePage {
  private res ;
  public BeforeSignupPage = BeforeSignupPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private globalService :GlobalService ,
              private customToast : CustomToast ,
  ) {
    this.res = navParams.data;
    console.log(this.res);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActiveCodePagePage');
  }
  userConfirmation(code)
  {
    // driver 1
    // user 0
    if(this.res.type == 0)
    {
      this.userConfirm(code);
    }
    else
    {
      this.driverConfirm(code);
    }

  }

  userConfirm(code)
  {
    return this.globalService.userConfirmCode(this.res.user.userid,code).subscribe(
      (res) => {
        if(res.confirm == 1)
        {
          this.globalService.setUser(res);
          this.navCtrl.setRoot(HomePage);
        }
        else
        {
          console.log(res.error);
          this.customToast.toast(res.error);
        }

      }
    );
  }
  driverConfirm(code)
  {
    console.log("resid", this.res.driver.driverid);
    return this.globalService.driverConfirmCode(this.res.driver.driverid,code).subscribe(
      (driver) => {
        console.log("driver =>",driver)
        console.log(code)
        if(driver.confirm == 1)
        {
          console.log("in");
          console.log(driver);
          this.globalService.setDriver(driver);
          this.navCtrl.setRoot(Lang);
      /*    this.nativeStorage.setItem('driver', {driver: driver})
            .then(
              () => {
                this.globalService.driver = driver ;
                this.globalService.loggedIn = true ;
                this.navCtrl.setRoot(Online);
              },
              (error) => {
                this.customToast.toast('Error storing item');
              }
            );*/
          /*this.globalService.setUser(res);
           this.navCtrl.setRoot(DriverHomePage);*/
        }
        else
        {
          console.log(driver.error);
          this.customToast.toast(driver.error);
        }

      }
    );
  }
  userResendCode()
  {
    this.globalService.userResendCode(this.res.user).subscribe(
      (res)=>{
        this.customToast.toast('Code Is Sent');
        console.log(res);
      }
    );
  }
  driverResendCode()
  {
    this.globalService.driverResendCode(this.res.driver).subscribe(
      (res)=>{
        this.customToast.toast('Code Is Sent');
        console.log(res);
      }
    );
  }
  resendCode()
  {
    if(this.res.type == BeforeSignupPage.userType)
    {
      this.userResendCode();
    }
    else
    {
      this.driverResendCode();
    }
  }

}
