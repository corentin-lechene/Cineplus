import {NavigationGuardWithThis} from "vue-router";
import {useUserStore} from "@/stores/user";

export function isConfigured(): NavigationGuardWithThis<undefined> {
    return async (to, from, next) => {
        if(to.path === '/intro') {
            return next();
        }

        console.log("isConfigured guard");
        const userStore = useUserStore();
        const user = await userStore.getUser();

        console.log("isConfigured (user): ", user);
        if(!user || !user.isConfigured) {
            return next('/intro');
        }

        next();
    }
}