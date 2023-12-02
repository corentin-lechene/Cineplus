import {MovieService} from "@/services/movie.service";
import {TheMovieDbServiceImpl} from "@/api/impl/the-movie-db.service.impl";


export class MovieContainer {
    static getMovieService() {
        return new MovieService(new TheMovieDbServiceImpl());
    }
}