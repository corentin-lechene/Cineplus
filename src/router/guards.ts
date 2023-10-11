import {NavigationGuardWithThis} from "vue-router";
import {useUserStore} from "@/stores/user";

export function isConfigured(): NavigationGuardWithThis<undefined> {
    return async (to, from, next) => {
        if(to.path === '/intro') {
            return next();
        }

        const userStore = useUserStore();
        await userStore.loadUser();
        if(!userStore.user || !userStore.user.isConfigured) {
            return next({path: '/intro'});
        }

        next();
    }
}