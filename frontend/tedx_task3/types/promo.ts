export interface Promo {
    code: string,
    type: string,
    value: number
}

export const allPromo: (Promo[]) = [
    {
        code: "TEDXEARLY",
        type: "fixed",
        value: 50
    }, {
        code: "STUDENTPASS",
        type: "fixed",
        value: 25
    }, {
        code: "MERCHDROP",
        type: "percentage",
        value: 10
    }
];