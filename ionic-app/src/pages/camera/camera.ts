import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the CameraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  constructor(private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  makeTest(){
    console.log(this.camera.getPicture());
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
      console.log(imageData);
    }, (err) => {
      // TODO: Handle Error
    })
  }

}
