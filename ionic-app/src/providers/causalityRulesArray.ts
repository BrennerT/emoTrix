import { CausalityRule } from "./classes/CausalityRule";
import { EmotionScore, emotion } from "./classes/EmotionScore";
import { IndicatorScore, indicator } from "./classes/IndicatorScore";


export var gsr1: CausalityRule = new CausalityRule(
    (indicatorScore: IndicatorScore) => {
        return indicatorScore.indicator == <indicator>"stress" && indicatorScore.score == 1;
    },
    [
        (data: EmotionScore[], indicatorScore: IndicatorScore[]) => {
            var angry = data.find((emotionScore) => {return emotionScore.emotion == <emotion>"angry"});
            var happy = data.find((emotionScore) => {return emotionScore.emotion == <emotion>"happy"});
            var suprised = data.find((emotionScore) => {return emotionScore.emotion == <emotion>"surprised"});
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
        (data: EmotionScore[], indicatorScore: IndicatorScore[]) => {
            var angry = data.find((emotionScore) => {return emotionScore.emotion == <emotion>"angry"});
            var happy = data.find((emotionScore) => {return emotionScore.emotion == <emotion>"happy"});
            var suprised = data.find((emotionScore) => {return emotionScore.emotion == <emotion>"surprised"});
            console.log("Substracting 1")
            angry.score = angry.score -1;
            suprised.score = suprised.score -1;
            happy.score = happy.score -1;
            return data;
        }
    ]
)

let face1: CausalityRule = new CausalityRule(
    (indicatorScore: IndicatorScore) => {
        return indicatorScore.indicator == <indicator>"angryIndicator" && indicatorScore.score != undefined;    
    },[
        (data: EmotionScore[], indicatorScores :IndicatorScore[]) => {
            let angry = data.find((emotionScore) => {return emotionScore.emotion == <emotion>"angry"});
            let angryIndicator = indicatorScores.find((indicatorScore) => {return indicatorScore.indicator == <indicator>"angryIndicator"});
            angry.score = angry.score + 100 * angryIndicator.score;
            return data;
        }
    ]
)

let face2: CausalityRule = new CausalityRule(
    (indicatorScore: IndicatorScore) => {
        return indicatorScore.indicator == <indicator>"happyIndicator" && indicatorScore.score != undefined;    
    },[
        (data: EmotionScore[], indicatorScores :IndicatorScore[]) => {
            let happy = data.find((emotionScore) => {return emotionScore.emotion == <emotion>"happy"});
            let happyIndicator = indicatorScores.find((indicatorScore) => {return indicatorScore.indicator == <indicator>"happyIndicator"});
            happy.score = happy.score + 100 * happyIndicator.score;
            return data;
        }
    ]
)

let face3: CausalityRule = new CausalityRule(
    (indicatorScore: IndicatorScore) => {
        return indicatorScore.indicator == <indicator>"sadIndicator" && indicatorScore.score != undefined;    
    },[
        (data: EmotionScore[], indicatorScores :IndicatorScore[]) => {
            let sad = data.find((emotionScore) => {return emotionScore.emotion == <emotion>"sad"});
            let sadIndicator = indicatorScores.find((indicatorScore) => {return indicatorScore.indicator == <indicator>"sadIndicator"});
            sad.score = sad.score + 100 * sadIndicator.score;
            return data;
        }
    ]
)

let face4: CausalityRule = new CausalityRule(
    (indicatorScore: IndicatorScore) => {
        return indicatorScore.indicator == <indicator>"surpriseIndicator" && indicatorScore.score != undefined;    
    },[
        (data: EmotionScore[], indicatorScores :IndicatorScore[]) => {
            let surprise = data.find((emotionScore) => {return emotionScore.emotion == <emotion>"surprised"});
            let surpriseIndicator = indicatorScores.find((indicatorScore) => {return indicatorScore.indicator == <indicator>"surpriseIndicator"});
            surprise.score = surprise.score + 100 * surpriseIndicator.score;
            return data;
        }
    ]
)
export const CRarray: CausalityRule[] = [
    gsr1, gsr2, face1, face2, face3, face4
]