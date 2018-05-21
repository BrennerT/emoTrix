import { IndicatorScore, indicator } from './../classes/IndicatorScore';
import { SensorEvaluator } from "../classes/Sensor";

export class FaceSensor extends SensorEvaluator{

    mapper(data:any): IndicatorScore[]{
        // currently without neutral indicator
        let result = [
            {indicator: <indicator>"angryIndicator", score: <number>data.anger},
            {indicator: <indicator>"contemptIndicator", score: <number>data.contempt},
            {indicator: <indicator>"disgustIndicator", score: <number>data.disgust},
            {indicator: <indicator>"fearIndicator", score: <number>data.fear},
            {indicator: <indicator>"happyIndicator", score: <number>data.happiness},
            {indicator: <indicator>"sadIndicator", score: <number>data.sadness},
            {indicator: <indicator>"surpriseIndicator", score: <number>data.surprise},
            {indicator: <indicator>"neutralIndicator", score: <number>data.neutral}
        ];
        console.log(result);
        return result;
    }

}