import { Component } from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {NavController, LoadingController} from 'ionic-angular';
import {BeforeSignupPage} from "../before-signup/before-signup";
import {GlobalService} from "../../providers/global-service";
import {HomePage} from "../home/home";
import {DriverHome} from "../driver-home/driver-home";
import {Home} from "../../../Sikkh/src/pages/home/home";

@Component({
  selector: 'page-lang',
  templateUrl: 'lang.html'
})
export class Lang {
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public translate: TranslateService,private globalService : GlobalService) {
    //translate.setDefaultLang('en');
    console.log(this.globalService.user);
      if (globalService.user == null) {
          let loader = this.loadingCtrl.create({});
          loader.present();
          this.globalService.getUser()
              .then(
                  data => {
                      let user = JSON.parse(data);
                      console.log(data);
                      if (JSON.stringify(user) != "" && data != null) {
                          this.globalService.setUser(user);
                          this.globalService.loggedIn = true;
                          this.navCtrl.setRoot(Lang);
                      }

                      this.defLanguage();

                      loader.dismissAll();
                  }
              );
      }
  }
  defLanguage() {
    this.globalService.getDefaultLang()
      .then(
        data => {
          console.log(data)
          if (data == "ar") {
            this.globalService.arabic();
            console.log("Lang is ar: " + data);
          } else if (data == "en") {
            this.globalService.english();
             console.log("Lang is en: " + data);
          } else {
            this.globalService.setDefaultLang(data);
             console.log("Lang is nothing setting it to english by default: " + data);
          }
        }
      );
  }
  setLanguage(language){
    this.globalService.setDefaultLang(language);
    console.log(language);
    if (this.globalService.driver){
      this.navCtrl.setRoot(DriverHome)
    }else if(this.globalService.user) {
      this.navCtrl.setRoot(HomePage);
    }else {
      this.navCtrl.push(BeforeSignupPage);
    }
 /*   if (this.globalService.loggedIn == true){
      console.log("this is user");
      this.navCtrl.push(HomePage);
    }/!*else if (this.globalService.loggedIn == true){
      console.log("this is driver");
      this.navCtrl.push(Online);
    }*!/
    else {
      this.navCtrl.push(BeforeSignupPage);
    }*/
  }

}
