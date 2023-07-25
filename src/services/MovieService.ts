import Movie from "@/models/Movie";
import MovieSave from "@/models/MovieSave";
import dayjs from "dayjs";

export class MovieService {
    static async saveMovie(movie: Movie, extra: number, viewedAt: Date) {
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

        console.log("movieSave: ", movieSave);
    }
}