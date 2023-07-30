export interface Subscription {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    type: 'yearly' | 'monthly';
    ticketPrice: number;
}