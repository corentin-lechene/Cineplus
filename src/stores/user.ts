import {defineStore} from 'pinia'
import {Cinema, LoyaltyCard, Movie, Preferences, Profile, Subscription, User, WatchedMovie} from "@/models";
import {UserService} from "@/services/user.service";
import {WatchlistActions} from "@/stores/user-actions/watchlist.action";
import {WatchedActions} from "@/stores/user-actions/watched.action";
import {LoyaltyCardActions} from "@/stores/user-actions/loyalty-card.action";
import {SubscriptionActions} from "@/stores/user-actions/subscription.action";
import dayjs from "@/configs/dayjs.config";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
    }),
    getters: {
        movieWatchedThisMonth(state) {
            if (!state.user) return [];
            return state.user.watchedMovies
                .filter(watchedMovie => dayjs().isSame(watchedMovie.watchedAt, 'month'));
        },
        lastSubscription(state): Subscription | null | undefined {
            if (!state.user) return null;
            return state.user.loyaltyCards
                .flatMap(loyaltyCard => loyaltyCard.subscriptions)
                .toSorted((a, b) => dayjs(a.startAt).isBefore(dayjs(b.startAt)) ? -1 : 1)
                .at(-1);
        },
        sumTicketPrice(state) {
            if (!state.user) return 0;
            const sum = state.user.watchedMovies.reduce((acc, watchedMovie) => acc + watchedMovie.ticketPrice, 0.0);
            return sum / state.user.watchedMovies.length
        },
        movieWatched(state) {
            if (!state.user) return 0;
            return state.user.watchedMovies.filter(watchedMovie => !!watchedMovie.subscription).length;
        },
        extraExpense(state) {
            if (!state.user) return 0;
            return state.user.watchedMovies.reduce((acc, watchedMovie) => acc + (watchedMovie.extraExpense || 0.0), 0.0);
        },
        profit(state) {
            if (!state.user) return 0;
            console.log("-----------------")

            let profit = 0;
            // parcourir les mois de chaque abonnement
            const subscriptions = state.user.loyaltyCards
                .flatMap(loyaltyCard => loyaltyCard.subscriptions)
                .toSorted((a, b) => dayjs(a.startAt).isBefore(dayjs(b.startAt)) ? -1 : 1);
            for (const subscription of subscriptions) {
                profit += SubscriptionActions.getProfitBySubscription(state.user, subscription);
                profit -= SubscriptionActions.getExtraExpenseBySubscription(state.user, subscription);
                console.log("-----------------")
            }

            return profit
        }
    },
    actions: {
        getExtraExpenseBySubscription(subscription: Subscription) {
            if (!this.user) return 0;
            return SubscriptionActions.getExtraExpenseBySubscription(this.user, subscription);
        },
        getProfitBySubscription(subscription: Subscription) {
            if (!this.user) return 0;
            const profit = SubscriptionActions.getProfitBySubscription(this.user, subscription);
            const extraExpense = SubscriptionActions.getExtraExpenseBySubscription(this.user, subscription);
            return profit - extraExpense;
        },
        getTicketEarnedBySubscription(subscription: Subscription) {
            if (!this.user) return 0;
            return SubscriptionActions.getTicketEarnedBySubscription(this.user, subscription);
        },
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
            WatchlistActions.removeFromWatchlist(this.user, movie.movie);
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
        },
        updateSubscription(subscription: Subscription) {
            if (!this.user) return;
            SubscriptionActions.update(subscription, this.user);
            UserService.saveUser(this.user).catch(console.error);
        },
        deleteLoyaltyCard(loyaltyCard: LoyaltyCard) {
            if (!this.user) return;
            LoyaltyCardActions.deleteLoyaltyCard(this.user, loyaltyCard);
            UserService.saveUser(this.user).catch(console.error);
        },
        deleteSubscription(subscription: Subscription) {
            if (!this.user) return;
            SubscriptionActions.delete(subscription, this.user);
            UserService.saveUser(this.user).catch(console.error);
        },
        resetUser() {
            this.user = null;
            UserService.deleteUser().catch(console.error);
        },
        populateUser() {
            this.user = User.of(
                Profile.of('John', 'Doe'),
                Preferences.of(),
            );

            const loyaltyCard = LoyaltyCard.of(0, '', '', '', '');
            this.createLoyaltyCard(loyaltyCard);


            const movie = Movie.of(0, '', '', '', '', new Date(), [], 0);
            const cinema = Cinema.of(0, '', '', 0, '');

            const now = dayjs();
            const subThreeMonth = now.subtract(4, 'month');

            // commencé il y a 3 mois et cela a duré 2 mois
            const sub1 = Subscription.of(0, '', '', 10, 'monthly', subThreeMonth.toDate(), subThreeMonth.add(3, 'month').toDate());
            // commencé 1 mois après le dernier abonnement
            const sub2 = Subscription.of(1, '', '', 20, 'monthly', subThreeMonth.add(2 + 2, 'month').toDate());

            this.attachSubscription(sub1, loyaltyCard);
            this.attachSubscription(sub2, loyaltyCard);

            console.log(dayjs(sub1.startAt).format('LLLL'), ' -> ', dayjs(sub1.endAt).format('LLLL'))
            console.log(dayjs(sub2.startAt).format('LLLL'))
            this.user.watchedMovies.push(
                WatchedMovie.of(movie, cinema, subThreeMonth.add(0, 'month').add(1, 'day').toDate(), 10, sub1),
                WatchedMovie.of(movie, cinema, subThreeMonth.add(0, 'month').add(5, 'day').toDate(), 10, sub1),
                WatchedMovie.of(movie, cinema, subThreeMonth.add(0, 'month').add(8, 'day').toDate(), 10, sub1),
                WatchedMovie.of(movie, cinema, subThreeMonth.add(1, 'month').add(1, 'day').toDate(), 10, sub1),
                WatchedMovie.of(movie, cinema, subThreeMonth.add(1, 'month').add(5, 'day').toDate(), 10, sub1),
                WatchedMovie.of(movie, cinema, subThreeMonth.add(3, 'month').add(1, 'day').toDate(), 15, sub2),
                WatchedMovie.of(movie, cinema, subThreeMonth.add(3, 'month').add(10, 'day').toDate(), 15, sub2, "", "", 0.0123),
            );
            UserService.saveUser(this.user).catch(console.error);
        }
    }
});