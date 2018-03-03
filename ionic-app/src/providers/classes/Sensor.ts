import { IndicatorScore } from "./IndicatorScore";

export abstract class SensorEvaluator{

    // this forces the specific sensor evaluators to implement this method
    abstract mapper: (data: any) => IndicatorScore[]; 

    // TODO: force specific sensors to implement a event on which this function is called
    private onSensorData(data: any) {
        let indicatorScores = this.mapper(data)
        // TODO: Call Decider.addEmotion here 
    }

}