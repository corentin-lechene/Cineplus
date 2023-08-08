<script setup lang="ts">
import {IonCard, IonLabel} from "@ionic/vue";
import {TheMovieDb} from "@/models";
import dayjs from "dayjs";
import AddToList from "@/components/cards/AddToList.vue";

const props = defineProps<{ theMovieDb: TheMovieDb }>();


</script>

<template>
  <ion-card class="flex flex-row justify-between p-2 rounded-lg m-0">
    <div class="flex flex-row gap-x-4 relative w-full">
      <img
          v-if="theMovieDb.poster_path"
          class="w-16 rounded"
          :src="`https://image.tmdb.org/t/p/w500${theMovieDb.poster_path}`"
          alt="img"
          @click="$router.push(`movie-details/${theMovieDb.id}`)"
      />
      <ion-label v-else color="dark" class="w-16 rounded">x</ion-label>
      <ion-label class="flex flex-col">
        <ion-label color="dark">{{ theMovieDb.title }}</ion-label>
        <ion-label color="medium" class="text-sm">
          Sortie le {{ dayjs(theMovieDb.release_date).format('DD/MM/YYYY') }}
        </ion-label>
      </ion-label>
      <div class="absolute bottom-0 right-0">
        <AddToList :the-movie-db="theMovieDb" />
      </div>
    </div>
  </ion-card>
</template>

