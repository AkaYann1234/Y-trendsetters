export interface product {
    name: string;
    description: string;
    price: number;
    details: string;
    picture?: string[];
    id : string;
    category : string;
    state : string;
    createdAt : Date;
    avalibility : avalibility;
    city : string;
    averageStar : number;
    numberOfReviews : number;
}
export interface avalibility {
    isAvailable : boolean;
    type : string;
    feed ? : number;
    fromDate? : Date;
    toDate? : Date;
}