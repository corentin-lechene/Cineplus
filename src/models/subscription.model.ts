export interface Subscription {
    id: number;
    brand: string;
    name: string;
    price: number;
    imageUrl: string;
    payment: 'monthly' | 'yearly';
    expireAt: string | null;
    ticketPrice: number;
}