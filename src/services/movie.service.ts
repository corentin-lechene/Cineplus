import {Movie, TheMovieDb} from "@/models";
import {TheMovieDbService} from "@/services/the-movie-db.service";

export class MovieService {
    static async fetchMovieById(id: string): Promise<Movie | null> {
        try {
            const response = await TheMovieDbService.fetchMovieById(id);
            if(!response) {
                return null;
            }

            return MovieService.toMovie(response);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async fetchByText(input: string, page: number = 1): Promise<Movie[]> {
        try {
            const response = await TheMovieDbService.fetchByText(input, page);
            if(response.length === 0) {
                return [];
            }

            const movies = response.map(m => MovieService.toMovie(m));
            return Promise.all(movies);
        } catch(e) {
            console.error(e);
            return [];
        }
    }

    static async fetchPopularMovies(page: number = 1): Promise<Movie[]> {
        try {
            const response = await TheMovieDbService.fetchPopularMovies(page);
            if(response.length === 0) {
                return [];
            }

            const movies = response.map(m => MovieService.toMovie(m));
            return Promise.all(movies);
        } catch(e) {
            console.error(e);
            return [];
        }
    }

    /*  */
    static async toMovie(theMovieDb: TheMovieDb): Promise<Movie> {
        return {
            id: parseInt(theMovieDb.id),
            title: theMovieDb.title,
            overview: theMovieDb.overview,
            hasPoster: !!theMovieDb.poster_path,
            posterUrl: {
                w92: `https://image.tmdb.org/t/p/w92${theMovieDb.poster_path}`,
                w154: `https://image.tmdb.org/t/p/w154${theMovieDb.poster_path}`,
                w185: `https://image.tmdb.org/t/p/w185${theMovieDb.poster_path}`,
                w342: `https://image.tmdb.org/t/p/w342${theMovieDb.poster_path}`,
                w500: `https://image.tmdb.org/t/p/w500${theMovieDb.poster_path}`,
                w780: `https://image.tmdb.org/t/p/w780${theMovieDb.poster_path}`,
                original: `https://image.tmdb.org/t/p/original${theMovieDb.poster_path}`,
            },
            hasBackdrop: !!theMovieDb.backdrop_path,
            backdropUrl: {
                w300: `https://image.tmdb.org/t/p/w300${theMovieDb.backdrop_path}`,
                w780: `https://image.tmdb.org/t/p/w780${theMovieDb.backdrop_path}`,
                w1280: `https://image.tmdb.org/t/p/w1280${theMovieDb.backdrop_path}`,
                original: `https://image.tmdb.org/t/p/original${theMovieDb.backdrop_path}`,
            },
            releasedAt: new Date(theMovieDb.release_date),
            rating: parseFloat(theMovieDb.vote_average.toFixed(2)),
        }
    }
}