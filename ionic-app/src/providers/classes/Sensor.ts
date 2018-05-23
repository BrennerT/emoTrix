import { IndicatorScore } from './IndicatorScore';
import { Decider } from '../decider';
import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';

@Injectable()
export abstract class SensorEvaluator{

    observable: Observable<string>;
    sensorObserver: Observer<string>;

    constructor(public decider: Decider){
        this.observable = Observable.create(observer => {
            this.sensorObserver = observer;
        });
    };

    // this forces the specific sensor evaluators to implement this method
    abstract mapper(data: any): IndicatorScore[]; 

    // TODO: force specific sensors to implement a event on which this function is called
    onSensorData(data: any) {
        let indicatorScores = this.mapper(data)
        // TODO: Call Decider.addEmotion here 
        this.decider.addIndicatorScores(indicatorScores);
    }

}