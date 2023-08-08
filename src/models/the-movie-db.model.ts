export interface TheMovieDb {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface TheMovieDbResponse {
    page: number;
    results: TheMovieDb[];
    total_pages: number;
    total_results: number;
}
