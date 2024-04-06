// movie-db.types.ts

export namespace TheMovieDb {
    export interface Extra {
        belongs_to_collection: any | null;
        budget: number;
        genres: Genre[];
        homepage: string | null;
        imdb_id: string | null;
        production_companies: ProductionCompany[];
        production_countries: ProductionCountry[];
        revenue: number;
        runtime: number | null;
        spoken_languages: SpokenLanguage[];
        status: string;
        tagline: string | null;
    }

    export interface Movie extends Extra {
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

    export interface ProductionCompany {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }

    export interface ProductionCountry {
        iso_3166_1: string;
        name: string;
    }

    export interface SpokenLanguage {
        english_name: string;
        iso_639_1: string;
        name: string;
    }

    export interface Response {
        page: number;
        results: Movie[];
        total_pages: number;
        total_results: number;
    }

    export interface Genre {
        id: number;
        name: string;
    }

    export type PosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
    export type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original';
}
