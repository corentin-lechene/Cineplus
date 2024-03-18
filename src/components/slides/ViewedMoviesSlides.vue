<script setup lang="ts">

import BaseSlide from "@/components/slides/BaseSlide.vue";
import {WatchedMovie} from "@/models";
import {useUserStore} from "@/stores/user";
import {computed, onMounted} from "vue";
import {IonCard, IonCol, IonGrid, IonLabel, IonRow, IonText} from "@ionic/vue";
import dayjs from "dayjs";

const userStore = useUserStore();

const watchedMovies = computed(() => {
  if (!userStore.user) return [];
  return userStore.user.watchedMovies
      .toSorted((a, b) => dayjs(b.watchedAt).unix() - dayjs(a.watchedAt).unix());
});

onMounted(() => {
  userStore.loadUser();
});

</script>

<template>
  <ion-grid class="p-0 mt-2">
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
      v-if="watchedMovies.length > 0"
      class="mt-2"
      :items="watchedMovies"
      :slides-per-view="2.3"
      :space-between="20"
  >
    <template #default="{item: watchedMovie}: {item: WatchedMovie}">
      <div v-if="watchedMovie" class="flex flex-col gap-y-2 rounded-xl" style="max-width: 15em">
        <img
            v-if="watchedMovie.movie.posterUrls !== null"
            class="rounded-md"
            style="min-height: 13.5em"
            :src="watchedMovie.movie.posterUrls.w185"
            alt="img"
            @click="$router.push(`/movies/${watchedMovie.movie.id}/details`)"
        >
        <div v-else class="text-center py-10">Image not found</div>

        <div class="flex flex-col">
          <ion-text color="dark" class="whitespace-nowrap overflow-hidden text-ellipsis">
            {{ watchedMovie.movie.title }}
          </ion-text>
          <ion-text color="medium" class="text-xs">
            Vu le {{ dayjs(watchedMovie.watchedAt).format('DD MMM YYYY') }}
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