import { IndicatorScore } from './classes/IndicatorScore';
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

})