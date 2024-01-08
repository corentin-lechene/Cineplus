<script lang="ts" setup>

import {IonImg, IonItem, IonPage, IonText} from "@ionic/vue";
import BaseHeader from "@/components/common/BaseHeader.vue";
import BaseContent from "@/components/common/BaseContent.vue";
import {computed, onMounted, ref} from "vue";
import {Subscription, WatchedMovie} from "@/models";
import {useRoute} from "vue-router";
import router from "@/router";
import {useUserStore} from "@/stores/user";
import dayjs from "@/configs/dayjs.config";
import BaseList from "@/components/ui/BaseList.vue";
import MovieListItem from "@/components/movie/MovieListItem.vue";

const userStore = useUserStore();

const subscription = ref<Subscription>();

const watchedMovies = computed(() => {
  if (!userStore.user || !subscription.value) return [];
  return userStore.user.watchedMovies.filter(watchedMovie =>
      watchedMovie.subscription && watchedMovie.subscription.id === subscription.value?.id
  );
})
const startAt = computed(() => {
  if (!subscription.value) return "";
  return dayjs(subscription.value.startAt).format('DD MMMM YYYY');
});
const endAt = computed(() => {
  if (!subscription.value) return "";
  if (!subscription.value.endAt) return "Pas d'expiration"
  return dayjs(subscription.value.endAt).format('DD MMMM YYYY');
});

onMounted(() => {
  const subscriptionId = useRoute().params['subscription_id'] as string;
  const loyaltyCardId = useRoute().params['loyalty_card_id'] as string;
  if (!subscriptionId || !userStore.user) return router.back();

  const loyaltyCard = userStore.user.loyaltyCards.find(lc => lc.id === parseInt(loyaltyCardId));
  if (!loyaltyCard) return router.back();

  subscription.value = loyaltyCard.subscriptions.find(sub => sub.id === parseInt(subscriptionId));
});
</script>

<template>
  <ion-page>
    <BaseHeader title="Détail de l'abonnement"/>
    <BaseContent class="ion-padding">
      <div v-if="!subscription || !userStore.user">Loading...</div>
      <div v-else>

        <div>
          <ion-item class="rounded-t-xl" lines="full">
            <ion-img
                slot="start"
                alt="movie-image"
                class="w-14 h-14 p-0.5 bg-gray-200 rounded-full"
                src="https://upload.wikimedia.org/wikipedia/fr/f/f8/Logo_UGC_2018.svg"
            ></ion-img>
            <div class="flex items-start h-full py-2">
              <div class="flex flex-col relative" style="max-width: 10em">
                <ion-text class="text-xl whitespace-nowrap">{{ subscription.name }}</ion-text>
                <ion-text class="text-sm" color="medium">Du {{ startAt }}</ion-text>
                <ion-text class="text-sm" color="medium">Au {{ endAt }}
                </ion-text>
              </div>
            </div>
          </ion-item>
          <div class="flex justify-around py-4 rounded-b-xl" style="background: white">
            <div class="flex flex-col items-center justify-center text-center">
              <ion-text class="text-lg mb-1">18</ion-text>
              <ion-text class="text-sm leading-3">Nombre de séance</ion-text>
            </div>
            <div class="flex flex-col items-center justify-center text-center">
              <ion-text class="text-lg mb-1">22,90</ion-text>
              <ion-text class="text-sm leading-3">Nombre de séance</ion-text>
            </div>
            <div class="flex flex-col items-center justify-center text-center">
              <ion-text class="text-lg mb-1">8</ion-text>
              <ion-text class="text-sm leading-3">Place économisées</ion-text>
            </div>
          </div>
        </div>

        <BaseList :items="watchedMovies" class="mt-2" title="Tous les films">
          <template #default="{item: watchMovie}: {item: WatchedMovie}">
            <MovieListItem :movie="watchMovie.movie" thumbnail
                           @click="$router.push(`/movies/${watchMovie.movie.id}/details`)"/>
          </template>
        </BaseList>
      </div>
    </BaseContent>
  </ion-page>
</template>

<style scoped>

</style>