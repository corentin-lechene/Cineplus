import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import Home from "@/views/Home/Home.vue";
import {isConfigured} from "@/router/guards";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/intro',
    component: () => import('@/views/Intro/Intro.vue')
  },
  // {
  //   path: '/subscriptions',
  //   component: () => import('@/views/Intro/Subscriptions')
  // },
  {
    path: '/movie-details/:id',
    component: () => import('@/views/MovieDetails/MovieDetails.vue')
  },
  {
    path: '/search-movie',
    component: () => import('@/views/SearchMovie/SearchMovie.vue')
  },
  /*{
    path: '/dashboard',
    component: () => import('@/views/Dashboard/Dashboard.vue')
  },*/
  {
    path: '/settings',
    component: () => import('@/views/Settings/Settings.vue'),
  },
  {
    path: '/settings/my-account',
    component: () => import('@/views/Settings/components/MyAccount.vue')
  },
  {
    path: '/settings/my-subscriptions',
    component: () => import('@/views/Settings/components/MySubscriptions.vue')
  },
  {
    path: '/settings/privacy-policy',
    component: () => import('@/views/PrivacyPolicy/PrivacyPolicy.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(isConfigured());

export default router
