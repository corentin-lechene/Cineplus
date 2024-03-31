<script lang="ts" setup>

import BaseHeader from "@/components/common/BaseHeader.vue";
import {IonSearchbar, SearchbarCustomEvent} from "@ionic/vue";
import {onMounted, ref} from "vue";
import {Movie} from "@/models";
import {MovieContainer} from "@/containers/movie.container";
import MovieListItem from "@/components/movie/MovieListItem.vue";
import BaseList from "@/components/ui/BaseList.vue";

defineEmits(['onSelected']);

const popularMovies = ref<Movie[]>([]);
const resultMovies = ref<Movie[]>([]);

const input = ref("");
const currentView = ref<"popular" | "search">("popular");


async function searchMovies(event: SearchbarCustomEvent) {
  input.value = event.detail.value || "";

  currentView.value = "search";
  const movieService = MovieContainer.getMovieService();
  resultMovies.value = await movieService.fetchMoviesByQuery(input.value);
}

onMounted(async () => {
  const movieService = MovieContainer.getMovieService();
  popularMovies.value = await movieService.fetchPopularMovies();
});

</script>

<template>
<div style="background: var(--ion-color-light)">
  <BaseHeader arrow-back-button title="Recherche d'un film" />
  <ion-searchbar
      v-model="input"
      class="pt-0"
      :debounce="250"
      placeholder="Rechercher..."
      show-clear-button="focus"
      @ionCancel="currentView = 'popular'"
      @ionInput="searchMovies($event)"
  />

  <!-- Popular     -->
  <BaseList v-if="currentView === 'popular'" :items="popularMovies.slice(0, 5)" section title="Films populaires">
    <template #default="{item}: {item: Movie}">
      <MovieListItem :movie="item" thumbnail @click="$emit('onSelected', item)"/>
    </template>
  </BaseList>

  <!-- Search     -->
  <BaseList v-if="currentView === 'search'" :items="resultMovies.slice(0, 5)" section title="Films populaires">
    <template #default="{item}: {item: Movie}">
      <MovieListItem :movie="item" thumbnail @click="$emit('onSelected', item)"/>
    </template>
  </BaseList>

</div>
</template>

<style scoped>

</style>