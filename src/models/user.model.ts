import {Movie, Preferences, Subscription, ViewedMovie} from './index';

export interface User {
    firstname?: string;
    lastname?: string;
    subscriptions: Subscription[];
    viewedMovies: ViewedMovie[];
    watchlist: Movie[];
    preferences: Preferences;
    isConfigured: boolean;
}