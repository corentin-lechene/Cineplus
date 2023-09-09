<script setup lang="ts">

import BaseSlide from "@/components/slides/BaseSlide.vue";
import {Movie} from "@/models";
import {useUserStore} from "@/stores/user";
import {onMounted} from "vue";
import {IonCard, IonText, IonLabel} from "@ionic/vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.loadUser();
});

</script>

<template>
  <ion-label color="dark" class="text-2xl font-medium">Ma Liste</ion-label>
  <BaseSlide
      v-if="userStore.watchlist.length > 0"
      class="mt-2"
      :items="userStore.watchlist"
      :slides-per-view="userStore.watchlist.length === 1 ? 1 : 1.10"
      :space-between="10"
  >
    <template #default="{item: movie}: {item: Movie}">
      <div v-if="movie" class="relative w-full" @click="$router.push(`movie-details/${movie.id}`)">
        <img
            v-if="movie.hasBackdrop"
            class="rounded-lg w-full"
            :src="movie.backdropUrl.w300"
            alt="img"
        />
        <div v-else class="flex h-36">
          <ion-text class="m-auto text-center" color="dark">Aucune image fournie</ion-text>
        </div>

        <!-- Absolute           -->
        <div class="flex absolute bottom-0 rounded-b-lg bg-black bg-opacity-60 w-full h-1/4">
          <ion-text class="m-auto whitespace-nowrap overflow-hidden text-ellipsis px-4" color="light">{{ movie.title }}</ion-text>
        </div>
      </div>
      <div v-else>Film indisponible...</div>
    </template>
  </BaseSlide>

  <ion-card v-else class="flex flex-col justify-center items-center h-40 m-0 mt-2" @click="$router.push('/search-movie')">
    <ion-text color="medium" class="text-lg">Vous n'avez pas encore ajouté de film</ion-text>
    <ion-text color="medium" class="text-sm italic underline">Ajouter un film à votre liste</ion-text>
  </ion-card>
</template>

<style scoped>

</style>