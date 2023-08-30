import {Movie} from "@/models/movie.model";
import {Subscription} from "@/models/subscription.model";

export interface ViewedMovie {
    subscription: Subscription | null;
    movie: Movie;
    viewedAt: Date;
    extra?: number;
    note?: string;
}