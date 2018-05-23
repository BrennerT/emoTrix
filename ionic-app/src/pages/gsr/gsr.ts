import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js';
import { GSRSensor } from '../../providers/sensors/GSRSensor';
import { Storage } from '@ionic/storage';
import { ISubscription } from "rxjs/Subscription";
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
  lineChart: any;
  found: String;
  subscription: ISubscription;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
              private bluetoothSerial: BluetoothSerial, private cdr: ChangeDetectorRef, public GsrSensor: GSRSensor,
              public storage: Storage ){
    this.value= 1;
  }

  ionViewDidLoad() {
    //gekoppelte Devices auflisten
    this.listPairings();
    //Initialisieren des Charts
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
          labels:this.GsrSensor.graphDataLabels,
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
                  data: this.GsrSensor.graphData,
                  spanGaps: false,
              }
          ]
        },
      options: {
          maintainAspectRatio: false
      }
    });
    this.storage.get("pairedDevices").then(data=> {if(data){
      this.pairedDevices = data;
      this.found = this.GsrSensor.connected;
      if(this.found != "") {this.subscribeToSensor(this.found)};
    }
    })

  }

  subscribeToSensor(address: any){
    var found = this.pairedDevices.find(function(element){
      return element.device.address === address;
    });
    this.subscription=this.GsrSensor.observable.subscribe(data => {
      if(data == "Connection successful"){
        found.status = "connected";
      }
      if(data == "Connection lost"){
        found.status = "disconnected";
      }
      if(data == "Update Graph"){
        this.updateChart();
      }
      this.cdr.detectChanges();
    });
  }

  listPairings(){
    this.bluetoothSerial.list().then((successfulPairing) => {
      let hc05s = [];
      successfulPairing.forEach(element => {
        if(element.name === "HC-05"){
          hc05s.push({status: "disconnected", device: element});
          console.log(element);
        };
        this.pairedDevices= hc05s;
        this.storage.set("pairedDevices", this.pairedDevices);
      }
    )})

  }

  /* Slide 1 - Find, Connect, Disconnect */
  startScanning() {
    this.unpairedDevices = null;
    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then((success) => {
        
        this.gettingDevices = false;
        let hc05s = [];
        success.forEach(element => {
          if(element.name === "HC-05"){
            hc05s.push(element);
            console.log(element);
          };
          this.unpairedDevices = hc05s;
        });
      },
      (err) => {
        console.log(err);
      });
  }



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
            self.connect(address);
          }
        }
      ]
    });
    alert.present();

  }

  connect(address: any){
    var self = this;
    console.log(address);
    var found = this.pairedDevices.find(function(element) {
      return element.device.address === address;
    });
    this.subscribeToSensor(this.GsrSensor.connect(address));
  }



  disconnect() {
    var self = this;
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
              self.GsrSensor.disconnect();
          }
        }
      ]
    });
    alert.present();
  }

  startMeasuring(){
   this.GsrSensor.startMeasuring();
  }

  stopMeasuring(){
    this.GsrSensor.stopMeasuring();
    this.setStatus(true);
  }

  updateChart() {
    this.lineChart.data.labels = this.GsrSensor.graphDataLabels;
    this.lineChart.data.datasets.forEach((dataset) => {
        dataset.data = this.GsrSensor.graphData;
    });
    this.lineChart.update();
}

  resetGraph(){
    this.lineChart.data.labels = [];
    this.lineChart.data.datasets[0].data= [];
    this.lineChart.update();
    this.GsrSensor.resetGraph();
    this.setStatus(false);
  }

  setStatus(done: boolean){
    this.storage.get("testStatus").then(data =>{if(data){
      var status = data;
      status.gsr = done;
      this.storage.set("testStatus", status);
    } else {alert("No data found")}  
    });
  }


  ionViewWillLeave() {
    this.cdr.detach();
    this.subscription.unsubscribe();
  }

}
