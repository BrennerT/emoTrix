import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component, Input } from '@angular/core';

import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';

/**
 * Generated class for the CameraComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'camera',
  templateUrl: 'camera.html'
})
export class CameraComponent {

  latestPicture: String;
  latestVideo: String;
  @Input() pictureMode: boolean;

  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    mediaType: this.camera.MediaType.PICTURE,
    encodingType: this.camera.EncodingType.JPEG
  }

  /**
   * Component used to implement camera use in a page
   * @param pictureMode 
   * @param mediaCapture 
   */
  constructor(private mediaCapture: MediaCapture, private camera: Camera) {
  }

  ionViewDidLoad(){
    console.log("in picture mode" + this.pictureMode)
  }

  /**
   * Depending on the used mode of this component, the method will either return a 
   * String URI to the path of a picture or video taken by the user.
   * pictureMode false -> videoUri
   * pictureMode true -> imageUri
   */
  useCamera(){
    if(this.pictureMode){
      console.log("take a picture");
      this.camera.getPicture(this.cameraOptions).then((data: String) => {
        console.log("received image data");
        this.latestPicture = 'data:image/jpeg;base64,' + data;
      }, 
      (err: CaptureError) => {
        console.log("Error");
        console.log(err);
      });
    } else {
      console.log("create a video");
      this.mediaCapture.captureVideo().then((data: MediaFile[]) => {
        console.log("receiving video data");
        console.log(data[0].fullPath);
        this.latestVideo = data[0].fullPath;
      },
      (err: CaptureError) => {
        console.log("Error");
        console.log(err);
      });
    }
  }

}
 