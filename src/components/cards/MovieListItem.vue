<script setup lang="ts">
import {IonCard, IonCol, IonGrid, IonLabel, IonRow, IonText} from "@ionic/vue";
import {Movie} from "@/models";
import dayjs from "dayjs";
import AddToList from "@/components/AddToList.vue";

const props = defineProps<{ movie: Movie }>();


</script>

<template>
  <ion-card class="rounded-lg m-0">
    <ion-grid class="p-0">
      <ion-row>

        <ion-col size="auto" class="m-0" @click="$router.push(`movie-details/${movie.id}`)">
          <img
              v-if="movie.hasPoster"
              class="w-20 rounded"
              :src="movie.posterUrl.original"
              alt="img"
          />
          <ion-label v-else color="dark" class="w-20 rounded text-sm italic">Pas d'image</ion-label>
        </ion-col>

        a<ion-col class="ml-1.5">
          <div class="flex flex-col relative">
            <ion-label color="dark" class="text-lg leading-snug">{{ movie.title }}</ion-label>
            <ion-text color="dark" class="">
              <span v-for="(genre, i) in movie.genres" >
                {{genre.name}}{{i === movie.genres.length - 1 ? '' : ', '}}
              </span>
            </ion-text>

            <ion-label color="medium" class="text-sm">
              Sortie le {{ dayjs(movie.releasedAt).format('DD MMM YYYY') }}
            </ion-label>
          </div>
        </ion-col>

        <ion-col size="2">
          <ion-text color="dark" class="text-lg">{{ movie.rating.toFixed(1) }}</ion-text>
          <ion-text color="medium" class="text-sm"> /10</ion-text>
        </ion-col>
        <div class="absolute bottom-1 right-1">
          <AddToList :movie="movie" />
        </div>
      </ion-row>
    </ion-grid>
  </ion-card>
</template>

