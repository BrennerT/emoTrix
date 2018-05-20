import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CameraComponent } from './../../components/camera/camera';
import { HTTP } from '@ionic-native/http';
import  * as $ from 'jquery';
import *  as oxford from 'project-oxford';

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
    /**
     * Throws TypeError fs.readFileSync not defined
     */
    /*let client = new oxford.Client('9fc2727bd8844e6ea5cc3464067983f8');

    client.face.detect({
      path: source,
      analyzeAge: true,
      analyzeGender: true
    }).then(function(response){
      console.log(response);
    })*/

    /*this.http.post("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect", {
      data: blob
    }, {
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
      })*/

     $.ajax({
        url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect',
        type: 'POST',
        processData: false,
        headers: {
          "Ocp-Apim-Subscription-Key": "9fc2727bd8844e6ea5cc3464067983f8",
          "returnFaceID": "true",
          "returnFaceLandmarks": "false",
            "returnFaceAttributes":
                "age,gender,headPose,smile,facialHair,glasses,emotion," +
                "hair,makeup,occlusion,accessories,blur,exposure,noise"
        },
        contentType: 'application/octet-stream',
        data: this.dataURItoBlob(source)
      })
    .done(function(data) {
      // Show formatted JSON on webpage.
      console.log('data:' + data);
      alert(JSON.stringify(data));
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      // Display error message.
      console.log('error');
      var errorString = (errorThrown === "") ?
          "Error. " : errorThrown + " (" + jqXHR.status + "): ";
      errorString += (jqXHR.responseText === "") ?
          "" : ($.parseJSON(jqXHR.responseText).message) ?
              $.parseJSON(jqXHR.responseText).message :
                  $.parseJSON(jqXHR.responseText).error.message;
      alert(errorString);
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
  
  /**
   * Some other way to make the blob, maybe identical
   * @param dataURL 
   */
  makeblob (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  /**
   * https://gist.github.com/fupslot/5015897
   */
  dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var bb = new Blob([ab]);
    return bb;
  }
}
