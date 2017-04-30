import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Splash } from '../pages/splash/splash';
import { Lang } from '../pages/lang/lang';
import { Estimate } from '../pages/estimate/estimate';
import { Requested } from '../pages/requested/requested';
import { Onway } from '../pages/onway/onway';
import { Arrived } from '../pages/arrived/arrived';
import { Help } from '../pages/help/help';
import { Canceled } from '../pages/canceled/canceled';
import { Payment } from '../pages/payment/payment';
import { Sum } from '../pages/sum/sum';
import {Http} from '@angular/http';
import {GlobalService} from '../providers/global-service';
import {BeforeSignupPage} from '../pages/before-signup/before-signup';
import {SignupPage} from '../pages/user-signup/signup';
import {EmailPagePage} from '../pages/email-page/email-page';
import {PasswordPagePage} from '../pages/password-page/password-page';
import {MobilePagePage} from '../pages/mobile-page/mobile-page';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import {ActiveCodePagePage} from "../pages/active-code-page/active-code-page";
import {DriverLicensePage} from "../pages/driver-license/driver-license";
import {DriverIdPage} from "../pages/driver-id/driver-id";
import {DriverCarPage} from "../pages/driver-car/driver-car";
import {BeforeLoginPage} from "../pages/before-login/before-login";
import {DriverCarLicensePage} from "../pages/driver-car-license/driver-car-license";
import { CustomToast } from "../general-components/toast.component";
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import {PlainMapPage} from "../pages/plain-map/plain-map";
import {MapsPage} from "../pages/maps-page/mapspage";
import {BrowserModule} from "@angular/platform-browser";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import { AgmCoreModule } from 'angular2-google-maps/core';
import {Sika_home} from "../pages/sika_home/sika_home";
import {HomePage} from "../pages/home/home";
import {Push} from "@ionic-native/push";
import {Online} from "../pages/online/online";
import {Camera} from "@ionic-native/camera";
import {DriverCarNoPage} from "../pages/driver-car-no/driver-car-no";
import {DriverHome} from "../pages/driver-home/driver-home";
import {DriverCancel} from "../pages/driver-cancel/driver-cancel";
import {Countdown} from "../pages/countdown/countdown";
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {WaitCnf} from "../pages/waitcnf/waitcnf";
import {ClientWait} from "../pages/clientwait/clientwait";
import {NavigateTouser} from "../pages/navigate-touser/navigate-touser";
import {StartTrip} from "../pages/starttrip/starttrip";
import {EndTrip} from "../pages/endtrip/endtrip";
import {DriverPayment} from "../pages/driver-payment/driver-payment";
import {Done} from "../pages/done/done";
import {DriverFeed} from "../pages/driverfeed/driverfeed";
import {End} from "../pages/end/end";
import {SMS} from "@ionic-native/sms";
import {FocusModule} from "angular2-focus";
export function createTranslateLoader(http: any) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}



@NgModule({
  declarations: [
    MyApp,
    Estimate,
    Requested,
    Onway,
    Arrived,
    MobilePagePage,
    Help,
    Canceled,
    Payment,
    Sum,
    Lang,
    Splash,
    BeforeSignupPage,
    SignupPage,
    EmailPagePage,
    PasswordPagePage,
    ActiveCodePagePage,
    DriverLicensePage,
    DriverIdPage,
    DriverCarPage,
    BeforeLoginPage,
    DriverCarLicensePage,
    PlainMapPage,
    MapsPage,
    Sika_home,
    HomePage,
    Online,
    DriverCarNoPage,
    DriverHome,
    DriverCancel,
    Countdown,
    WaitCnf,
    ClientWait,
    NavigateTouser,
    StartTrip,
    EndTrip,
    DriverPayment,
    Done,
    DriverFeed,
    End
  ],
  imports: [
    BrowserModule,
    RoundProgressModule,
    AgmCoreModule.forRoot({
     apiKey: 'AIzaSyDCNkqSEgLCmcQzqTR318vKcpP56VTGv_I'
     }),
    IonicModule.forRoot(MyApp),TranslateModule.forRoot(),
    IonicStorageModule.forRoot(),
    FocusModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Estimate,
    Requested,
    Onway,
    Sika_home,
    Arrived,
    Help,
    Canceled,
    Payment,
    Sum,
    Lang,
    Splash,
    BeforeSignupPage,
    SignupPage,
    EmailPagePage,
    PasswordPagePage,
    MobilePagePage,
    ActiveCodePagePage,
    DriverLicensePage,
    DriverIdPage,
    DriverCarPage,
    BeforeLoginPage,
    DriverCarLicensePage,
    PlainMapPage,
    MapsPage,
    HomePage,
    Online,
    DriverCarNoPage,
    DriverHome,
    DriverCancel,
    Countdown,
    WaitCnf,
    ClientWait,
    NavigateTouser,
    StartTrip,
    EndTrip,
    DriverPayment,
    Done,
    DriverFeed,
    End
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GlobalService,
    Geolocation,
    CustomToast,
    Push,
    Camera,
    SMS,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule { }