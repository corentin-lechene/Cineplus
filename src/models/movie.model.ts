import {TheMovieDb} from "@/models/the-movie-db.model";

export type BackdropUrls = {
    [key in TheMovieDb.BackdropSize]: string
} | null;
export type PosterUrls = {
    [key in TheMovieDb.PosterSize]: string
} | null;


export class Movie {
    id: number;
    title: string;
    overview: string;
    backdropUrls: BackdropUrls;
    posterUrls: PosterUrls;
    releasedAt: Date;
    genres: TheMovieDb.Genre[];
    rating: number;

    private constructor(id: number, title: string, overview: string, backdropUrls: BackdropUrls, posterUrls: PosterUrls, releasedAt: Date, genres: TheMovieDb.Genre[], rating: number) {
        this.id = id;
        this.title = title;
        this.overview = overview;
        this.backdropUrls = backdropUrls;
        this.posterUrls = posterUrls;
        this.releasedAt = releasedAt;
        this.genres = genres;
        this.rating = rating;
    }

    //todo refaire le lien de l'image
    static of(id: number, title: string, overview: string, backdropPath: string, posterPath: string, releasedAt: Date, genres: TheMovieDb.Genre[], rating: number) {
        return new Movie(id, title, overview, Movie.getBackdropUrls(backdropPath), Movie.getPosterUrls(posterPath), releasedAt, genres, rating);
    }

    private static getBackdropUrls(backdropPath: string): BackdropUrls {
        if (!backdropPath) {
            return null;
        }
        return {
            w300: `https://image.tmdb.org/t/p/w300${backdropPath}`,
            w780: `https://image.tmdb.org/t/p/w780${backdropPath}`,
            w1280: `https://image.tmdb.org/t/p/w1280${backdropPath}`,
            original: `https://image.tmdb.org/t/p/original${backdropPath}`,
        }
    }

    private static getPosterUrls(posterPath: string): PosterUrls {
        if (!posterPath) {
            return null;
        }
        return {
            w92: `https://image.tmdb.org/t/p/w92${posterPath}`,
            w154: `https://image.tmdb.org/t/p/w154${posterPath}`,
            w185: `https://image.tmdb.org/t/p/w185${posterPath}`,
            w342: `https://image.tmdb.org/t/p/w342${posterPath}`,
            w500: `https://image.tmdb.org/t/p/w500${posterPath}`,
            w780: `https://image.tmdb.org/t/p/w780${posterPath}`,
            original: `https://image.tmdb.org/t/p/original${posterPath}`,
        }
    }
}