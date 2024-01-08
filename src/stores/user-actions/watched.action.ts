import {Movie, User, WatchedMovie} from "@/models";

export class WatchedActions {
    static addToWatchedList(user: User, watchedMovie: WatchedMovie) {
        const index = user.watchedMovies.findIndex(watchedMovieUser => watchedMovieUser.movie.id === watchedMovie.movie.id);
        console.log("index: ", index);
        if(index === -1) {
            user.watchedMovies.push(watchedMovie);
        } else {
            user.watchedMovies[index] = watchedMovie;
        }
    }

    static removeFromWatchedList(user: User, movie: Movie) {
        user.watchedMovies = user.watchedMovies.filter(m => m.movie.id !== movie.id);
    }
}