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

    // static async fetchMoviesByText(input: string): Promise<Movie[]> {
    //     try {
    //         const url = `https://api.themoviedb.org/3/search/movie?query=${input}&language=fr`;
    //         const options = TheMovieDbService.setOptions();
    //         const res = await fetch(url, options);
    //         if (!res.ok) {
    //             return [];
    //         }
    //
    //         const data: TheMovieDbResponse = await res.json();
    //         if(!data || !data.results) return [];
    //         const movies = data.results.map(m => TheMovieDbService.toMovie(m));
    //         return Promise.all(movies);
    //     } catch(e) {
    //         console.error(e);
    //         return [];
    //     }
    // }

    static async fetchPopularMovies(): Promise<Movie[]> {
        try {
            const response = await TheMovieDbService.fetchPopularMovies();
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
            posterUrl: {
                w92: `https://image.tmdb.org/t/p/w92${theMovieDb.poster_path}`,
                w154: `https://image.tmdb.org/t/p/w154${theMovieDb.poster_path}`,
                w185: `https://image.tmdb.org/t/p/w185${theMovieDb.poster_path}`,
                w342: `https://image.tmdb.org/t/p/w342${theMovieDb.poster_path}`,
                w500: `https://image.tmdb.org/t/p/w500${theMovieDb.poster_path}`,
                w780: `https://image.tmdb.org/t/p/w780${theMovieDb.poster_path}`,
                original: `https://image.tmdb.org/t/p/original${theMovieDb.poster_path}`,
            },
            backdropUrl: {
                w300: `https://image.tmdb.org/t/p/w300${theMovieDb.backdrop_path}`,
                w780: `https://image.tmdb.org/t/p/w780${theMovieDb.backdrop_path}`,
                w1280: `https://image.tmdb.org/t/p/w1280${theMovieDb.backdrop_path}`,
                original: `https://image.tmdb.org/t/p/original${theMovieDb.backdrop_path}`,
            },
            releasedAt: new Date(theMovieDb.release_date),
            rating: theMovieDb.vote_average,
        }
    }
}