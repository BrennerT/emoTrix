import { EmotionScore } from './EmotionScore';
import { IndicatorScore } from './IndicatorScore';
export class CausalityRule {

    condition: (indicatorA: IndicatorScore, indicatorB?: IndicatorScore) => boolean;
    effects: Array<(emotionScores: EmotionScore[]) => EmotionScore[]>;

    execute = (data : Array<EmotionScore>) => {
        if(this.condition)
            this.effects.forEach((effect) => {
                data = effect(data)
            });
        return data;
    }
    
}