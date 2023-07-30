<script setup lang="ts">
import {onMounted} from "vue";
import {TheMovieDbService} from "@/services/the-movie-db.service";

onMounted(() => {
  console.log('Intro page mounted');
  TheMovieDbService.fetchPopularMovies().then((response) => {
    console.log(response);
  });
})
</script>

<template>
  <div>Intro page</div>
</template>

<style scoped>

</style>