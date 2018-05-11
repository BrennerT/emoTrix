import { CausalityRule } from "./classes/CausalityRule";
import { EmotionScore, emotion } from "./classes/EmotionScore";
import { IndicatorScore, indicator } from "./classes/IndicatorScore";


export var gsr1: CausalityRule = new CausalityRule(
    (indicatorScore: IndicatorScore) => {
        return indicatorScore.indicator == <indicator>"stress" && indicatorScore.score == 1;
    },
    [
        (data: EmotionScore[]) => {
            var angry = data.find((emotionScore) => {return emotionScore.emotion == <emotion>"angry"});
            var happy = data.find((emotionScore) => {return emotionScore.emotion == <emotion>"happy"});
            var suprised = data.find((emotionScore) => {return emotionScore.emotion == <emotion>"suprised"});
            console.log("Adding 1")
            angry.score = angry.score +1;
            suprised.score = suprised.score +1;
            happy.score = happy.score +1;
            return data;
        }
    ]
)

export var gsr2: CausalityRule = new CausalityRule(
    (indicatorScore: IndicatorScore) => {
        return indicatorScore.indicator == <indicator>"stress" && indicatorScore.score == 0;
    },
    [
        (data: EmotionScore[]) => {
            var angry = data.find((emotionScore) => {return emotionScore.emotion == <emotion>"angry"});
            var happy = data.find((emotionScore) => {return emotionScore.emotion == <emotion>"happy"});
            var suprised = data.find((emotionScore) => {return emotionScore.emotion == <emotion>"suprised"});
            console.log("Substracting 1")
            angry.score = angry.score -1;
            suprised.score = suprised.score -1;
            happy.score = happy.score -1;
            return data;
        }
    ]
)

export const CRarray: CausalityRule[] = [
    gsr1, gsr2
]

