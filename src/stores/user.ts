import { defineStore } from 'pinia'
import {User, ViewedMovie} from "@/models";
import {UserService} from "@/services/user.service";
import {PickerColumn, PickerColumnOption} from "@ionic/vue";
import dayjs from "dayjs";

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
            this.user!.watchlist.push({
                id: 1,
                title: "Test",
                overview: "Test",
                posterUrl: "https://image.tmdb.org/t/p/w500/dlFcQNj29jS9t4VLcGUoFefeUTu.jpg",
                backdropUrl: "https://image.tmdb.org/t/p/w500/dlFcQNj29jS9t4VLcGUoFefeUTu.jpg",
                releasedAt: new Date(),
                rating: 2,
            });
            this.user!.viewedMovies.push({
                subscription: {
                    id: 1,
                    name: "Test",
                    ticketPrice: 2,
                    expireAt: null,
                    payment: "monthly",
                    price: 2,
                    imageUrl: "",
                    brand: "Test",
                },
                movie: {
                    id: 1,
                    title: "Test",
                    overview: "Test",
                    posterUrl: "https://image.tmdb.org/t/p/w500/bdYbHxECXsN169pVrTz2TobFqXb.jpg",
                    backdropUrl: "https://image.tmdb.org/t/p/w500/dlFcQNj29jS9t4VLcGUoFefeUTu.jpg",
                    releasedAt: new Date(),
                    rating: 2,
                },
                viewedAt: dayjs().subtract(2, "year").toDate(),
                extra: 9,
                note: "q"
            });
            this.user!.viewedMovies.push({
                subscription: {
                    id: 1,
                    name: "Test",
                    ticketPrice: 2,
                    expireAt: null,
                    payment: "monthly",
                    price: 2,
                    imageUrl: "",
                    brand: "Test",
                },
                movie: {
                    id: 1,
                    title: "Test",
                    overview: "Test",
                    posterUrl: "https://image.tmdb.org/t/p/w500/bdYbHxECXsN169pVrTz2TobFqXb.jpg",
                    backdropUrl: "https://image.tmdb.org/t/p/w500/dlFcQNj29jS9t4VLcGUoFefeUTu.jpg",
                    releasedAt: new Date(),
                    rating: 2,
                },
                viewedAt: new Date(),
                extra: 9,
                note: "q"
            });
            this.user!.viewedMovies.push({
                subscription: {
                    id: 1,
                    name: "Test",
                    ticketPrice: 2,
                    expireAt: null,
                    payment: "monthly",
                    price: 2,
                    imageUrl: "",
                    brand: "Test",
                },
                movie: {
                    id: 1,
                    title: "Test",
                    overview: "Test",
                    posterUrl: "https://image.tmdb.org/t/p/w500/bdYbHxECXsN169pVrTz2TobFqXb.jpg",
                    backdropUrl: "https://image.tmdb.org/t/p/w500/dlFcQNj29jS9t4VLcGUoFefeUTu.jpg",
                    releasedAt: new Date(),
                    rating: 2,
                },
                viewedAt: new Date(),
                extra: 9,
                note: "q"
            });
        },
        async getUser() {
            return this.user ?? await UserService.getUser();
        },
        async setUser(user: User) {
            await UserService.saveUser(user);

            this.user = user;
        },
    }
});