import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  @Output() sourceChanged: EventEmitter<String> = new EventEmitter<String>();

  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    mediaType: this.camera.MediaType.PICTURE,
    encodingType: this.camera.EncodingType.JPEG
  }

  /*
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
   * Depending on the used mode of this component, the method will either set latestPicture or LatestVideo
   * Variable. 
   * pictureMode false -> latestVideo = videoUri
   * pictureMode true -> latestImage = image data in base 64 encoding and jpeg format
   * 
   * The reason for the use of two different ways to return the data, is that returning the picture 
   * in base64 enables ionic livereload function for debugging. Videos can only be returned as URI, so 
   * for Videos the livereload is not possible.
   */
  useCamera(){
    if(this.pictureMode){
      console.log("take a picture");
      this.camera.getPicture(this.cameraOptions).then((data: String) => {
        console.log("received image data");
        this.latestPicture = 'data:image/jpeg;base64,' + data;
        // this.latestPicture = data;
        this.sourceChanged.emit(this.latestPicture); 
      }, 
      (err: CaptureError) => {
        console.log("Error");
        console.log(err);
      });
    } else {
      console.log("create a video");
      this.mediaCapture.captureVideo().then((data: MediaFile[]) => {
        console.log("receiving video data");
        console.log("")
        this.latestVideo = data[0].fullPath;
        this.sourceChanged.emit(this.latestVideo);
      },
      (err: CaptureError) => {
        console.log("Error");
        console.log(err);
      });
    }
  }

}
 