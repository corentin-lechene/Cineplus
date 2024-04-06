import {Movie} from "@/models/movie.model";
import {Subscription} from "@/models/subscription.model";
import {Cinema} from "@/models/cinema.model";


export class WatchedMovie {
    movie: Movie;
    cinema: Cinema;
    watchedAt: Date;
    ticketPrice: number;
    subscription?: Subscription;
    room?: string;
    seat?: string;
    extraExpense?: number;
    note?: string;

    private constructor(movie: Movie, cinema: Cinema, watchedAt: Date, ticketPrice: number, subscription?: Subscription, room?: string, seat?: string, extraDepense?: number, note?: string) {
        this.movie = movie;
        this.cinema = cinema;
        this.watchedAt = watchedAt;
        this.ticketPrice = ticketPrice;
        this.subscription = subscription;
        this.room = room;
        this.seat = seat;
        this.extraExpense = extraDepense;
        this.note = note;
    }

    static of(movie: Movie, cinema: Cinema, watchedAt: Date, ticketPrice: number, subscription?: Subscription, room?: string, seat?: string, extraDepense?: number, note?: string) {
        return new WatchedMovie(movie, cinema, watchedAt, ticketPrice, subscription, room, seat, extraDepense, note);
    }
}
