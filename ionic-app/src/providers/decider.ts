import { CausalityRule } from './classes/CausalityRule';
import { Injectable } from '@angular/core';
import { IndicatorScore } from './classes/IndicatorScore';
import { EmotionScore, emotions } from './classes/EmotionScore';
import { CRarray } from './causalityRulesArray';

@Injectable()
export class Decider {

    data: Array<{timestamp: number, indicatorScores: IndicatorScore[]}> = [];
    resultData: Array<{timestamp: number, emotionScores: EmotionScore[]}> = [];
    causalityRules: Array<CausalityRule> = CRarray;


    public addIndicatorScores(indicatorScores: Array<IndicatorScore>){
        //aktuellen Zeitpunkt ermitteln
        var timestamp: number = this.getTimeStamp();
        console.log("Added the following to IndicatorScoresArray: " + "{" +  timestamp+ ", indicators: " + indicatorScores[0].indicator +  " "+ indicatorScores[0].score+"}");
        //empfangene Daten zu Data hinzufügen
        this.data.push({ timestamp, indicatorScores: indicatorScores });
    }

    public decide(){
        console.log("Deciding ...");
        //Iterieren über jeden angegebenen Zeitpunkt und Emotion dazu schätzen
        let start: number = this.findRange().start;
        let end: number = this.findRange().end;
        console.log("Size of Array: " + this.data.length);
        for(var i:number = start; i<=end; i= i+ 10000){
                var j: number = i + 9999;
                console.log("i: " + i + ", j: " + j);
                this.assumeEmotion(i, j);
        } 
    }


    private assumeEmotion(start: number, end: number){
        //Finden der hinterlegten Indicator zu einer Timestamp
        let currentIndicators = this.data.filter(e => e.timestamp >= start && e.timestamp <= end)
        console.log("Found scores")
        //Ausführen der Kausalitätsregeln auf die aktuellen Indicator; Zurückgeben eines EmotionScoreArrays
        var emotionScores: Array<EmotionScore> = this.executeCausalityRules(currentIndicators);
        //Hinzufügen des EmotionscoreArrays zur ResultData mit gegebener Timestamp
        console.log("Start Timestamp: " + start + ", Score: ");
        emotionScores.forEach((score)=> console.log(score.emotion +": " + score.score));
        this.resultData.push({ timestamp: start, emotionScores: emotionScores })
    }

    private executeCausalityRules(data: Array<{timestamp: number, indicatorScores: IndicatorScore[]}>){ 
        console.log("Executing Causality Rules")   
        var emotionScores: EmotionScore[] = [];
        //Initiales Anlegen der EmotionScores mit Score 0; iteriert über alle im Enum angegebenen Emotionen
        emotions.forEach(emotion => {
            var emotionScore : EmotionScore = {emotion, score: 0};
            emotionScores.push(emotionScore);
        });
        console.log("Size of CRarray: " + this.causalityRules.length);
        data.forEach((e) =>  { 
        this.causalityRules.forEach((causalityRule) => {
            emotionScores = causalityRule.execute(emotionScores, e.indicatorScores)  ;
        }) }
        )
        
        return emotionScores;

    }

    public getTimeStamp = () => {
        var date: Date = new Date();
        return date.getTime();
    }

    public findRange(){
        var dates = this.data.map(function(x) { return x.timestamp; })
        var latest = Math.max.apply(null,dates);
        var earliest = Math.min.apply(null,dates);
        return{ start: earliest, end: latest };
    }

    public generateGraph(result){
        //TODO: Entwickeln einer grafischen Darstellung der Ergebnisse
    }

}

