import {Movie, User, WatchList} from "@/models";

export class WatchlistActions {
    static addToWatchlist(user: User, movie: Movie) {
        const watchListMovie = WatchList.of(movie);
        user.watchList.push(watchListMovie);
    }

    static removeFromWatchlist(user: User, movie: Movie) {
        user.watchList = user.watchList.filter(m => m.movie.id !== movie.id);
    }
}