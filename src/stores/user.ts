import { defineStore } from 'pinia'
import {Movie, Subscription, User, ViewedMovie} from "@/models";
import {UserService} from "@/services/user.service";
import {PickerColumn, PickerColumnOption} from "@ionic/vue";
import dayjs from "dayjs";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
        selectedYear: {text: 'Tous', value: 'all'} as {text: string | 'all', value: string | 'all'}
    }),
    getters: {
        viewedMovies(): ViewedMovie[] {
            if(!this.user) return [];
            console.log("this.user.viewedMovies: ", this.user.viewedMovies);
            return this.user.viewedMovies
                .sort((a, b) => dayjs(b.viewedAt).unix() - dayjs(a.viewedAt).unix())
                .filter(vm => {
                    if(this.selectedYear.value === "all") return true;
                    return vm.viewedAt.getFullYear().toString() === this.selectedYear.value;
                });
        },
        getYears(): PickerColumn[] {
            if(!this.user) return [];
            const name = "years";
            const columnOptions: PickerColumnOption[] = [{text: "Tous", value: "all"}];
            for (const userMovie of this.user.viewedMovies) {
                const year = dayjs(userMovie.viewedAt).year();
                if(!columnOptions.find(y => y.value === year)) {
                    columnOptions.push({text: String(year), value: year});
                }
            }
            return [{name, options: columnOptions}];
        },

        /* subscriptions */
        lastSubscription(): Subscription | null {
            if(!this.user) return null;
            const sub = this.user.subscriptions;
            return sub[sub.length - 1] ?? null;
        }
    },
    actions: {
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
        /* movies */
        addToWatchList(movie: Movie) {
            if(!this.user) return;
            this.user.watchlist.push(movie);
            UserService.saveUser(this.user).catch();
        },
        removeFromWatchList(movie: Movie) {
            if(!this.user) return;
            // this.user.watchlist = this.user.watchlist.filter(m => m.id !== parseInt(movie.id));
            // UserService.saveUser(this.user).catch();
        },
        addMovieToViewed(viewedMovie: ViewedMovie) {
            if(!this.user) return;
            this.user.viewedMovies.push(viewedMovie);
            UserService.saveUser(this.user).catch();
        },
        removeMovieFromViewed(viewedMovie: ViewedMovie) {
            if(!this.user) return;
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