<script setup lang="ts">
import {IonCard, IonCardContent, IonLabel} from "@ionic/vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import AppButton from "@/components/buttons/AppButton.vue";
import 'swiper/css';
import {useUserStore} from "@/stores/user";

const userStore = useUserStore();


</script>

<template>
  <ion-label color="dark" class="text-2xl px-4">Ma List</ion-label>
  <Swiper :slides-per-view="1.10" :space-between="-5" allow-touch-move>
    <SwiperSlide v-for="movie in userStore.user!.watchlist">
      <ion-card color="warning" class="py-1">
        <ion-card-content class="flex justify-center">
          <div class="relative flex justify-center">
            <img
              class="rounded-lg"
              :src="movie.backdropUrl"
              alt="img"
              @click="$router.push(`movies/${movie.id}`)"
            />
            <div class="flex justify-center absolute w-full h-2/6 bottom-0 rounded-b-lg bg-black bg-opacity-60">
              <ion-label class="text-center mt-1" color="light">{{ movie.title }}</ion-label>
            </div>
            <AppButton
                class="absolute w-44 -bottom-3.5 shadow-lg"
                color="dark"
                text="Détail du film"
                dense
            />
          </div>

        </ion-card-content>
      </ion-card>
    </SwiperSlide>
  </Swiper>
</template>