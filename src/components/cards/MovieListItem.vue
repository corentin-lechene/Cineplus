<script setup lang="ts">
import {IonCard, IonLabel} from "@ionic/vue";
import {Movie, TheMovieDb} from "@/models";
import dayjs from "dayjs";
import AddToList from "@/components/AddToList.vue";

const props = defineProps<{ movie: Movie }>();


</script>

<template>
  <ion-card class="flex flex-row justify-between p-2 rounded-lg m-0">
    <div class="flex flex-row gap-x-4 relative w-full">
      <img
          v-if="movie.hasPoster"
          class="w-16 rounded"
          :src="movie.posterUrl.w154"
          alt="img"
          @click="$router.push(`movie-details/${movie.id}`)"
      />
      <ion-label v-else color="dark" class="w-16 rounded">x</ion-label>
      <ion-label class="flex flex-col">
        <ion-label color="dark">{{ movie.title }}</ion-label>
        <ion-label color="medium" class="text-sm">
          Sortie le {{ dayjs(movie.releasedAt).format('DD/MM/YYYY') }}
        </ion-label>
      </ion-label>
      <div class="absolute bottom-0 right-0">
        <AddToList :movie="movie" />
      </div>
    </div>
  </ion-card>
</template>

