import { indicator } from './IndicatorScore';
import {SensorEvaluator} from "./Sensor";
describe("Sensor", () => {

    describe("Abstract Class SensorEvaluator", () => {

        it("should force its children to implement sensor and mapper", () => {

            class GSRSensor extends SensorEvaluator{
                mapper (data: any) {
                    if(<number> data){
                        if(data >= 300) {
                            return [{indicator: <indicator>"relaxed", score: 50}]
                        }else{
                            return [{indicator: <indicator>"activation", score: 50}]
                        }
                    }
                    return [{indicator: <indicator>"activation", score: 0}]
                }
            };

        })

    })

})