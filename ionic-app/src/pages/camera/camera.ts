import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
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
  latestVideo: String;

  cameraOptions : CameraOptions = {
      // we want high quality, make emotrix great again
      quality: 100,
      //Picture will be saved and URI will be returned
      destinationType: this.camera.DestinationType.FILE_URI,
  }

  constructor(private camera: Camera, private mediaCapture: MediaCapture) {
  }

  makeTest(video : boolean = false){
    if(video){
      console.log("will do video");
      this.mediaCapture.captureVideo().then((data: MediaFile[]) => {
        console.log("getting data");
        console.log(data[0].fullPath);
        this.latestVideo = data[0].fullPath;
      },
      (err: CaptureError) => {
        console.log("Error");
        console.log(err);
      });    
    } else {
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

}
