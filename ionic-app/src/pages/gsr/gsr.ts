import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js';
import { GSRSensor } from '../../providers/sensors/GSRSensor';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-gsr',
  templateUrl: 'gsr.html',
  providers: [BluetoothSerial]
})
export class GsrPage {

  @ViewChild('lineCanvas') lineCanvas;

  value: any;
  oldValue: number;
  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;
  lineChart: any;
  time: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
              private bluetoothSerial: BluetoothSerial, private cdr: ChangeDetectorRef, public GsrSensor: GSRSensor,
              public storage: Storage ){
    this.value= 1;
    this.oldValue = 1;
    bluetoothSerial.enable();
    this.time = 0;
  }

  ionViewDidLoad() {
    //gekoppelte Devices auflisten
    this.listPairings();
    //Initialisieren des Charts
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
      let hc05s = [];
      successfulPairing.forEach(element => {
        if(element.name === "HC-05"){
          hc05s.push({status: "disconnected", device: element});
          console.log(element);
        };
        this.pairedDevices = hc05s;
      })
    },
    (err) => {
      console.log(err);
    });
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

  fail = (error) => alert("Error: " + error);

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


    this.bluetoothSerial.connect(address).subscribe((data) => {
      found.status = "connected";
      this.cdr.detectChanges();
      console.log("Connection successful: " + data)
    }
      ,(error) => {
        found.status = "disconnected";
        this.cdr.detectChanges();
        console.log(error);
      });
      
    this.bluetoothSerial.subscribe(";").subscribe(
      function (data){
        self.value = data.substring(0,data.length - 1);
        self.value = ((1024+2*self.value)*10000)/(512-self.value);
        if(self.time%5 == 0){
          if(self.time != 0){
            var data: any = {value: self.value, oldValue: self.oldValue};
            self.GsrSensor.onSensorData(data);
          }
          self.oldValue = self.value;
        } 
        if(self.time%20 == 0){
          self.addData(self.lineChart,self.time, self.value); 
        }
        self.time++;
        self.cdr.detectChanges();
        
    }, function (error){
        console.log(error);
    });

    
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
            this.bluetoothSerial.disconnect().then(
              (data) => {
                var found = self.pairedDevices.find(function(element) {
                  return element.status === "connected";
                });
                found.status = "disconnected";
                console.log("Sucessfully disconnected: "+ found.device.address + " "+ data);
              },
              this.fail);    
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
    this.setStatus(true);
  }

  resetGraph(){
    this.lineChart.data.labels = [];
    this.lineChart.data.datasets[0].data= [];
    this.time = 0;
    this.lineChart.update();
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
