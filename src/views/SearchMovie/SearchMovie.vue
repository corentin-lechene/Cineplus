<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonSearchbar,
  IonProgressBar,
  IonLabel,
  IonInfiniteScroll,
  IonInfiniteScrollContent, InfiniteScrollCustomEvent,
} from "@ionic/vue";
import AppHeader from "@/components/headers/BaseHeader.vue";
import {onMounted, ref} from "vue";

import MovieListItem from "@/components/cards/MovieListItem.vue";
import {Movie} from "@/models";
import {MovieService} from "@/services/movie.service";

const loadingMovies = ref(true);
let popularMovies = ref<Movie[]>([]);
let searchMovies = ref<Movie[]>([]);
let inputText = ref("");
let searchMoviesPage = ref(1);
let popularMoviesPage = ref(1);

onMounted(() => {
  MovieService.fetchPopularMovies()
      .then((movies) => {
        popularMovies.value = movies;
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
  searchMoviesPage.value = 1;
  const value = (input.target as HTMLInputElement).value;
  inputText.value = value;
  MovieService.fetchByText(value)
      .then(movies => searchMovies.value = movies)
      .finally(() => loadingMovies.value = false);
}

function infiniteSearchMovie(e: InfiniteScrollCustomEvent) {
  MovieService.fetchByText(inputText.value, ++searchMoviesPage.value)
      .then(movies => searchMovies.value = searchMovies.value.concat(movies))
      .finally(() => e.target.complete());
}

function infinitePopularMovies(e: InfiniteScrollCustomEvent) {
  MovieService.fetchPopularMovies(++popularMoviesPage.value)
      .then(movies => popularMovies.value = popularMovies.value.concat(movies))
      .finally(() => e.target.complete());
}

</script>

<template>
  <ion-page>
    <AppHeader class="flex flex-row justify-between pb-3 pr-2.5">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-searchbar
            placeholder="rechercher un film"
            :debounce="500"
            @ionInput="searchMovie"
        />
        <ion-progress-bar v-if="loadingMovies" type="indeterminate"></ion-progress-bar>
      </ion-toolbar>
    </AppHeader>

    <ion-content class="ion-padding-horizontal">
      <div v-if="searchMovies.length > 0" class="pb-4">
        <ion-label color="dark" class="text-xl italic">Résultats de la recherche</ion-label>
        <div v-for="movie in searchMovies" :key="movie.id" class="py-1">
          <MovieListItem :movie="movie"/>
        </div>
        <ion-infinite-scroll @ionInfinite="infiniteSearchMovie">
          <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </div>

      <div v-else-if="popularMovies.length > 0" class="pb-4">
        <ion-label color="dark" class="text-xl italic">Les films populaires</ion-label>
        <div v-for="movie in popularMovies" :key="movie.id" class="py-1">
          <MovieListItem :movie="movie"/>
        </div>
        <ion-infinite-scroll @ionInfinite="infinitePopularMovies">
          <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </div>

      <div v-else class="flex h-full">
        <ion-label color="dark" class="text-xl italic m-auto">Aucun film</ion-label>
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