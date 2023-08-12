import {Movie, Preferences, Subscription, ViewedMovie} from './index';

export interface User {
    subscriptions: Subscription[];
    viewedMovies: ViewedMovie[];
    watchlist: Movie[];
    preferences: Preferences;
    isConfigured: boolean;
}