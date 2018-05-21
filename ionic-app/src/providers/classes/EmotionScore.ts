/*export class EmotionScore{

    static emotions: Array<string> = ["happy","angry", "sad", "suprised"];
    
    emotion: string;
    score: number;
    
    constructor(emotion: string, score: number){
        this.emotion = emotion;
        this.score = score;
    }


}*/

export type emotion = "happy" | "angry" | "sad" | "surprised";

export var emotions : emotion[] = ["happy", "angry", "sad", "surprised"];

export interface EmotionScore {
    emotion: emotion;
    score: number;
}