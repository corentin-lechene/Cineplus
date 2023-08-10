<script setup lang="ts">
import {IonCard, IonLabel, IonPicker, PickerButton} from "@ionic/vue";
import {Swiper, SwiperSlide} from "swiper/vue";

import {useUserStore} from "@/stores/user";
import {onMounted, ref} from "vue";
import dayjs from "dayjs";

const userStore = useUserStore();

const buttons = ref<PickerButton[]>([
  {
    text: 'Annuler',
    role: 'cancel',
  },
  {
    text: 'Valider',
    handler: (row: {years: {value: string, text: string}}) => {
      userStore.selectedYear.text = row.years.text;
      userStore.selectedYear.value = row.years.value;
    }
  }
]);

onMounted(() => {
  userStore.loadUser();
});

</script>

<template>
  <div class="flex flex-row justify-between items-center px-4">
    <ion-label color="dark" class="text-2xl">Mes séances</ion-label>
    <ion-card id="open-years" class="flex flex-row justify-between items-center gap-x-2 py-1.5 px-4 rounded-md m-0"
              color="tertiary">
      <ion-label class="text-md">{{ userStore.selectedYear.text }}</ion-label>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
          <path
              d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
        </svg>
      </div>
    </ion-card>
    <ion-picker trigger="open-years" :buttons="buttons" :columns="userStore.getYears"></ion-picker>
  </div>
  <Swiper
      v-if="userStore.getViewedMovies.length > 0"
      class="px-4 mt-4"
      :slidesPerView="2.3"
      :spaceBetween="30"
      allow-touch-move
  >
    <SwiperSlide v-for="viewedMovie in userStore.getViewedMovies">
      <div class="flex flex-col gap-y-2 rounded-xl">
        <img class="rounded-md" :src="`https://image.tmdb.org/t/p/w154${viewedMovie.movie.poster_path}`" alt="img" @click="$router.push(`movie-details/${viewedMovie.movie.id}`)">
        <div class="flex flex-col">
          <ion-label color="dark" class="whitespace-nowrap overflow-hidden text-ellipsis">
            {{ viewedMovie.movie.title }}
          </ion-label>
          <ion-label color="medium" class="text-xs">
            Vu le {{ dayjs(viewedMovie.viewedAt).format('DD MMMM YYYY') }}
          </ion-label>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
  <ion-card v-else class="flex justify-center h-40">
    <ion-label color="medium" class="m-auto">Vous n'avez pas encore visionné de film</ion-label>
  </ion-card>
</template>