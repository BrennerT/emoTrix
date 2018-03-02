import { EmotionScore, emotion, emotions } from './EmotionScore';
import { indicator} from './IndicatorScore';
import { CausalityRule } from './CausalityRule';
import { Create } from '../../namespaces/create.namespace';

describe("CausalityRule", () => {

    describe("execute", () => {

        it("should apply all effects if condition is met", () => {

            const target = new CausalityRule();
            const dataMock = [{emotion: emotions[1], score: 0.5}];
            var expected = [{emotion: emotions[1], score: 1}];

            target.condition = () => true;
            target.effects = [
                (data: EmotionScore[]) => {
                    var angry = data.find((emotionScore) => {return emotionScore.emotion == emotions[1]});
                    angry.score = angry.score * 2;
                    return data;
                }
            ]
            
            var result = target.execute(dataMock);            
            expect(result).toEqual(expected)
        })

    })

})