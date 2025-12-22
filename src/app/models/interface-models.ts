export interface Product {
    name: string;
    description: string;
    price: number;
    details: string;
    picture?: string[];
    id : string;
    category : string;
    state : string;
    createdAt : Date;
    availability : Availability;
    city : string;
    averageStar : number;
    numberOfReviews : number;
}
export interface Availability {
    isAvailable : boolean;
    type : string;
    feed ? : number;
    fromDate? : Date;
    toDate? : Date;
}