<script setup lang="ts">
import {IonCard, IonCardContent, IonLabel} from "@ionic/vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import AppButton from "@/components/buttons/AppButton.vue";
import 'swiper/css';

import {useUserStore} from "@/stores/user";
import {onMounted} from "vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.loadUser();
})

</script>

<template>
  <ion-label color="dark" class="text-2xl px-4">Ma Liste</ion-label>
<!--  todo refaire ici l'espace est mauvais-->
  <Swiper
      v-if="userStore.user && userStore.user.watchlist.length > 0"
      :slides-per-view="userStore.user.watchlist.length === 1 ? 1 : 1.10"
      :space-between="-5"
      allow-touch-move
      autoplay
      loop
  >
    <SwiperSlide v-for="movie in userStore.user?.watchlist || []">
      <ion-card color="warning" class="py-1">
        <ion-card-content class="flex justify-center">
          <div class="relative flex justify-center w-full">
            <img
                v-if="movie.backdrop_path"
                class="rounded-lg"
                :src="`https://image.tmdb.org/t/p/w400${movie.backdrop_path}`"
                alt="img"
            />
            <div v-else class="flex h-40">
              <ion-label class="mt-10" color="dark">Aucune image fournie</ion-label>
            </div>
            <div class="flex justify-center absolute w-full h-2/6 bottom-0 rounded-b-lg bg-black bg-opacity-60">
              <ion-label class="text-center mt-1" color="light">{{ movie.title }}</ion-label>
            </div>
            <AppButton
                class="absolute w-44 -bottom-3.5 shadow-lg"
                color="dark"
                text="Détail du film"
                dense
                @onTap="$router.push(`movie-details/${movie.id}`)"
            />
          </div>
        </ion-card-content>
      </ion-card>
    </SwiperSlide>
  </Swiper>
  <ion-card v-else>
    <ion-card-content class="bg-secondary">Vous n'avez pas enregistré de film</ion-card-content>
  </ion-card>
</template>