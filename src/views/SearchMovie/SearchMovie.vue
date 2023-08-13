<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonSearchbar,
  IonProgressBar,
  IonLabel
} from "@ionic/vue";
import AppHeader from "@/components/headers/BaseHeader.vue";
import {onMounted, ref} from "vue";

import MovieListItem from "@/components/cards/MovieListItem.vue";
import {Movie} from "@/models";
import {MovieService} from "@/services/movie.service";

const loadingMovies = ref(true);
let popularMovies = ref<Movie[]>([]);
let searchMovies = ref<Movie[]>([]);

onMounted(() => {
  MovieService.fetchPopularMovies()
      .then((movies) => {
        popularMovies.value = movies.slice(0, 8);
      })
      .finally(() => {
        loadingMovies.value = false;
      });
});

function searchMovie(input: Event) {
  if (!input.target || !("value" in input.target)) {
    return;
  }

  loadingMovies.value = true;
  const value = (input.target as HTMLInputElement).value;
  // TheMovieDbService.fetchMoviesByText(value)
  //     .then(movies => searchMovies.value = movies)
  //     .finally(() => loadingMovies.value = false);
}


</script>

<template>
  <ion-page>
    <AppHeader class="flex flex-row justify-between pb-3">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-searchbar
            placeholder="rechercher un film"
            :debounce="500"
            @ionInput="searchMovie"
        />
        <ion-progress-bar v-if="loadingMovies" type="indeterminate"></ion-progress-bar>
      </ion-toolbar>
    </AppHeader>

    <ion-content>
      <div v-if="searchMovies.length > 0" class="flex flex-col gap-y-3 px-4 pb-4">
        <ion-label color="dark" class="text-xl italic">Résultats de recherche</ion-label>
        <MovieListItem v-for="movie in searchMovies" :key="movie.id" :movie="movie"/>
      </div>
      <div v-else class="flex flex-col gap-y-3 px-4 pb-4">
        <ion-label color="dark" class="text-xl italic">Les films populaires</ion-label>
        <MovieListItem v-for="movie in popularMovies" :key="movie.id" :movie="movie"/>
      </div>

    </ion-content>
  </ion-page>
</template>


<style scoped>
ion-toolbar {
  --background: white;
  --border-style: none;
}
</style>