import { Injectable } from '@angular/core';
import { SensorEvaluator } from '../classes/Sensor';
import { IndicatorScore } from '../classes/IndicatorScore';

@Injectable()
export class GSRSensor extends SensorEvaluator{

    mapper(data: any): IndicatorScore[]{
        let newIndicatorScore: IndicatorScore;
        console.log("GSR Mapper called: "+ data.value + " "+ data.oldValue);
        if(data.value > data.oldValue){
            newIndicatorScore = {indicator: "stress", score: 0};
        } else if (data.value < data.oldValue){
            newIndicatorScore = {indicator: "stress", score: 1};
        } else { 
            newIndicatorScore = {indicator: "stress", score: 0.5};
        }     
        return [newIndicatorScore];
    }
}