import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { KeyboardScannerPage } from './../keyboard-scanner/keyboard-scanner';
import { Decider } from '../../providers/decider';
import { GsrPage } from '../gsr/gsr';
import { PulsPage } from './../puls/puls';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tests: Array<{name: String, component: any}>;

  constructor(public navCtrl: NavController, public decider: Decider) {
    this.tests = [
      {name: "Keyboard Scanner", component: KeyboardScannerPage},
      {name: "Test", component: HomePage},
      {name: "GSR", component: GsrPage},
      {name: "Puls", component: PulsPage}
    ];
  }
  
}
