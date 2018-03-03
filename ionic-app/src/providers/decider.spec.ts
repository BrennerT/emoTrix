import { EmotionScore, emotion } from './classes/EmotionScore';
import { CausalityRule } from './classes/CausalityRule';
import { IndicatorScore, indicators } from './classes/IndicatorScore';
import { Decider } from './decider';
import { Create } from '../namespaces/create.namespace';

describe("Decider", () => {

    describe("addIndicatorScores", () => {

        it("adds indicator Scores to the data", () => {
            const target = new Decider();
            const mockNow = new Date();
            const scores = Create.randomArray(Create.randomIndicatorScore, 20);  
            const expected = [{timestamp: mockNow, indicators: scores}]
            
            target.getTimeStamp = () => mockNow;
            target.addIndicatorScores(scores);

            expect(target.data).toEqual(expected);
        })

    })

    describe("decide", () => {

        it("should generade a result data based on target data", () => {

            const target = new Decider();
            const mockNow = new Date(); 
            const expected = [{timestamp: mockNow, emotionScores: [
                {emotion: "happy", score: 0},
                {emotion: "angry", score: 20},
                {emotion: "sad", score: 0},
                {emotion: "suprised", score: 0}
            ]}];

            const rule = new CausalityRule(
                (indicatorScore : IndicatorScore) => {
                    return indicatorScore.indicator == "stress" && indicatorScore.score >= 0.5;
                }, [(data: EmotionScore[]) => {
                    var angry = data.find((element)=>{return element.emotion == "angry"});
                    angry.score = angry.score + 20;
                    return data;
                }]
            );
            
            target.causalityRules.push(rule);
            target.getTimeStamp = () => mockNow;
            target.data = [
                {timestamp: mockNow, indicators: [{indicator: "stress", score: 0.5}]}
            ];

            target.decide();

            expect(target.resultData).toEqual(expected);

        })

    })

})