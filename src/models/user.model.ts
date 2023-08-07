import {Movie, Preferences, Subscription} from './index';

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
    watchlist: Movie[];
    preferences: Preferences;
    isConfigured: boolean;
}