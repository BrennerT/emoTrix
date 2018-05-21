import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CameraComponent } from './../../components/camera/camera';
import  * as $ from 'jquery';

/**
 * Generated class for the FaceEmotionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

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

  /**
   * On every new picture that arrives this should be executed
   * @param source base64 encoded picture
   */
  onSourceChanged(source: String) {
    console.log("new source registrated");

    $.ajax({
      url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion',
      type: 'POST',
      processData: false,
      headers: {
        "Ocp-Apim-Subscription-Key": "0013b227bb26420c8f4184379701b02d",
      },
      contentType: 'application/octet-stream',
      data: this.makeblob(source)
    })
    .done(function(data) {
      // Show formatted JSON on webpage.
      if(data == []){
        // Users face can't be recognized
        alert("Place make sure that the face in the picture is vertically aligned")
      }else{
        // TODO: Implement sensor for the Data!!
        alert(JSON.stringify(data));
      }
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

}
