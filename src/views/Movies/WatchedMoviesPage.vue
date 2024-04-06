<script lang="ts" setup>

import {IonContent} from "@ionic/vue";
import BaseHeader from "@/components/common/BaseHeader.vue"
import MovieList from "@/components/movie/MovieList.vue";
import {useUserStore} from "@/stores/user";
import {computed} from "vue";
import dayjs from "@/configs/dayjs.config";

const watchedMovies = computed(() => {
  const userStore = useUserStore();
  if(!userStore.user) return [];
  return userStore.user.watchedMovies
      .toSorted((a, b) => dayjs(a.watchedAt).unix() - dayjs(b.watchedAt).unix());
})
</script>

<template>
<ion-page>
  <BaseHeader title="Films vus" />
  <ion-content class="ion-padding-horizontal">
    <MovieList :movies="watchedMovies" title="Tous les films vus" type="watched" />
  </ion-content>
</ion-page>
</template>

<style scoped>

</style>