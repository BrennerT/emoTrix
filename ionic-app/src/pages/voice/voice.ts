import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';

/**
 * Generated class for the VoicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-voice',
  templateUrl: 'voice.html',
})
export class VoicePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaCapture: MediaCapture) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VoicePage');
  }

  onTestStart() {
    this.mediaCapture.captureAudio()
      .then(
        (data: MediaFile[]) => {
          console.log("Sucess");
          console.log(data);
        },
        (error: CaptureError) => {
          console.log("Error");
          console.log(error);
        }
      )
  }

}
