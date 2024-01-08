import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import HomePage from '@/views/HomePage/HomePage.vue'
import MainLayout from "@/layouts/MainLayout.vue";
import {isConfigured} from "@/router/guards";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                redirect: '/home',
            },
            {
                path: 'home',
                component: () => import('@/views/HomePage/HomePage.vue'),
            },
            {
                path: 'dashboard',
                component: () => import('@/views/HomePage/HomePage.vue'),
            },
            {
                path: 'movies/search',
                component: () => import('@/views/MoviesSearchPage/MoviesSearchPage.vue'),
            },
        ],
    },
    /*{
      path: '/onboarding',
      component: () => import('@/views/Onboarding/Onboarding.vue'),
    },*/
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: HomePage,
    },
    /*{
      path: '/movies/search',
      component: () => import('@/views/Movies/SearchMovies.vue'),
    },
    {
      path: '/movies/watch-list',
      component: () => import('@/views/Movies/WatchList.vue'),
    },
    {
      path: '/movies/watched',
      component: () => import('@/views/Movies/WatchedMovies.vue'),
    },*/
    {
        path: '/movies/watched/new',
        component: () => import('@/views/SaveMoviePage.vue'),
    },
    {
        path: '/movies/:movie_id/details',
        component: () => import('@/views/MovieDetailsPage/MovieDetailsPage.vue'),
    },
    /*{
      path: '/dashboard',
      component: () => import('@/views/Dashboard/Dashboard.vue'),
    },
    */
    {
        path: '/settings',
        component: () => import('@/views/Settings/Settings.vue'),
    },/*
    {
      path: 'account',
      component: () => import('@/views/Settings/Account.vue'),
    },*/
    {
        path: '/loyalty-cards',
        component: () => import('@/views/LoyaltyCardsPage.vue'),
    },
    {
        path: '/loyalty-cards/:loyalty_card_id',
        component: () => import('@/views/LoyaltyCardsDetailPage.vue'),
    },
    {
        path: '/loyalty-cards/:loyalty_card_id/subscriptions/:subscription_id',
        component: () => import('@/views/SubscriptionDetail.vue'),
    },/*
    {
      path: 'subscription/new',
      component: () => import('@/views/Settings/NewSubscription.vue'),
    },
    {
      path: 'advertisement',
      component: () => import('@/views/Settings/Advertisement.vue'),
    },
    {
      path: 'dark-mode',
      component: () => import('@/views/Settings/DarkMode.vue'),
    },
    {
      path: 'language',
      component: () => import('@/views/Settings/Language.vue'),
    },
    {
      path: 'notifications',
      component: () => import('@/views/Settings/Notifications.vue'),
    },*/
    {
        path: '/privacy-policy',
        component: () => import('@/views/PrivacyPolicy.vue')
    }
];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach(isConfigured());

export default router
