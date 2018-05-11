import { ScoreTransformation, Condition } from './CausalityRule';
import { EmotionScore } from './EmotionScore';
import { IndicatorScore } from './IndicatorScore';

export type Condition = (indicatorA: IndicatorScore, indicatorB?: IndicatorScore) => boolean;
export type ScoreTransformation = (emotionScores: EmotionScore[]) => EmotionScore[];

export class CausalityRule {

    constructor(
        private condition : Condition,
        private effects : ScoreTransformation[]
    ) {}

    public execute(data : Array<EmotionScore>, indicatorScores: IndicatorScore[]) {
        indicatorScores.forEach((indicatorScore) =>{
            if(this.condition(indicatorScore)){
                this.effects.forEach((effect) => {
                   data = effect(data);
               })           
        }});
        return data;
    }
    
}