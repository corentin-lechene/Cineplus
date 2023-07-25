import Movie from "@/models/Movie";
import MovieSave from "@/models/MovieSave";
import dayjs from "dayjs";
import {Storage} from "@ionic/storage";
import {StorageEnum} from "@/models/StorageEnum";

export class MovieService {
    static async saveMovie(movie: Movie, extra: number, viewedAt: Date) {
        const currViewedMovie = await MovieService.getViewedMovies();
        if(currViewedMovie.some(m => m.id === movie.id)) {
            return false;
        }

        const movieSave = new MovieSave(
            movie.id,
            movie.title,
            movie.url,
            movie.backdropUrl,
            movie.description,
            movie.vote_average,
            movie.release_date,
            dayjs(viewedAt).format('DD MMMM YYYY'),
            extra
        );

        try {
            await MovieService.saveViewedMovies(movieSave);
            return true;
        } catch(e) {
            console.amountError(e);
            return false;
        }
    }

    static async getViewedMovies(): Promise<MovieSave[]> {
        try {
            const storage = new Storage();
            await storage.create();

            const viewed = await storage.get(StorageEnum.viewedMovies);
            return viewed === null ? [] : JSON.parse(viewed) as MovieSave[];
        } catch(e) {
            console.amountError(e);
            return [];
        }
    }

    protected static async saveViewedMovies(movieSave: MovieSave) {
            const storage = new Storage();
            await storage.create();

            const currViewedMovie = await MovieService.getViewedMovies();

            if(currViewedMovie.some(m => m.id === movieSave.id)) {
                throw new Error("Vous avez déjà vu ce film");
            }

        try {
            currViewedMovie.push(movieSave);
            await storage.set(StorageEnum.viewedMovies, JSON.stringify(currViewedMovie));
        } catch(e) {
            console.amountError(e);
        }
    }

    static async isMovieViewed(id: string) {
        const currViewedMovie = await MovieService.getViewedMovies();
        return currViewedMovie.find(m => m.id === parseInt(id));
    }
}