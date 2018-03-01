export class EmotionScore{

    static emotions: Array<string> = ["happy","angry", "sad", "suprised"];
    
    emotion: string;
    score: number;
    
    constructor(emotion: string, score: number){
        this.emotion = emotion;
        this.score = score;
    }


}