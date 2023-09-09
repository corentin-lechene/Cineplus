<script setup lang="ts">

import BaseSlide from "@/components/slides/BaseSlide.vue";
import {ViewedMovie} from "@/models";
import {useUserStore} from "@/stores/user";
import {onMounted} from "vue";
import {IonCard, IonLabel, IonText, IonGrid, IonCol, IonRow} from "@ionic/vue";
import dayjs from "dayjs";

const userStore = useUserStore();

onMounted(() => {
  userStore.loadUser();
});

</script>

<template>
  <ion-grid class="p-0">
    <ion-row>

      <ion-col class="p-0">
        <ion-label color="dark" class="text-2xl font-medium">Mes séances</ion-label>
      </ion-col>

      <ion-col size="auto" class="m-0">
        <!-- todo ajouter le select       -->
      </ion-col>

    </ion-row>
  </ion-grid>
  <BaseSlide
      v-if="userStore.viewedMovies.length > 0"
      class="mt-2"
      :items="userStore.viewedMovies"
      :slides-per-view="2.3"
      :space-between="30"
  >
    <template #default="{item: viewedMovie}: {item: ViewedMovie}">
      <div v-if="viewedMovie" class="flex flex-col gap-y-2 rounded-xl">
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
            Vu le {{ dayjs(viewedMovie.viewedAt).format('DD MMM YYYY') }}
          </ion-text>
        </div>
      </div>
      <div v-else>Film indisponible...</div>
    </template>
  </BaseSlide>

  <ion-card v-else class="flex h-40 m-0 mt-2">
    <ion-text color="medium" class="m-auto text-lg">Vous n'avez pas visionné de film</ion-text>
  </ion-card>
</template>

<style scoped>

</style>