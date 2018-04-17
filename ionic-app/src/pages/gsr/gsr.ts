import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-gsr',
  templateUrl: 'gsr.html',
  providers: [BluetoothSerial]
})
export class GsrPage {

  @ViewChild('lineCanvas') lineCanvas;

  value: any;
  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;
  stop: Boolean;
  hc05s: Array<any>;
  lineChart: any;
  time: any;
  model: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private bluetoothSerial: BluetoothSerial, private cdr: ChangeDetectorRef){
    this.value= 1;
    bluetoothSerial.enable();
    this.model = {};
    this.time = 0;
  }

  ionViewDidLoad() {
    this.listPairings();
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
          labels: [],
          datasets: [
              {
                  label: "Hautleitfähigkeit",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: [],
                  spanGaps: false,
              }
          ]
        },
        options: {
          maintainAspectRatio: false
        }
      });
  }

  listPairings(){
    this.bluetoothSerial.list().then((successfulPairing) => {
      this.pairedDevices = successfulPairing;
    },
    (err) => {
      console.log(err);
    });
  }

  /* Slide 1 - Find, Connect, Disconnect */
  startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.hc05s = [];

    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then((success) => {
        
        this.gettingDevices = false;
        success.forEach(element => {
          if(element.name === "HC-05"){
            this.hc05s.push(element);
            console.log(element)
          }
          ;
          this.unpairedDevices = this.hc05s;
        });
      },
      (err) => {
        console.log(err);
      });
  }

  success = (data) => alert(data);
  fail = (error) => alert(error);

  selectDevice(address: any) {
    var self = this;
    let alert = this.alertCtrl.create({
      title: 'Connect',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
          handler: () => {
            console.log(address);
            this.bluetoothSerial.connect(address).subscribe(this.success,this.fail);
            self.bluetoothSerial.subscribe(";").subscribe(
              function (data){
                self.value = data.substring(0,data.length - 1);
                if(self.time%10 == 0){
                self.addData(self.lineChart,self.time, self.value);
                }
                self.time++;
                self.cdr.detectChanges();
            }, function (error){
                console.log(error);
            }) 
          }
        }
      ]
    });
    alert.present();

  }

  addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

  removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

  disconnect() {
    let alert = this.alertCtrl.create({
      title: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
    alert.present();
  }

  startMeasuring(){
    this.bluetoothSerial.write('S').then((data: any) => {
      })
      .catch((e) => {
      console.log(e);
      });;
  }

  stopMeasuring(){
    this.bluetoothSerial.write('F').then((data: any) => {
    })
    .catch((e) => {
    console.log(e);
    });
  }

  resetGraph(){
    this.lineChart.data.labels = [];
    this.lineChart.data.datasets[0].data= [];
    this.time = 0;
    this.lineChart.update();
  }


  /* Slide 4 */
  util(){
    this.bluetoothSerial.isEnabled().then(function (res) {
      console.log("isEnabled() : " + res);
    });
    this.bluetoothSerial.isConnected().then(function (res) {
      console.log("isConnected() : " + res);
    });
  }

  showSettings(){
    this.bluetoothSerial.showBluetoothSettings();
  }

  listThings(){
    this.bluetoothSerial.list().then(function (data) {
      console.log(data);
    })
  }

  writeThingsExample(){

    // Write a string
    this.bluetoothSerial.write('hello world').then(function (res) {
      console.log(res);
    }, function (res) {
      console.log(res);
    });

  }
}