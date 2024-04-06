import {Movie} from "@/models";

export interface MovieApiService {
    fetchPopularMovies(page: number): Promise<Movie[]>;

    fetchIncomingMovies(page: number): Promise<Movie[]>;

    fetchMovieById(id: string): Promise<Movie>;

    fetchMoviesByQuery(query: string, page: number): Promise<Movie[]>;
}