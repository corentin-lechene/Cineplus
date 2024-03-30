<script lang="ts" setup>

import {Movie, WatchedMovie} from "@/models";
import BaseList from "@/components/ui/BaseList.vue";
import MovieListItem from "@/components/movie/MovieListItem.vue";
import MovieWatchedListItem from "@/components/movie/MovieWatchedListItem.vue";

interface MoviesListProps {
  movies: Movie[] | WatchedMovie[];
  title?: string;
  section?: boolean;
  noDataMessage?: string;
  button?: boolean;
  type?: 'watched' | 'upcoming' | 'popular' | 'top_rated';
}

const props = defineProps<MoviesListProps>();
defineEmits(['onViewAll']);
</script>

<template>
  <BaseList :button="button" :items="movies" :no-data-message="noDataMessage" :section="section" :title="title" @view-all="$emit('onViewAll')">
    <template v-if="type === 'watched'" #default="{item}: {item: WatchedMovie}">
      <MovieWatchedListItem :watched-movie="item" thumbnail @click="$router.push(`/movies/${item.movie.id}/details`)"/>
    </template>
    <template v-else #default="{item}: {item: Movie}">
      <MovieListItem :movie="item" thumbnail @click="$router.push(`/movies/${item.id}/details`)"/>
    </template>
  </BaseList>
</template>

<style scoped>

</style>