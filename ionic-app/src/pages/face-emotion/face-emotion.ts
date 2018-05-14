import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CameraComponent } from './../../components/camera/camera';
import { HTTP } from '@ionic-native/http';
import * as $ from 'jquery';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaceEmotionPage');
  }

  onSourceChanged(source: String) {
    console.log("source changed wtf");
    console.log(source);
    var blob = this.makeBlob(source);
    console.log(blob);
    /*var oReq = new XMLHttpRequest();
    oReq.open("POST", "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect", true);
    oReq.setRequestHeader("Content-Type", "application/octet-stream");
    oReq.setRequestHeader("process-data", "false");
    oReq.setRequestHeader("Ocp-Apim-Subscription-Key", "9fc2727bd8844e6ea5cc3464067983f8");

    oReq.onreadystatechange = () => {
      console.log(oReq.readyState);
      console.log(oReq.status);
      if(oReq.readyState == XMLHttpRequest.DONE && oReq.status == 200){
        console.log(oReq.responseText);
      }
    }

    oReq.send(blob);*/
    this.http.post("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect", {blob}, {
      "processData": "false",
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": "9fc2727bd8844e6ea5cc3464067983f8"
    })
      .then(data => {
        console.log(data.status);
        console.log(data.data);
        console.log(data.headers);
      })
      .catch(error => {
        console.log(error.status);
        console.log(error.error);
        console.log(error.headers);
      })
  }

 /**
   * This function is needed to send local pictures to microsoft api without storing them in cloud.
   * Takes a file path and converts the file found there to an blob. 
   * 
   * Found this function here: 
   * https://social.msdn.microsoft.com/Forums/sqlserver/en-US/807ee18d-45e5-410b-a339-c8dcb3bfa25b/testing-project-oxford-ocr-how-to-use-a-local-file-in-base64-for-example
   * @param dataURL also Base64 encoding possible
   */
  makeBlob(dataURL: String){
    var BASE64_MARKER = ';base64,';
            if (dataURL.indexOf(BASE64_MARKER) == -1) {
                var parts = dataURL.split(',');
                var contentType = parts[0].split(':')[1];
                //var contentType = "application/octet-stream";
                var raw = decodeURIComponent(parts[1]);
                return new Blob([raw], { type: contentType });
            }
            var parts = dataURL.split(BASE64_MARKER);
            var contentType = parts[0].split(':')[1];
            //var contentType = "application/octet-stream";
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;

            var uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }

            return new Blob([uInt8Array], { type: contentType });
  }
  
}
