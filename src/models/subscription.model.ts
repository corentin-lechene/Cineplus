export type SubscriptionPayment = 'monthly' | 'yearly';

export class Subscription {
    id: number;
    brand: string;
    name: string;
    price: number;
    payment: SubscriptionPayment
    startAt: Date;
    endAt?: Date;
    createdAt: Date;

    private constructor(id: number, brand: string, name: string, price: number, payment: SubscriptionPayment, startAt: Date, createdAt: Date, endAt?: Date) {
        this.id = id;
        this.brand = brand;
        this.name = name;
        this.price = price;
        this.payment = payment;
        this.startAt = startAt;
        this.endAt = endAt;
        this.createdAt = createdAt;
    }

    static of(id: number, brand: string, name: string, price: number, payment: SubscriptionPayment, startAt: Date, endAt?: Date) {
        return new Subscription(id, brand, name, price, payment, startAt, new Date(), endAt);
    }
}