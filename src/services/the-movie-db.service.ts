import {TheMovieDb, TheMovieDbResponse} from "@/models";

export class TheMovieDbService {
    protected static setOptions() {
        return {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_MOVIE_DB_API}`
            }
        };
    }

    static async fetchMovieById(id: string): Promise<TheMovieDb | null> {
        try {
            const url = `https://api.themoviedb.org/3/movie/${id}?language=fr`;
            const options = TheMovieDbService.setOptions();
            const res = await fetch(url, options);
            if (!res.ok) {
                return null;
            }

            const data = await res.json();
            return data as TheMovieDb;
        } catch(e) {
            console.error(e);
            return null;
        }
    }

    static async fetchPopularMovies(): Promise<TheMovieDb[]> {
        try {
            const url = `https://api.themoviedb.org/3/movie/now_playing?language=fr&region=fr`;
            const options = TheMovieDbService.setOptions();
            const res = await fetch(url, options);
            if (!res.ok) {
                return [];
            }

            const data: TheMovieDbResponse = await res.json();
            if(!data || !data.results) return [];
            return data.results;
        } catch(e) {
            console.error(e);
            return [];
        }
    }

}