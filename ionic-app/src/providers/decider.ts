import { CausalityRule } from './classes/CausalityRule';
import { Injectable } from '@angular/core';
import { IndicatorScore } from './classes/IndicatorScore';
import { EmotionScore, emotions } from './classes/EmotionScore';

@Injectable()
export class Decider {

    data: Array<{timestamp: Date, indicators: IndicatorScore[]}> = [];
    resultData: Array<{timestamp: Date, emotionScores: EmotionScore[]}> = [];
    causalityRules: Array<CausalityRule> = [];

    public addIndicatorScores(indicatorScores: Array<IndicatorScore>){
        //aktuellen Zeitpunkt ermitteln
        var timestamp: Date = this.getTimeStamp();
        //empfangene Daten zu Data hinzufügen
        this.data.push({ timestamp, indicators: indicatorScores });
    }

    public decide(){
        //Iterieren über jeden angegebenen Zeitpunkt und Emotion dazu schätzen
        this.data.forEach(element => {
            this.assumeEmotion(element.timestamp);
        });
    }


    private assumeEmotion(timestamp: Date){
        //Finden der hinterlegten Indicator zu einer Timestamp
        var currentIndicators: Array<IndicatorScore> = this.data.find(e => e.timestamp == timestamp).indicators
        //Ausführen der Kausalitätsregeln auf die aktuellen Indicator; Zurückgeben eines EmotionScoreArrays
        var emotionScores: Array<EmotionScore> = this.executeCausalityRules(currentIndicators);
        //Hinzufügen des EmotionscoreArrays zur ResultData mit gegebener Timestamp
        this.resultData.push({ timestamp: timestamp, emotionScores: emotionScores })
    }

    private executeCausalityRules(indicatorScores: Array<IndicatorScore>){    
        var emotionScores: Array<EmotionScore> = [];
        //Initiales Anlegen der EmotionScores mit Score 0; iteriert über alle im Enum angegebenen Emotionen
        emotions.forEach(emotion => {
            var emotionScore : EmotionScore = {emotion, score: 0};
            emotionScores.push(emotionScore);
        });

        this.causalityRules.forEach((causalityRule) => {
            emotionScores = causalityRule.execute(emotionScores)  
        })
        
        return emotionScores;

    }

    public getTimeStamp = () => {
        var date: Date = new Date();
        return date;
    }

    private applyEffect(emotion: string, value: number, esArray: Array<EmotionScore>){
        var element = esArray.find(e => e.emotion == emotion);
        element.score = element.score + value;
        return esArray;

    }

    public generateGraph(result){
        //TODO: Entwickeln einer grafischen Darstellung der Ergebnisse
    }

}

