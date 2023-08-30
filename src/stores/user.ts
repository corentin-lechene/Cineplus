import {defineStore} from 'pinia'
import {Movie, Subscription, User, ViewedMovie} from "@/models";
import {UserService} from "@/services/user.service";
import {PickerColumn, PickerColumnOption} from "@ionic/vue";
import dayjs from "dayjs";
import {DateUtil} from "@/utils/date.util";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
        selectedYear: {text: 'Tous', value: 'all'} as { text: string | 'all', value: string | 'all' }
    }),
    getters: {
        /* movies */
        watchlist(): Movie[] {
            if (!this.user) return [];
            return this.user.watchlist;
        },
        viewedMovies(): ViewedMovie[] {
            if (!this.user) return [];
            return this.user.viewedMovies
                .sort((a, b) => dayjs(b.viewedAt).diff(dayjs(a.viewedAt)))
                .filter(vm => {
                    if (this.selectedYear.value === "all") return true;
                    return vm.viewedAt.getFullYear().toString() === this.selectedYear.value;
                });
        },
        /* stats */
        profits(): number {
            if(!this.user) return 0;
            if(!this.lastSubscription) return 0;

            let currSub = this.user.subscriptions[0];
            let dateDiff = DateUtil.getDiff(currSub.startAt, currSub.expireAt);
            if(this.user.viewedMovies.length === 0) {
                return -parseFloat((currSub.price * dateDiff).toFixed(2));
            }


            let index = 0;
            let profits1 = 0;

            console.log("-------------- start -----------------")
            for (const subscription of this.user.subscriptions) {
                const viewedMovies = this.user.viewedMovies
                    .filter(vm => vm.subscription?.id === subscription.id)
                    .sort((a, b) => dayjs(a.viewedAt).diff(dayjs(b.viewedAt)));

                if(viewedMovies.length === 0) continue;
                const lastDate = subscription.expireAt ? subscription.expireAt : new Date();
                const diff = DateUtil.getDiff(subscription.startAt, lastDate);

                //(4 * 10) - (17 * 1)
                //(1 * 11) - (17 * 1)
                console.log(`index: ${index} \n(${viewedMovies.length} * ${subscription.ticketPrice}) -\n(${subscription.price} * ${diff})`);
                console.log(`equal: ${viewedMovies.length * subscription.ticketPrice - subscription.price * diff}`)
                profits1 += (
                  viewedMovies.length * subscription.ticketPrice -
                  subscription.price * diff
                );

                console.log("profits1: ", profits1);

                index += 1;
            }

           return parseFloat(profits1.toFixed(2));
        },

        getYears(): PickerColumn[] {
            if (!this.user) return [];
            const name = "years";
            const columnOptions: PickerColumnOption[] = [{text: "Tous", value: "all"}];
            for (const userMovie of this.user.viewedMovies) {
                const year = dayjs(userMovie.viewedAt).year();
                if (!columnOptions.find(y => y.value === year)) {
                    columnOptions.push({text: String(year), value: year});
                }
            }
            return [{name, options: columnOptions}];
        },

        /* subscriptions */
        lastSubscription(): Subscription | null {
            if (!this.user) return null;
            const sub = this.user.subscriptions;
            return sub[sub.length - 1] ?? null;
        }
    },
    actions: {
        /* user */
        async loadUser() {
            this.user = this.user ?? await UserService.getUser();
        },
        async getUser() {
            return this.user ?? await UserService.getUser();
        },
        async setUser(user: User) {
            await UserService.saveUser(user);
            this.user = user;
        },
        async updateUser(user: User) {
            await UserService.saveUser(user);
            this.user = user;
        },
        /* movies */
        addToWatchList(movie: Movie) {
            if (!this.user) return;
            this.user.watchlist.push(movie);
            UserService.saveUser(this.user).catch();
        },
        removeFromWatchList(movie: Movie) {
            if (!this.user) return;
            this.user.watchlist = this.user.watchlist.filter(m => m.id !== movie.id);
            UserService.saveUser(this.user).catch();
        },
        addToViewedMovie(viewedMovie: ViewedMovie) {
            if (!this.user) return;
            this.user.viewedMovies.push(viewedMovie);
            UserService.saveUser(this.user).catch();
        },
        removeFromViewedMovie(viewedMovie: ViewedMovie) {
            if (!this.user) return;
            this.user.viewedMovies = this.user.viewedMovies.filter(vm => vm.movie.id !== viewedMovie.movie.id);
            UserService.saveUser(this.user).catch();
        },
        /* app */
        resetUser() {
            this.user = null;
            UserService.deleteUser().catch();
        }
    }
});