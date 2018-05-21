import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Decider } from '../../providers/decider';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-decision',
  templateUrl: 'decision.html'
})

export class DecisionPage {
  @ViewChild('doughnutChart') doughnutChart;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public decider: Decider){}

  ionViewDidLoad(){
    console.log("Executing decider...")
    this.decider.decide();
    this.doughnutChart = new Chart(this.doughnutChart.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
            data: this.getResultData(),
            backgroundColor: ["#2ECC40", "#FF4136", "#0074D9", "#FFFF33"]
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ["happy", "angry", "sad", "surprised"]
    }})
  }

  getResultData(){
    var happy= 0;
    var angry= 0;
    var sad= 0;
    var surprised= 0;
    this.decider.resultData.forEach((entry) =>{
      entry.emotionScores.forEach(element => {
        if(element.emotion == "happy") {happy += element.score}
        if(element.emotion == "angry") {angry += element.score}
        if(element.emotion == "sad") {sad += element.score}
        if(element.emotion == "surprised") {surprised += element.score}
      });
    })

    return [happy, angry, sad, surprised];
      
  }
}


