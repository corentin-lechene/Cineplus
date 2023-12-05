import {Movie, TheMovieDb} from "@/models";
import {MovieApiService} from "@/api/movie.api.service";

export class TheMovieDbServiceImpl implements MovieApiService {
    private readonly baseUrl: string;
    private readonly options: RequestInit;

    constructor() {
        this.baseUrl = 'https://api.themoviedb.org/3';
        this.options = this.setOptions();
    }

    async fetchPopularMovies(page: number = 1): Promise<Movie[]> {
        try {
            const url = `${this.baseUrl}/movie/now_playing?language=fr&region=fr&page=${page}`;
            const res = await fetch(url, this.options);
            if (!res.ok) {
                return [];
            }

            const data: TheMovieDb.Response = await res.json();
            if (!data || !data.results) return [];
            return data.results.map(this.toMovie);
        } catch (error) {
            return [];
        }
    }

    async fetchIncomingMovies(page: number): Promise<Movie[]> {
        try {
            const url = `${this.baseUrl}/movie/upcoming?language=fr&page=${page}`;
            const res = await fetch(url, this.options);
            if (!res.ok) {
                return [];
            }

            const data: TheMovieDb.Response = await res.json();
            if (!data || !data.results) return [];
            return data.results.map(this.toMovie);
        } catch (e) {
            return [];
        }
    }

    async fetchMovieById(id: string): Promise<Movie> {
        try {
            const url = `${this.baseUrl}/movie/${id}?language=fr`;
            const res = await fetch(url, this.options);
            if (!res.ok) {
                return Movie.of(0, '', '', '', '', new Date(), [], 0);
            }

            const data: TheMovieDb.Movie = await res.json();
            return this.toMovie(data);
        } catch (e) {
            console.error(e);
            throw new Error('Movie not found');
        }
    }

    async fetchMoviesByQuery(query: string, page: number = 1): Promise<Movie[]> {
        try {
            const url = `${this.baseUrl}/search/movie?language=fr&query=${query}&page=${page}`;
            const res = await fetch(url, this.options);
            if (!res.ok) {
                return [];
            }

            const data: TheMovieDb.Response = await res.json();
            if (!data || !data.results) return [];
            return data.results.map(this.toMovie);
        } catch (e) {
            return [];
        }
    }

    protected toMovie(movie: TheMovieDb.Movie): Movie {
        return Movie.of(
            parseInt(movie.id),
            movie.title,
            movie.overview,
            movie.backdrop_path || '',
            movie.poster_path || '',
            new Date(movie.release_date),
            [],
            movie.vote_average
        );
    }

    protected setOptions(): RequestInit {
        return {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_MOVIE_DB_API}`
            },
        };
    }

}
