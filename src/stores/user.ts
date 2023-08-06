import { defineStore } from 'pinia'
import {User} from "@/models";
import {UserService} from "@/services/user.service";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null
    }),
    getters: {
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
    }
});