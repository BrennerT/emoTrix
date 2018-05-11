import { EmotionScore, emotion, emotions } from './EmotionScore';
import { indicator} from './IndicatorScore';
import { CausalityRule } from './CausalityRule';
import { Create } from '../../namespaces/create.namespace';

describe("CausalityRule", () => {

    describe("execute", () => {

        it("should apply all effects if condition is met", () => {

            const target = new CausalityRule(
                () => true,
                [
                    (data: EmotionScore[]) => {
                        var angry = data.find((emotionScore) => {return emotionScore.emotion == <emotion>"angry"});
                        angry.score = angry.score * 2;
                        return data;
                    }
                ]
            );
            
            const dataMock = [{emotion: <emotion>"angry", score: 0.5}];
            var expected = [{emotion: <emotion>"angry", score: 1}];
            var indicatorScores = [{indicator: <indicator>"stress", score: 1}];

            var result = target.execute(dataMock, indicatorScores);            
            expect(result).toEqual(expected)
        })

    })

})