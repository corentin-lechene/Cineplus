import {TheMovieDb, TheMovieDbResponse} from "@/models";

export class TheMovieDbService {
    static async fetchMovieById(id: string): Promise<TheMovieDb | null> {
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
            return data as TheMovieDb;
        } catch(e) {
            console.error(e);
            return null;
        }
    }

    static async fetchMoviesByText(input: string): Promise<TheMovieDb[]> {
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
            const data: TheMovieDbResponse = await res.json();
            return data?.results;
        } catch(e) {
            console.error(e);
            return [];
        }
    }

    static async fetchPopularMovies(): Promise<TheMovieDb[]> {
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
            const data: TheMovieDbResponse = await res.json();
            return data?.results;
        } catch(e) {
            console.error(e);
            return [];
        }
    }
}