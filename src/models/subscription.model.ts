export interface Subscription {
    id: number;
    brand: string;
    name: string;
    price: number;
    imageUrl: string;
    payment: 'monthly' | 'yearly';
    startAt: string;
    expireAt: string | null;
    ticketPrice: number;
    createdAt: Date;
}