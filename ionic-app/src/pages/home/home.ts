import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { KeyboardScannerPage } from './../keyboard-scanner/keyboard-scanner';
import { Decider } from '../../providers/decider';
import { GsrPage } from '../gsr/gsr';
import { Page } from 'ionic-angular/navigation/nav-util';
import { Storage} from'@ionic/storage';
import { DecisionPage } from '../decision/decision';
import { FaceEmotionPage } from './../face-emotion/face-emotion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  status: {keyboard: boolean , gsr: boolean, face: boolean};
  tests: Array<{name: String, component: any, done: boolean, icon: String}>;
  

  constructor(public navCtrl: NavController, public decider: Decider, public storage: Storage) {
    this.storage.get("testStatus").then(data=> {if(data){
            console.log("Status exists");
            this.status = data;
          } else {
            this.status = {keyboard: false, gsr: false, face: false};
            this.storage.set("testStatus",this.status);
          }

          this.tests = [
            {name: "GSR", component: GsrPage,  done: this.status.gsr, icon: "flash"},
            {name: "Face", component: FaceEmotionPage, done: this.status.face, icon: "happy"},
            {name: "Keyboard Scanner", component: KeyboardScannerPage, done: this.status.keyboard, icon: "phone-portrait"},
          ];
        }
      )
    
  }

  navigate(page: any): void {
    this.navCtrl.setRoot(page);
  }

 decide(){
  this.navCtrl.setRoot(DecisionPage);
 }
  
}
