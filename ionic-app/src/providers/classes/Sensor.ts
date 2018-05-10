import { IndicatorScore } from './IndicatorScore';
import { Decider } from '../decider';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class SensorEvaluator{

    constructor(public decider: Decider){};

    // this forces the specific sensor evaluators to implement this method
    abstract mapper(data: any): IndicatorScore[]; 

    // TODO: force specific sensors to implement a event on which this function is called
    onSensorData(data: any) {
        let indicatorScores = this.mapper(data)
        // TODO: Call Decider.addEmotion here 
        this.decider.addIndicatorScores(indicatorScores);
    }

}