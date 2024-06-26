import {Profile} from "@/models/profile.model";
import {Preferences} from "@/models/preference.model";
import {WatchList} from "@/models/watch-list.model";
import {WatchedMovie} from "@/models/watched-movie.model";
import {LoyaltyCard} from "@/models/loyalty-card.model";
import dayjs from "dayjs";

export type Backup = {
    id: string;
    type: "auto" | "manual";
    createdAt: Date;
    data: {
        user: string
    };
}

export class User {
    readonly id: number;
    backup?: Backup;
    profile: Profile;
    preferences: Preferences;
    loyaltyCards: LoyaltyCard[]
    watchList: WatchList[];
    watchedMovies: WatchedMovie[];

    private constructor(id: number, profile: Profile, preferences: Preferences, loyaltyCards: LoyaltyCard[], watchList: WatchList[], watchedMovies: WatchedMovie[]) {
        this.id = id;
        this.profile = profile;
        this.preferences = preferences;
        this.loyaltyCards = loyaltyCards;
        this.watchList = watchList;
        this.watchedMovies = watchedMovies;
    }

    static of(profile: Profile, preferences: Preferences): User {
        return new User(dayjs().unix(), profile, preferences, [], [], []);
    }
}