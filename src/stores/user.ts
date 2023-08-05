import { defineStore } from 'pinia'
import {User} from "@/models";
import {UserService} from "@/services/user.service";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
        isConfigured: false as boolean,
    }),
    getters: {
        getUser(): User | null {
            return this.user;
        },
        getIsConfigured(): boolean {
            return this.isConfigured;
        }
    },
    actions: {
        async setUser(user: User) {
            await UserService.saveUser(user);

            this.user = user;
            this.isConfigured = true;
        }
    }
});