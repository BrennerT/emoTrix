export type indicator = "stress" | "angryIndicator" | "happyIndicator"
                        | "sadIndicator" | "supriseIndicator";

export interface IndicatorScore{
    indicator: indicator;
    score: number;  
}
