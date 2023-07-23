<script setup lang="ts">
import Movie from "@/models/Movie";

const props = defineProps<{ movie: Movie }>();


</script>

<template>
  <div class="flex flex-row justify-between gap-x-2 bg-secondary text-white p-2 rounded" @click="$router.push(`movies/${props.movie.id}`)">
    <div class="flex flex-row gap-x-4">
      <img v-if="props.movie.url" class="w-16 rounded" :src="props.movie.url" alt="img" />
      <div v-else class="w-16 rounded">x</div>
      <div class="flex flex-col">
        <div>{{ props.movie.title }}</div>
        <div class="text-sm text-gray">Sortie le {{props.movie.release_date}}</div>
      </div>
    </div>
    <div>
      <ion-badge slot="end">{{ props.movie.vote_average }}</ion-badge>
    </div>
  </div>
</template>

