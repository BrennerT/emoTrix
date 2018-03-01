import { Injectable } from '@angular/core';
import { IndicatorScore } from './classes/IndicatorScore';
import { EmotionScore, emotions } from './classes/EmotionScore';

@Injectable()
export class Decider {

    data: Array<{timestamp_id: Date, indicators: Array<IndicatorScore>}>;
    resultData: Array<{timestamp_id: Date, emotionScores: Array<EmotionScore>}>;

    constructor() {

    }

    public addIndicatorScores(indicatorScores: Array<IndicatorScore>){
        //aktuellen Zeitpunkt ermitteln
        var timestamp: Date = this.getTimeStamp();
        //empfangene Daten zu Data hinzufügen
        this.data.push({ timestamp_id: timestamp, indicators: indicatorScores });
    }

    public decide(){
        //Iterieren über jeden angegebenen Zeitpunkt und Emotion dazu schätzen
        this.data.forEach(element => {
            this.assumeEmotion(element.timestamp_id);
        });
        //Graph generieren
        this.generateGraph(this.resultData);
    }


    private assumeEmotion(timestamp: Date){
        //Finden der hinterlegten Indicator zu einer Timestamp
        var currentIndicators: Array<IndicatorScore> = this.data.find(e => e.timestamp_id == timestamp).indicators
        //Ausführen der Kausalitätsregeln auf die aktuellen Indicator; Zurückgeben eines EmotionScoreArrays
        var emotionScores: Array<EmotionScore> = this.executeCausalityRules(currentIndicators);
        //Hinzufügen des EmotionscoreArrays zur ResultData mit gegebener Timestamp
        this.resultData.push({ timestamp_id: timestamp, emotionScores: emotionScores })
    }

    private executeCausalityRules(indicatorScores: Array<IndicatorScore>){    
        var emotionScores: Array<EmotionScore>;
        //Initiales Anlegen der EmotionScores mit Score 0; iteriert über alle im Enum angegebenen Emotionen
        emotions.forEach(emotion => {
            var emotionScore : EmotionScore = {emotion, score: 0};
            emotionScores.push(emotionScore);
        });
        //hier müssen die verschiedenen Kausalitätregeln implementiert werden, die die einzelnen Emotionscores verändern
        emotionScores = this.applyEffect("angry",20, emotionScores);
        emotionScores = this.applyEffect("sad",-10, emotionScores);

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
        //TO-DO
    }

}

