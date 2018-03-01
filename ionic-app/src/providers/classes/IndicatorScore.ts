export type indicator = "stress" | "angryIndicator" | "happyIndicator"
                        | "sadIndicator" | "supriseIndicator";

export var indicators : indicator[] = ["stress", "angryIndicator", 
                                       "happyIndicator", "sadIndicator", "supriseIndicator"];

export interface IndicatorScore{
    indicator: indicator;
    score: number;  
}
