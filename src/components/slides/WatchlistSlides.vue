<script lang="ts" setup>

import BaseSlide from "@/components/slides/BaseSlide.vue";
import {useUserStore} from "@/stores/user";
import {onMounted} from "vue";
import {IonCard, IonLabel, IonText} from "@ionic/vue";
import {WatchList} from "@/models";

const userStore = useUserStore();

onMounted(() => {
  userStore.loadUser();
});

</script>

<template>
  <ion-label class="text-2xl font-medium" color="dark">Ma Liste</ion-label>
  <BaseSlide
      v-if="userStore.user && userStore.user.watchList.length > 0"
      :items="userStore.user.watchList"
      :slides-per-view="userStore.user.watchList.length === 1 ? 1 : 1.10"
      :space-between="10"
      class="my-2"
  >
    <template #default="{item: watchList}: {item: WatchList}">
      <div v-if="watchList" class="relative w-full" @click="$router.push(`/movies/${watchList.movie.id}/details`)">
        <img
            v-if="watchList.movie.backdropUrls"
            :src="watchList.movie.backdropUrls.w300"
            alt="img"
            class="rounded-lg w-full"
        />
        <div v-else class="flex h-36">
          <ion-text class="m-auto text-center" color="dark">Aucune image fournie</ion-text>
        </div>

        <!-- Absolute           -->
        <div class="flex absolute bottom-0 bg-gradient-to-t from-black to-transparent w-full h-1/4">
          <ion-text class="m-auto whitespace-nowrap overflow-hidden text-ellipsis px-4 font-semibold" color="white">
            {{ watchList.movie.title }}
          </ion-text>
        </div>
      </div>
      <div v-else>Film indisponible...</div>
    </template>
  </BaseSlide>

  <ion-card v-else class="flex flex-col justify-center items-center h-40 m-0 mt-2"
            @click="$router.push('/movies/search')">
    <ion-text class="text-lg" color="medium">Vous n'avez pas encore ajouté de film</ion-text>
    <ion-text class="text-sm italic underline" color="medium">Ajouter un film à votre liste</ion-text>
  </ion-card>
</template>

<style scoped>

</style>