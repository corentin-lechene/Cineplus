import {defineStore} from 'pinia'
import {LoyaltyCard, Movie, Subscription, User, WatchedMovie} from "@/models";
import {UserService} from "@/services/user.service";
import {WatchlistActions} from "@/stores/user-actions/watchlist.action";
import {WatchedActions} from "@/stores/user-actions/watched.action";
import {LoyaltyCardActions} from "@/stores/user-actions/loyalty-card.action";
import {SubscriptionActions} from "@/stores/user-actions/subscription.action";

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
        addToWatchedList(movie: WatchedMovie) {
            if (!this.user) return;
            WatchedActions.addToWatchedList(this.user, movie);
            UserService.saveUser(this.user).catch(console.error);
        },
        removeFromWatchedList(movie: Movie) {
            if (!this.user) return;
            WatchedActions.removeFromWatchedList(this.user, movie);
            UserService.saveUser(this.user).catch(console.error);
        },
        createLoyaltyCard(loyaltyCard: LoyaltyCard) {
            if (!this.user) return;
            LoyaltyCardActions.createLoyaltyCard(this.user, loyaltyCard)
            UserService.saveUser(this.user).catch(console.error);
        },
        attachSubscription(subscription: Subscription, loyaltyCard: LoyaltyCard) {
            if (!this.user) return;
            SubscriptionActions.attachSubscription(subscription, loyaltyCard);
            UserService.saveUser(this.user).catch(console.error);
        }
    }
});