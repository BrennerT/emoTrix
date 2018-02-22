import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { KeyboardScannerPage } from './../keyboard-scanner/keyboard-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tests: Array<{name: String, component: any}>;

  constructor(public navCtrl: NavController) {
    this.tests = [
      {name: "Keyboard Scanner", component: KeyboardScannerPage},
      {name: "Test", component: HomePage}
    ];
  }
  
}
