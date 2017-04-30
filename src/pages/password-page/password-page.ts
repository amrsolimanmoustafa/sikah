import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MobilePagePage } from '../mobile-page/mobile-page';
import {BeforeSignupPage} from "../before-signup/before-signup";
import {BeforeLoginPage} from "../before-login/before-login";
import {GlobalService} from "../../providers/global-service";
import {CustomToast} from "../../general-components/toast.component";
import {DriverCarNoPage} from "../driver-car-no/driver-car-no";
/*
  Generated class for the PasswordPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-password-page',
  templateUrl: 'password-page.html'
})
export class PasswordPagePage {
  public user;
  public BeforeLoginPage = BeforeLoginPage;
  public BeforeSignupPage = BeforeSignupPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private globalService:GlobalService,private customToast :CustomToast  ) {
    this.user = navParams.data;
    console.log(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPagePage');
  }
gotomobile(){
  // 0 determine user
  // 1 determine driver
  if(this.user.type == BeforeSignupPage.userType ||
      (this.user.type == BeforeSignupPage.driverType &&
      this.user.operation == BeforeLoginPage.loginCode ))
  {
    console.log(this.user.type);
    this.navCtrl.push(MobilePagePage,this.user);
  }
  else
  {
    this.navCtrl.push(DriverCarNoPage,this.user);
  }
}
forgetPassword()
{
  if(this.user.type == BeforeSignupPage.userType)
  {
    this.userForgetPassword();
  }
  else
  {
    this.driverForgetPassword();
  }
}
userForgetPassword()
{
  this.globalService.userForgetPassword(this.user).subscribe((res)=>{
    if(res.userid)
    {
      this.customToast.toast("Email Is Sent");
    }
    console.log(res);
  });
}
driverForgetPassword()
{
  this.globalService.driverForgetPassword(this.user).subscribe((res)=>{
    if(res.driversid)
    {
      this.customToast.toast("Email Is Sent");
    }
    console.log(res);
  });
}
}
