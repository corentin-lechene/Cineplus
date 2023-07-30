import {Movie, Preferences, Subscription} from './index';

export interface UserMovie {
    subscription: Subscription;
    movies: Movie;
    viewedAt: Date;
    extra: number;
    note: string;
}

export interface User {
    subscriptions: Subscription[];
    movies: UserMovie[];
    preferences: Preferences;
}