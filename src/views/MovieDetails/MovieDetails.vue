<script setup lang="ts">
import {IonContent, IonPage} from "@ionic/vue";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {TheMovieDbService} from "@/services/the-movie-db.service";
import {TheMovieDb} from "@/models";


const router = useRouter();
const id = router.currentRoute.value.params.id as string;

let movie = ref<TheMovieDb>();

onMounted(async () => {
  const theMovieDb = await TheMovieDbService.fetchMovieById(id);
  if(!theMovieDb) {
    router.back();
    return;
  }
  movie.value = theMovieDb;
})


</script>

<template>
  <ion-page>

    <ion-content >
      <div v-if="movie">
        <img :src="`https://image.tmdb.org/t/p/w400${movie.poster_path || ''}`" alt="img" />
        <div class="mt-2 text-2xl text-white">{{ movie.title }}</div>
        <div class="flex flex-row justify-between">
          <div class="text-gray italic text-sm">Sortie le {{ movie.release_date }}</div>
          <div>
            <span class="text-lg text-primary">{{ movie.vote_average }}</span>
            <span class="text-sm text-gray"> /10</span>
          </div>
        </div>

        <div class="text-2xl mt-4 text-white mb-2">Synopsis</div>
        <div class="text-gray">{{ movie.overview }}</div>
      </div>
    </ion-content>

  </ion-page>
</template>

