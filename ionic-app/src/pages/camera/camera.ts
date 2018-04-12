import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

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

  latestPicture: String;

  cameraOptions : CameraOptions = {
      // we want high quality, make emotrix great again
      quality: 100,
      //Picture will be saved and URI will be returned
      destinationType: this.camera.DestinationType.FILE_URI,
  }

  constructor(private camera: Camera) {
  }

  makeTest(){
    this.camera.getPicture(this.cameraOptions).then((imageUri) => {
      // set src of img to new image uri
      this.latestPicture = imageUri;
    }, (err) => {
      // TODO: Handle Error
      console.log("error");
      console.log(err);
    })
  }

}
