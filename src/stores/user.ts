import { defineStore } from 'pinia'
import {TheMovieDb, User, ViewedMovie} from "@/models";
import {UserService} from "@/services/user.service";
import {PickerColumn, PickerColumnOption} from "@ionic/vue";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
        selectedYear: {text: 'Tous', value: 'all'} as {text: string | 'all', value: string | 'all'}
    }),
    getters: {
        getViewedMovies(): ViewedMovie[] {
            if(!this.user) return [];
            return this.user.viewedMovies
                .sort((a, b) => b.viewedAt.getTime() - a.viewedAt.getTime())
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
                const year = userMovie.viewedAt.getFullYear().toString();
                if(!columnOptions.find(y => y.value === year)) {
                    columnOptions.push({text: year, value: year});
                }
            }
            return [{name, options: columnOptions}];
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
        addToWatchList(theMovieDb: TheMovieDb) {
            if(!this.user) return;
            this.user.watchlist.push(theMovieDb);
            UserService.saveUser(this.user).catch();
        },
        removeFromWatchList(theMovieDb: TheMovieDb) {
            if(!this.user) return;
            this.user.watchlist = this.user.watchlist.filter(m => m.id !== theMovieDb.id);
            UserService.saveUser(this.user).catch();
        }
    }
});