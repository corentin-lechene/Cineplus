import {defineStore} from "pinia";
import {Genre} from "@/models";
import {TheMovieDbService} from "@/services/the-movie-db.service";

export const useGenreStore = defineStore('genre', {
    state: () => ({
        genres: [] as Genre[],
    }),
    getters: {

    },
    actions: {
        async loadGenres() {
            this.genres = this.genres.length > 0 ?
                this.genres :
                await TheMovieDbService.fetchGenres();
        },
        toGenres(genreIds: number[]): Genre[] {
            if(this.genres.length <= 0) return [];
            return genreIds.map(id => this.genres.find(g => g.id === id)!);
        },
    },
});