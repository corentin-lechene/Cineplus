import {Subscription} from "@/models/subscription.model";


export class LoyaltyCard {
    id: number;
    firstname: string;
    lastname: string;
    brand: string;
    imageUrl: string;
    subscriptions: Subscription[];
    createdAt: Date;
    cardNumber?: string;


    private constructor(id: number, firstname: string, lastname: string, brand: string, imageUrl: string, subscriptions: Subscription[], createdAt: Date, cardNumber?: string) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.brand = brand;
        this.imageUrl = imageUrl;
        this.cardNumber = cardNumber;
        this.subscriptions = subscriptions;
        this.createdAt = createdAt;
    }

    static of(id: number, firstname: string, lastname: string, brand: string, imageUrl: string, cardNumber?: string) {
        return new LoyaltyCard(id, firstname, lastname, brand, imageUrl, [], new Date());
    }
}