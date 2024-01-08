<script setup lang="ts">
import {IonContent, IonFooter, IonText, IonCol, IonLabel} from "@ionic/vue";
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";

import {Movie} from "@/models";
import {MovieService} from "@/services/movie.service";
import dayjs from "@/configs/dayjs.config";

import AddToList from "@/components/AddToList.vue";
import AppButton from "@/components/buttons/AppButton.vue";
import Header from "@/components/headers/Header.vue";
import BaseModal from "@/components/modals/BaseModal.vue";
import MovieSave from "@/components/forms/MovieSave.vue";


const router = useRouter();
const id = router.currentRoute.value.params.id as string;

const userStore = useUserStore();

let movie = ref<Movie | undefined>();
const openModalSaveMovie = ref(false);

const viewedMovie = computed(() => {
  if(!userStore.user) return null;
  return userStore.user.viewedMovies.find(m => String(m.movie.id) === id);
});

onMounted(async () => {
  userStore.loadUser().catch();

  try {
    const result = await MovieService.fetchMovieById(id);
    if (!result) return router.back();

    movie.value = result;
  } catch(e) {
    console.error(e)
    router.back();
  }
});

function saveMovie(form: {date: number, extra: number, note: string}) {
  const viewedMovie: ViewedMovie = {
    subscription: userStore.lastSubscription,
    movie: movie.value!,
    viewedAt: dayjs(form.date).toDate(),
    extra: form.extra,
    note: form.note,
  }
  userStore.addToViewedMovie(viewedMovie);
  userStore.removeFromWatchList(movie.value!);
  openModalSaveMovie.value = false;
}


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
        <ion-grid class="p-0">
          <ion-row>
            <ion-col>
              <div class="flex flex-col relative">
                <ion-label color="dark" class="text-2xl leading-snug">{{ movie.title }}</ion-label>
                <ion-text color="dark" class="">
              <span v-for="(genre, i) in movie.genres" >
                {{genre.name}}{{i === movie.genres.length - 1 ? '' : ', '}}
              </span>
                </ion-text>

                <ion-label color="medium" class="text-sm">
                  Sortie le {{ dayjs(movie.releasedAt).format('DD MMM YYYY') }}
                </ion-label>
              </div>
            </ion-col>

            <ion-col size="2">
              <ion-text color="dark" class="text-lg">{{ movie.rating.toFixed(1) }}</ion-text>
              <ion-text color="medium" class="text-sm"> /10</ion-text>
            </ion-col>
          </ion-row>
        </ion-grid>

        <div class="flex flex-col">
          <ion-text color="dark" class="text-2xl mt-4 mb-2">Synopsis</ion-text>
          <ion-text color="medium">{{ movie.overview }}</ion-text>
        </div>

        <div v-if="viewedMovie && viewedMovie.note" class="flex flex-col">
          <ion-text color="dark" class="text-2xl mt-4 mb-2">Ma note personnelle</ion-text>
          <ion-text color="medium">{{ viewedMovie.note }}</ion-text>
        </div>

        <div v-if="viewedMovie && viewedMovie.extra && viewedMovie.extra > 0" class="flex flex-col">
          <ion-text color="dark" class="text-2xl mt-4 mb-2">Achats supplémentaires</ion-text>
          <ion-text color="medium">{{ viewedMovie.extra }}</ion-text>
        </div>
      </div>
      <div v-else>
        <ion-text color="dark">Chargement...</ion-text>
      </div>

      <!-- modal       -->
      <BaseModal v-model="openModalSaveMovie">
        <MovieSave @onSave="saveMovie"/>
      </BaseModal>
    </ion-content>

    <ion-footer class="py-4 px-4 flex">
      <ion-text v-if="viewedMovie" color="medium" class="italic text-lg m-auto">
        Visionné le {{ dayjs(viewedMovie.viewedAt).format('DD/MM/YYYY') }}
      </ion-text>
      <app-button v-else color="dark" text="J'ai vu ce film" @onTap="openModalSaveMovie = true" />
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

