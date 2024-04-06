export class Cinema {
    id: number;
    brand: string;
    name: string;
    ticketPrice: number;
    address: string;

    private constructor(id: number, brand: string, name: string, ticketPrice: number, address: string) {
        this.id = id;
        this.brand = brand;
        this.name = name;
        this.ticketPrice = ticketPrice;
        this.address = address;
    }

    static of(id: number, brand: string, name: string, ticketPrice: number, address: string) {
        return new Cinema(id, brand, name, ticketPrice, address);
    }
}