import { Injectable } from '@angular/core';
import { IndicatorScores } from './classes/IndicatorScores';

@Injectable()
export class Decider {

    data: Array<{timestamp: string, indicators: Array<IndicatorScores>}>;
    resultData: Array<{timestamp: string, emotion: string}>;

    constructor() {

    }

    public addIndicatorScores(indicatorScores: IndicatorScores){
        
    }

    private assumeEmotion(timestamp: string){
        
    }

    private executeCausalityRules(){

    }

    private getTimeStamp(){

    }

    private applyPostivEffect(score, value){

    }

    private applyNegativEffect(score, value){

    }
    public generateGraph(){

    }

}

