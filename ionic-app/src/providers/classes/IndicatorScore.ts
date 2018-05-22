export type indicator = "activation" | "angryIndicator" | "happyIndicator"
                        | "sadIndicator" | "surpriseIndicator" | "contemptIndicator"
                        | "disgustIndicator" | "fearIndicator";

//export var indicators : indicator[] = ["activation", "angryIndicator", 
//                                       "happyIndicator", "sadIndicator", "supriseIndicator"];

export interface IndicatorScore{
    indicator: indicator;
    score: number;  
}
