<script setup lang="ts">
import {IonContent, IonPage, IonFooter, IonText} from "@ionic/vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";

import {Movie, ViewedMovie} from "@/models";
import {MovieService} from "@/services/movie.service";
import dayjs from "@/configs/dayjs.config";

import AddToList from "@/components/cards/AddToList.vue";
import AppButton from "@/components/buttons/AppButton.vue";
import Header from "@/components/headers/Header.vue";


const router = useRouter();
const id = router.currentRoute.value.params.id as string;

const userStore = useUserStore();

let movie = ref<Movie | undefined>();
let viewedMovie = ref<ViewedMovie | undefined>(undefined);
const openModalViewMovie = ref(false);


onMounted(async () => {
  userStore.loadUser().catch();

  const result = await MovieService.fetchMovieById(id);
  if (!result) {
    router.back();
    return;
  }
  movie.value = result;

  if(userStore.user) {
    viewedMovie.value = userStore.user.viewedMovies.find(m => String(m.movie.id) === id);
  }
});


</script>

<template>
  <ion-page>
    <Header title="Détail du film" back-button default-href="/home" />

    <ion-content>
      <div v-if="movie" class="px-4">
        <div class="relative mb-2">
          <img
              v-if="movie.hasBackdrop"
              class="rounded-lg"
              :src="movie.backdropUrl.original"
              alt="img"
          />
          <div v-else class="text-center py-10">Image not found</div>

          <div class="absolute bottom-0 right-0">
            <AddToList :movie="movie"/>
          </div>
        </div>
        <ion-text class="mt-2 text-2xl">{{ movie.title }}</ion-text>
        <div class="flex flex-row justify-between">
          <ion-text color="medium" class="italic">
            Sortie le {{ dayjs(movie.releasedAt).format('DD/MM/YYYY') }}
          </ion-text>
          <div>
            <ion-text color="dark" class="text-lg">{{ movie.rating }}</ion-text>
            <ion-text color="medium" class="text-sm"> /10</ion-text>
          </div>
        </div>

        <div class="flex flex-col">
          <ion-text color="dark" class="text-2xl mt-4 mb-2">Synopsis</ion-text>
          <ion-text color="medium">{{ movie.overview }}</ion-text>
        </div>

        <div v-if="viewedMovie && viewedMovie.note" class="flex flex-col">
          <ion-text color="dark" class="text-2xl mt-4 mb-2">Ma note personnelle</ion-text>
          <ion-text color="medium">{{ viewedMovie.note }}</ion-text>
        </div>
      </div>

      <!-- modal       -->
    </ion-content>

    <ion-footer class="py-4 px-4 flex">
      <ion-text v-if="viewedMovie" color="medium" class="italic text-lg m-auto">
        Visionné le {{ dayjs(viewedMovie.viewedAt).format('DD/MM/YYYY') }}
      </ion-text>
      <app-button v-else color="dark" text="J'ai vu ce film" @onTap="openModalViewMovie = true" />
    </ion-footer>

  </ion-page>
</template>

<style scoped>
ion-toolbar {
  --background: white;
  --border-style: none;
}

ion-modal {
  --height: auto;
}
</style>

