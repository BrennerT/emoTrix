import { EmotionScore } from './EmotionScore';
import { IndicatorScore } from './IndicatorScore';
export class CausalityRule {

    condition: (indicatorA: IndicatorScore, indicatorB?: IndicatorScore) => boolean;
    effects: Array<(emotionScores: EmotionScore[]) => EmotionScore[]>;

    constructor(condition, effects){
        this.condition = condition;
        this.effects = effects;
    }

    public execute(data : Array<EmotionScore>) {
        if(this.condition){
             this.effects.forEach((effect) => {
                data = effect(data)
            });           
        }
        return data;
    }
    
}