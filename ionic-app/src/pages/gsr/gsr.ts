import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-gsr',
  templateUrl: 'gsr.html'
})
export class GsrPage {
  value: number;
  constructor(public navCtrl: NavController){
    this.value= 1;
  }


  
}
