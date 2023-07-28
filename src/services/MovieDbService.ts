import Movie from "../models/Movie";
import {MovieDb, MovieDbResult} from "@/models/MovieDb";
import dayjs from "dayjs";


export class MovieDbService {
    static formatMovie(movie: MovieDb): Movie {
        return {
            id: movie.id,
            title: movie.title,
            url: `https://image.tmdb.org/t/p/w500${movie.poster_path}` || '',
            backdropUrl: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` || '',
            description: movie.overview,
            release_date: dayjs(movie.release_date).format('DD MMMM YYYY'),
            vote_average: movie.vote_average.toFixed(2),
        };
    }

    static formatMovies(movies: MovieDbResult): Movie[] {
        return movies.results.map(movie => this.formatMovie(movie));
    }

    static async fetchMovieById(id: string): Promise<Movie> {
        try {
            const url = `https://api.themoviedb.org/3/movie/${id}?language=fr`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_MOVIE_DB_API}`
                }
            };
            const res = await fetch(url, options);
            const data = await res.json();
            return this.formatMovie(data as MovieDb);
        } catch(e) {
            console.error(e);
            return {} as Movie;
        }
    }

    static async fetchMoviesByInput(input: string): Promise<Movie[]> {
        try {
            const url = `https://api.themoviedb.org/3/search/movie?query=${input}&language=fr`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_MOVIE_DB_API}`
                }
            };
            const res = await fetch(url, options);
            const data = await res.json();
            return this.formatMovies(data as MovieDbResult);
        } catch(e) {
            console.error(e);
            return [];
        }
    }

    static async fetchPopularMovies() {
        try {
            const url = `https://api.themoviedb.org/3/movie/now_playing?language=fr&region=fr`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_MOVIE_DB_API}`
                }
            };
            const res = await fetch(url, options);
            const data = await res.json();
            return this.formatMovies(data as MovieDbResult);
        } catch(e) {
            console.error(e);
            return [];
        }
    }
}