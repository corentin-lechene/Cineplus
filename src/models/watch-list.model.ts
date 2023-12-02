import {Movie} from "@/models/movie.model";

export class WatchList {
    movie: Movie;

    private constructor(movie: Movie) {
        this.movie = movie;
    }

    static of(movie: Movie) {
        return new WatchList(movie);
    }
}