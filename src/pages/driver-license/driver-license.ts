import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import {DriverCarPage} from "../driver-car/driver-car";
import { Camera } from '@ionic-native/camera';

/*
  Generated class for the DriverLicense page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-driver-license',
  templateUrl: 'driver-license.html'
})
export class DriverLicensePage {
  public user;
  public pushPage;
  public licence_front : string ;
  public licence_back : string ;
  readonly front = 1 ;
  readonly back = 0 ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl :AlertController,  private camera: Camera ) {
    this.user = navParams.data;
    this.pushPage = DriverCarPage;
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverLicensePage');
  }

    takeFrontImage()
  {
   // this.takePicture(this.front);
   this.galleryOrCamera(this.front);
  }
  takeBackImage()
  {
    //this.takePicture(this.back);
   this.galleryOrCamera(this.back);
  }
  galleryOrCamera(type:any) {
    let confirm = this.alertCtrl.create({
      title:  'Choose method',
      message: 'Choose picture from gallery or camera ?',
      buttons: [
        {
          text: 'Gallery',
          handler: () => {
            this.pickPicture(type);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture(type);
          }
        }
      ]
    });
    confirm.present();
  }
  pickPicture(type:any) {
    //noinspection TypeScriptUnresolvedVariable
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.image_accommodation(type,imageData);
    }, (err) => {
      console.log(err);
    });
  }
  takePicture(type : any){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.image_accommodation(type,imageData);
    }, (err) => {
        console.log(err);
    });
  }
  image_accommodation(type:any,imageData:any)
  {
      if(type == this.front)
        {
          this.licence_front = "data:image/jpeg;base64," + imageData;
          this.user.id_front = imageData;
        }
        else
        {
          this.licence_back = "data:image/jpeg;base64," + imageData;
          this.user.id_back = imageData;
        }
  }

}
