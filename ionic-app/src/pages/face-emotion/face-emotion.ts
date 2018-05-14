import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CameraComponent } from './../../components/camera/camera';

/**
 * Generated class for the FaceEmotionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-face-emotion',
  templateUrl: 'face-emotion.html',
})
export class FaceEmotionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaceEmotionPage');
  }

  onSourceChanged(source: String) {
    console.log("source changed wtf");
    console.log(source);
  }

}
