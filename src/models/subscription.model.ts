export interface Subscription {
    id: number;
    brand: string;
    name: string;
    price: number;
    imageUrl: string;
    payment: 'monthly' | 'yearly';
    expireAt: Date | null; // Iso String
    ticketPrice: number;
}