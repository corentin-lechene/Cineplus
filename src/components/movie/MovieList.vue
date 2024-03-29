<script lang="ts" setup>

import {Movie} from "@/models";
import BaseList from "@/components/ui/BaseList.vue";
import MovieListItem from "@/components/movie/MovieListItem.vue";

interface MoviesListProps {
  movies: Movie[];
  title?: string;
  section?: boolean;
  noDataMessage?: string;
  button?: boolean;
}

const props = defineProps<MoviesListProps>();
defineEmits(['onViewAll']);
</script>

<template>
  <BaseList :button="button" :items="movies" :no-data-message="noDataMessage" :section="section" :title="title" @view-all="$emit('onViewAll')">
    <template #default="{item}: {item: Movie}">
      <MovieListItem :movie="item" thumbnail @click="$router.push(`/movies/${item.id}/details`)"/>
    </template>
  </BaseList>
</template>

<style scoped>

</style>