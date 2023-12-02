import {MovieApiService} from "@/api/movie.api.service";

export class MovieService {
    private movieApiService: MovieApiService;

    constructor(movieApiService: MovieApiService) {
        this.movieApiService = movieApiService;
    }

    async fetchPopularMovies(page: number = 1) {
        return this.movieApiService.fetchPopularMovies(page);
    }

    async fetchIncomingMovies(page: number = 1) {
        return this.movieApiService.fetchIncomingMovies(page);
    }

    async fetchMovieById(id: string) {
        return this.movieApiService.fetchMovieById(id);
    }

    async fetchMoviesByQuery(query: string, page: number = 1) {
        return this.movieApiService.fetchMoviesByQuery(query, page);
    }
}
