import {NavigationGuardWithThis} from "vue-router";
import {useUserStore} from "@/stores/user";
import {Preferences, Profile, User} from "@/models";

export function isConfigured(): NavigationGuardWithThis<undefined> {
    return async (to, from, next) => {
        if(to.path === '/intro') {
            return next();
        }

        const userStore = useUserStore();
        await userStore.loadUser();
        const currentUser = userStore.user;
        if(!currentUser) {
            const createUser = User.of(
                Profile.of("Corentin", "lechene"),
                Preferences.of()
            );
            userStore.newUser(createUser);
        } else {
            console.log(currentUser)
        }

        next();
    }
}