import { EmotionScore, emotions } from './../providers/classes/EmotionScore';
import { IndicatorScore, indicator, indicators } from './../providers/classes/IndicatorScore';
export namespace Create {

    export function randomIndicatorScore() : IndicatorScore {
        return {
            indicator : indicators[Math.floor(Math.random()* 10) %indicators.length],
            score: Math.random()
        }
    }

    export function randomEmotionScore() : EmotionScore {
        return {
            emotion: emotions[Math.floor(Math.random() * 10) % emotions.length],
            score: Math.random()
        }
    }

    export function randomArray<T>(generator: () => T, size: number) : T[]{
        var randomArray : T[] = [];
        while(size >= 0){
            randomArray.push(generator());
            size = size - 1;
        }
        return randomArray;
    }

}