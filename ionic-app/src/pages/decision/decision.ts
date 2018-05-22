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
  date: String;
  time: number;
  min:number;
  max: number;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public decider: Decider){}

  ionViewDidLoad(){
    this.time=this.decider.findRange().start;
    this.min= this.time;
    this.max= this.decider.findRange().end;
    this.date= new Date(this.time).toLocaleString();
    console.log("Executing decider...")
    this.decider.decide();
    this.doughnutChart = new Chart(this.doughnutChart.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
            data: this.getResultData(this.min),
            backgroundColor: ["#2ECC40", "#FF4136", "#0074D9", "#FFFF33"]
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ["happy", "angry", "sad", "surprised"]
    }})
  }
  onChange(){
    this.date=new Date(this.time).toLocaleString();
    this.doughnutChart.data.datasets.forEach((dataset) => {
      dataset.data = this.getResultData(this.time);
  });
  this.doughnutChart.update();
  }

  getResultData(start: number){
    var happy= 0;
    var angry= 0;
    var sad= 0;
    var surprised= 0;
    this.decider.resultData.filter(e => e.timestamp == start).forEach((entry) =>{
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


