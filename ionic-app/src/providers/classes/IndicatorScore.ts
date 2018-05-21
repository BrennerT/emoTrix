export type indicator = "stress" | "angryIndicator" | "happyIndicator"
                        | "sadIndicator" | "surpriseIndicator" | "contemptIndicator"
                        | "disgustIndicator" | "fearIndicator";

//export var indicators : indicator[] = ["stress", "angryIndicator", 
//                                       "happyIndicator", "sadIndicator", "supriseIndicator"];

export interface IndicatorScore{
    indicator: indicator;
    score: number;  
}
