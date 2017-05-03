import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GlobalService} from "../../providers/global-service";
import {CustomToast} from "../../general-components/toast.component";
import {Contactus} from "../contactus/contactus";
import{History} from "../history/history";
import{Clientcomments} from "../clientcomments/clientcomments";
import{Inbox} from "../inbox/inbox";
import{Canceled} from "../canceled/canceled";
@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})
export class Help {
public user;
public order;
public message;
public help;
  constructor(public navCtrl: NavController , public globalservice: GlobalService,private customToast :CustomToast) {
  }

 gocontact(){
   this.navCtrl.push(Contactus);
 }
 trip(){
   this.navCtrl.push(History);
 }
 comments(){
    this.navCtrl.push(Clientcomments);
 }
 inbox(){
   this.navCtrl.push(Inbox);
 }
 cancel(){
   this.navCtrl.push(Canceled);
 }

  post(){
    if (this.globalservice.user){
      this.order = this.globalservice.orderid;

      this.globalservice.postHelpComeents(this.order,this.message).subscribe(
        data => {
          this.help = data;
          console.log(this.help);
          if (data != null){
            this.customToast.toast("message sent");
          }else {
            this.customToast.toast(data.error);
          }
        }
      )
    }else {
      this.order = this.globalservice.orderid;

      this.globalservice.postHelpDriver(this.order,this.message).subscribe(
        data => {
          this.help = data;
          console.log(this.help);
          if (data != null){
            this.customToast.toast("message sent");
          }else {
            this.customToast.toast(data.error);
          }
        }
      )
    }

  }
}
