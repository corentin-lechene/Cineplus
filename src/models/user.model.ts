import {Movie, Preferences, Subscription, TheMovieDb} from './index';

export interface ViewedMovie {
    subscription: Subscription;
    movie: Movie;
    viewedAt: Date;
    extra: number;
    note: string;
}

export interface User {
    subscriptions: Subscription[];
    viewedMovies: ViewedMovie[];
    watchlist: TheMovieDb[];
    preferences: Preferences;
    isConfigured: boolean;
}