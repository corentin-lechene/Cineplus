<script setup lang="ts">

import BaseSlide from "@/components/slides/BaseSlide.vue";
import {ViewedMovie} from "@/models";
import {useUserStore} from "@/stores/user";
import {onMounted} from "vue";
import {IonCard, IonText} from "@ionic/vue";
import dayjs from "dayjs";

const userStore = useUserStore();

onMounted(() => {
  userStore.loadUser();
});

</script>

<template>
  <div class="">
    <ion-text color="dark" class="text-2xl">Mes séances</ion-text>
    <BaseSlide
        v-if="userStore.viewedMovies.length > 0"
        class="mt-2"
        :items="userStore.viewedMovies"
        :slides-per-view="2.3"
        :space-between="30"
    >
      <template #default="{item: viewedMovie}: {item: ViewedMovie}">
        <div class="flex flex-col gap-y-2 rounded-xl">
          <img
              v-if="viewedMovie.movie.hasPoster"
              class="rounded-md"
              :src="viewedMovie.movie.posterUrl.w185"
              alt="img"
              @click="$router.push(`movie-details/${viewedMovie.movie.id}`)"
          >
          <div v-else class="text-center py-10">Image not found</div>

          <div class="flex flex-col">
            <ion-text color="dark" class="whitespace-nowrap overflow-hidden text-ellipsis">
              {{ viewedMovie.movie.title }}
            </ion-text>
            <ion-text color="medium" class="text-xs">
              Vu le {{ dayjs(viewedMovie.viewedAt).format('DD MMMM YYYY') }}
            </ion-text>
          </div>
        </div>
      </template>
    </BaseSlide>
    <ion-card v-else class="flex justify-center h-40 m-0 mt-2 mr-4">
      <ion-text color="medium" class="m-auto">Vous n'avez encore pas visionné de film</ion-text>
    </ion-card>
  </div>
</template>

<style scoped>

</style>