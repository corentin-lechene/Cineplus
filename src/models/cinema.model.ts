export class Cinema {
    id: number;
    brand: string;
    name: string;
    ticketPrice: number;

    private constructor(id: number, brand: string, name: string, ticketPrice: number) {
        this.id = id;
        this.brand = brand;
        this.name = name;
        this.ticketPrice = ticketPrice;
    }

    static of(id: number, brand: string, name: string, ticketPrice: number) {
        return new Cinema(id, brand, name, ticketPrice);
    }
}