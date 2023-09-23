<script setup lang="ts">
import {IonCard, IonCol, IonGrid, IonLabel, IonRow, IonText} from "@ionic/vue";
import {Movie, TheMovieDb} from "@/models";
import dayjs from "dayjs";
import AddToList from "@/components/AddToList.vue";

const props = defineProps<{ movie: Movie }>();


</script>

<template>
  <ion-card class="rounded-lg m-0">
    <ion-grid class="p-0">
      <ion-row>

        <ion-col size="auto" class="m-0">
          <img
              v-if="movie.hasPoster"
              class="w-20 rounded"
              :src="movie.posterUrl.original"
              alt="img"
          />
          <ion-label v-else color="dark" class="w-20 rounded text-sm italic">Pas d'image</ion-label>
        </ion-col>

        <ion-col class="ml-2 p-0">
          <div class="flex flex-col relative">
            <ion-label color="dark" class="text-lg">{{ movie.title }}</ion-label>
            <ion-label color="medium" class="text-sm">
              Sortie le {{ dayjs(movie.releasedAt).format('DD MMM YYYY') }}
            </ion-label>
          </div>
        </ion-col>

        <ion-col size="2">
          <div>
            <ion-text color="dark" class="text-lg">{{ movie.rating.toFixed(1) }}</ion-text>
            <ion-text color="medium" class="text-sm"> /10</ion-text>
          </div>
        </ion-col>
        <div class="absolute bottom-1 right-1">
          <AddToList :movie="movie" />
        </div>
      </ion-row>
    </ion-grid>
  </ion-card>
<!--  <ion-card class="flex flex-row justify-between p-2 rounded-lg m-0">
    <div class="flex flex-row gap-x-4 relative w-full" @click="$router.push(`movie-details/${movie.id}`)">
      <img
          v-if="movie.hasPoster"
          class="w-16 rounded"
          :src="movie.posterUrl.w154"
          alt="img"
      />
      <ion-label v-else color="dark" class="w-16 rounded">x</ion-label>
      <ion-label class="flex flex-col">
        <ion-label color="dark">{{ movie.title }}</ion-label>
        <ion-label color="medium" class="text-sm">
          Sortie le {{ dayjs(movie.releasedAt).format('DD MMM YYYY') }}
        </ion-label>
      </ion-label>
      <div class="absolute bottom-0 right-0">
        <AddToList :movie="movie" />
      </div>
    </div>
  </ion-card>-->
</template>

