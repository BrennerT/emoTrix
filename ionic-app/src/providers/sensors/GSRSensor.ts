import { Injectable } from '@angular/core';
import { SensorEvaluator } from '../classes/Sensor';
import { IndicatorScore, indicator } from '../classes/IndicatorScore';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Decider } from '../decider';

@Injectable()
export class GSRSensor extends SensorEvaluator{

    constructor(public decider: Decider, public bluetoothSerial: BluetoothSerial){
        super(decider);
        bluetoothSerial.enable();
        this.time = 0;
        this.graphData = [];
        this.graphDataLabels = [];
        this.connected="";
    }

    time: any;
    value: any;
    oldValue: any;
    connected: String;
    public graphDataLabels: Array<number>;
    public graphData: Array<number>;

    mapper(data: any): IndicatorScore[]{
        let newIndicatorScore: IndicatorScore;
        console.log("GSR Mapper called: "+ data.value + " "+ data.oldValue);
        if(data.value > data.oldValue){
            newIndicatorScore = {indicator: "activation", score: 0};
        } else if (data.value < data.oldValue){
            newIndicatorScore = {indicator: "activation", score: 1};
        } else { 
            newIndicatorScore = {indicator: "activation", score: 0.5};
        }
        return [newIndicatorScore];
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

      connect(address: any){
        var self = this;
    
        this.bluetoothSerial.connect(address).subscribe((data) => {
          this.sensorObserver.next("Connection successful");
          this.connected = address;
          console.log("Connection successful: " + data)
        }
          ,(error) => {
            this.sensorObserver.next("Connection lost");
            console.log(error);
          });
          
        this.bluetoothSerial.subscribe(";").subscribe(
          function (data){
            self.value = data.substring(0,data.length - 1);
            self.value = ((1024+2*self.value)*10000)/(512-self.value);
            if(self.time%5 == 0){
              if(self.time != 0){
                var data: any = {value: self.value, oldValue: self.oldValue};
                self.onSensorData(data);
              }
              self.oldValue = self.value;
            } 
            if(self.time%20 == 0){
                self.graphDataLabels.push(self.time);
                self.graphData.push(self.value);
                self.sensorObserver.next("Update Graph"); 
            }
            self.time++;
            
        }, function (error){
            console.log(error);
        });

        return address;
           
      }

      disconnect(){
        this.bluetoothSerial.disconnect().then(
            (data) => {
              this.sensorObserver.next("Connection lost");
              console.log("Sucessfully disconnected");
            },
            this.fail);
      }

      fail = (error) => alert("Error: " + error);

      resetGraph(){
          this.graphDataLabels = [];
          this.graphData = [];
          this.time = 0;
      }
  
}