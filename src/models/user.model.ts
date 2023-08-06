import {Movie, Preferences, Subscription} from './index';

export interface UserMovie {
    subscription: Subscription;
    movie: Movie;
    viewedAt: Date;
    extra: number;
    note: string;
}

export interface User {
    subscriptions: Subscription[];
    movies: UserMovie[];
    watchlist: Movie[];
    preferences: Preferences;
    isConfigured: boolean;
}