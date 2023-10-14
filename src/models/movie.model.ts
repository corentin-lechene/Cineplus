import {Genre} from "@/models/the-movie-db.model";

export interface PosterSize {
    w92: string;
    w154: string;
    w185: string;
    w342: string;
    w500: string;
    w780: string;
    original: string;
}

export interface BackdropSize {
    w300: string;
    w780: string;
    w1280: string;
    original: string;
}

export interface Movie {
    id: number;
    title: string;
    overview: string;
    posterUrl: PosterSize;
    hasPoster: boolean;
    backdropUrl: BackdropSize;
    hasBackdrop: boolean;
    releasedAt: Date;
    genres: Genre[]
    rating: number;
}