import { CausalityRule } from './classes/CausalityRule';
import { Injectable } from '@angular/core';
import { IndicatorScore } from './classes/IndicatorScore';
import { EmotionScore, emotions } from './classes/EmotionScore';
import { CRarray } from './causalityRulesArray';

@Injectable()
export class Decider {

    data: Array<{timestamp: Date, indicatorScores: IndicatorScore[]}> = [];
    resultData: Array<{timestamp: Date, emotionScores: EmotionScore[]}> = [];
    causalityRules: Array<CausalityRule> = CRarray;


    public addIndicatorScores(indicatorScores: Array<IndicatorScore>){
        //aktuellen Zeitpunkt ermitteln
        var timestamp: Date = this.getTimeStamp();
        console.log("Added the following to IndicatorScoresArray: " + "{" +  timestamp+ ", indicators: " + indicatorScores[0].indicator +  " "+ indicatorScores[0].score+"}");
        //empfangene Daten zu Data hinzufügen
        this.data.push({ timestamp, indicatorScores: indicatorScores });
    }

    public decide(){
        console.log("Deciding ...");
        //Iterieren über jeden angegebenen Zeitpunkt und Emotion dazu schätzen
        var checked: Array<Date> = [];
        console.log("Size of Array: " + this.data.length);
        this.data.forEach(element => {
            if (!(checked.indexOf(element.timestamp) > -1)){
                console.log("Deciding for " + element.timestamp + " ...");
                this.assumeEmotion(element.timestamp);
                checked.push(element.timestamp);
            } 
        });
    }


    private assumeEmotion(timestamp: Date){
        //Finden der hinterlegten Indicator zu einer Timestamp
        var currentIndicators: Array<IndicatorScore> = this.data.find(e => e.timestamp == timestamp).indicatorScores
        console.log("Found scores")
        //Ausführen der Kausalitätsregeln auf die aktuellen Indicator; Zurückgeben eines EmotionScoreArrays
        var emotionScores: Array<EmotionScore> = this.executeCausalityRules(currentIndicators);
        //Hinzufügen des EmotionscoreArrays zur ResultData mit gegebener Timestamp
        console.log("Timestamp: " + timestamp + ", Score: ");
        emotionScores.forEach((score)=> console.log(score.emotion +": " + score.score));
        this.resultData.push({ timestamp: timestamp, emotionScores: emotionScores })
    }

    private executeCausalityRules(indicatorScores: Array<IndicatorScore>){ 
        console.log("Executing Causality Rules")   
        var emotionScores: EmotionScore[] = [];
        //Initiales Anlegen der EmotionScores mit Score 0; iteriert über alle im Enum angegebenen Emotionen
        emotions.forEach(emotion => {
            var emotionScore : EmotionScore = {emotion, score: 0};
            emotionScores.push(emotionScore);
        });
        console.log("Size of CRarray: " + this.causalityRules.length);
        this.causalityRules.forEach((causalityRule) => {
            emotionScores = causalityRule.execute(emotionScores, indicatorScores)  
        })
        
        return emotionScores;

    }

    public getTimeStamp = () => {
        var date: Date = new Date();
        return date;
    }

    public findFirstTimestamp(arg: String){
        var dates = this.data.map(function(x) { return new Date(x.timestamp); })
        var latest = new Date(Math.max.apply(null,dates));
        var earliest = new Date(Math.min.apply(null,dates));
        if(arg === "min") {return earliest;}
        if(arg === "max") {return latest;}
        return;
    }

    public generateGraph(result){
        //TODO: Entwickeln einer grafischen Darstellung der Ergebnisse
    }

}

