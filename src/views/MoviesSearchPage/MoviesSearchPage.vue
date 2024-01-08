<script lang="ts" setup>

import {
  InfiniteScrollCustomEvent,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSearchbar,
  IonToolbar,
  SearchbarCustomEvent
} from "@ionic/vue";
import {onMounted, ref} from "vue";
import {MovieContainer} from "@/containers/movie.container";
import {Movie} from "@/models";
import MovieList from "@/components/movie/MovieList.vue";

const popularMovies = ref<Movie[]>([]);
const resultMovies = ref<Movie[]>([]);

const input = ref("");
const currentView = ref<"popular" | "recent" | "search">("popular");
const currentPage = ref({popular: 1, search: 1});


async function searchMovies(event: SearchbarCustomEvent) {
  if (currentView.value === "popular") return; // prevent we are in search mode
  input.value = event.detail.value || "";
  if (input.value.length === 0) {
    currentView.value = "recent";
    return;
  }
  currentView.value = "search";
  const movieService = MovieContainer.getMovieService();
  resultMovies.value = await movieService.fetchMoviesByQuery(input.value);
}

async function nextPage(event: InfiniteScrollCustomEvent) {
  const movieService = MovieContainer.getMovieService();
  if (currentView.value === "search") {
    const movies = await movieService.fetchMoviesByQuery(input.value, currentPage.value.search + 1);
    resultMovies.value = [...resultMovies.value, ...movies];
    currentPage.value.search += 1;
  } else if (currentView.value === "popular") {
    const movies = await movieService.fetchPopularMovies(currentPage.value.popular + 1);
    popularMovies.value = [...popularMovies.value, ...movies];
    currentPage.value.popular += 1;
  }
  await event.target.complete();
}

onMounted(async () => {
  const movieService = MovieContainer.getMovieService();
  popularMovies.value = await movieService.fetchPopularMovies();
});

</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-searchbar
            v-model="input"
            :debounce="250"
            animated
            class="mt-1 ion-no-padding"
            placeholder="Rechercher..."
            show-cancel-button="focus"
            @click="currentView = 'recent'"
            @ionCancel="currentView = 'popular'"
            @ionInput="searchMovies($event)"
        />
      </ion-toolbar>
    </ion-header>
    <ion-content color="light">
      <!-- Popular     -->
      <MovieList v-if="currentView === 'popular'" :movies="popularMovies" section title="Films populaires"/>

      <!-- Search     -->
      <MovieList v-if="currentView === 'search'" :movies="resultMovies" section title="Résultats de recherche"/>

      <!-- Infinite for popular and search     -->
      <ion-infinite-scroll v-if="currentView !== 'recent'" @ionInfinite="nextPage($event)">
        <ion-infinite-scroll-content
            loadingSpinner="bubbles"
            loadingText="Chargement des films..."
        ></ion-infinite-scroll-content>
      </ion-infinite-scroll>

      <!-- Recent     -->
      <MovieList v-if="currentView === 'recent'" :movies="[]" section title="Recherches récentes"/>

    </ion-content>

  </ion-page>
</template>

<style scoped>
ion-toolbar {
  padding-left: 0.5em;
  padding-right: 0.5em;
}
</style>