import {defineStore} from 'pinia'
import {Movie, User} from "@/models";
import {UserService} from "@/services/user.service";
import {WatchlistActions} from "@/stores/user-actions/watchlist.action";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
    }),
    getters: {

    },
    actions: {
        newUser(user: User) {
            this.user = user;
            UserService.saveUser(user).catch(console.error);
        },
        updateUser(user: User) {
            this.user = user;
            UserService.saveUser(user).catch(console.error);
        },
        async loadUser() {
            this.user = await UserService.getUser();
        },
        reloadUser() {
            this.loadUser().catch(console.error);
        },
        addToWatchList(movie: Movie) {
            if (!this.user) return;
            WatchlistActions.addToWatchlist(this.user, movie);
            UserService.saveUser(this.user).catch(console.error);
        },
        removeFromWatchList(movie: Movie) {
            if (!this.user) return;
            WatchlistActions.removeFromWatchlist(this.user, movie);
            UserService.saveUser(this.user).catch(console.error);
        },
        // markAsWatched: markAsWatched.bind(this),
        // addLoyaltyCard: addLoyaltyCard.bind(this),
    }
});