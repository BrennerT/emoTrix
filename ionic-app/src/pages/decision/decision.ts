import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Decider } from '../../providers/decider';

@Component({
  selector: 'page-decision',
  templateUrl: 'decision.html'
})

export class DecisionPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public decider: Decider){
  
  }

  ionViewDidLoad(){
    console.log("Executing decider...")
    this.decider.decide();
  }

}
