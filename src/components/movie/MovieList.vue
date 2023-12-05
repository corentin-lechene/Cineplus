<script lang="ts" setup>

import {Movie} from "@/models";
import BaseList from "@/components/ui/BaseList.vue";
import MovieListItem from "@/components/movie/MovieListItem.vue";

interface MoviesListProps {
  movies: Movie[];
  title?: string;
  section?: boolean;
}

const props = defineProps<MoviesListProps>();
defineEmits();
</script>

<template>
  <BaseList :items="movies" :section="section" :title="title">
    <template #default="{item}: {item: Movie}">
      <MovieListItem :movie="item" thumbnail/>
    </template>
  </BaseList>
</template>

<style scoped>

</style>