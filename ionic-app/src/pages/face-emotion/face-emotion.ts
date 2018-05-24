import { Storage } from '@ionic/storage';
import { emotions } from './../../providers/classes/EmotionScore';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { FaceSensor } from './../../providers/sensors/FaceSensor';
import { CameraComponent } from './../../components/camera/camera';
import  * as $ from 'jquery';
import { Chart } from 'chart.js';

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

  loader:any;
  base64: String;
  @ViewChild('doughnutChart') doughnutChart;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private loadingController: LoadingController, private faceSensor: FaceSensor,
              private storage: Storage) {
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
    this.base64 = source;
  }

  sendPicture(){
    this.loader = this.loadingController.create({
      content: "Please wait ...",
    });
    this.faceSensor.observable.subscribe(data => {
      if(data == "Sending data to Microsoft"){
        this.loader.present();
      }
      if(data == "empty result"){
        this.loader.dismiss();
        alert("Microsoft Server couldn't recognize your face. Please make sure your face is visible");
      }
      if(data.startsWith("result:")){
        console.log("This is a result");
        this.loader.dismiss();
        let emotions = JSON.parse(data.replace("result:", ""));
        console.log(emotions);
        this.faceSensor.onSensorData(emotions);
        this.setTestStatus(true);
      }
      if(data.startsWith("error:")){
        this.loader.dismiss();
        let errorString = data.replace("error:", "");
        alert(errorString);
      }
    });
    this.faceSensor.prepareData(this.base64);
  }

  setTestStatus(newStatus: boolean){
    this.storage.get("testStatus").then(data => {
      if(data){
        let status = data;
        status.face = newStatus;
        this.storage.set("testStatus", status);
      } else {
        console.log("Can't set test status because no testData is found");
      }
    })
  }
}
