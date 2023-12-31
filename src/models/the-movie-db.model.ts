export interface TheMovieDbExtra {
    belongs_to_collection: any | null; // Remplacez "any" par le type approprié si nécessaire
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

export interface TheMovieDb extends TheMovieDbExtra {
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


export interface TheMovieDbResponse {
    page: number;
    results: TheMovieDb[];
    total_pages: number;
    total_results: number;
}

export interface Genre {
    id: number;
    name: string;
}