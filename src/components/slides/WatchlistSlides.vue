<script setup lang="ts">

import BaseSlide from "@/components/slides/BaseSlide.vue";
import {Movie} from "@/models";
import {useUserStore} from "@/stores/user";
import {onMounted} from "vue";
import {IonCard, IonText} from "@ionic/vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.loadUser();
});

</script>

<template>
  <div class="">
    <ion-text color="dark" class="text-2xl">Ma Liste</ion-text>
    <BaseSlide
        v-if="userStore.user && userStore.user.watchlist.length > 0"
        class="mt-2"
        :items="userStore.user?.watchlist || []"
        :slides-per-view="userStore.user.watchlist.length === 1 ? 1 : 1.10"
        :space-between="10"
        autoplay
        loop
    >
      <template #default="{item: movie}: {item: Movie}">
        <!--  todo add bg color       -->
        <div class="bg-red-100 w-full p-4 rounded-lg">
          <div class="relative w-full">
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
              <ion-text class="m-auto" color="light">{{ movie.title }}</ion-text>
            </div>
          </div>
        </div>
      </template>
    </BaseSlide>
    <ion-card v-else class="flex justify-center h-40 m-0 mt-2 mr-4">
      <ion-text color="medium" class="m-auto">Vous n'avez pas encore de film</ion-text>
    </ion-card>
  </div>
</template>

<style scoped>

</style>