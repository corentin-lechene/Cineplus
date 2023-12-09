<script lang="ts" setup>

import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonText,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
} from "@ionic/vue";
import {MovieContainer} from "@/containers/movie.container";
import MovieImage from "@/components/movie/MovieImage.vue";
import {Movie} from "@/models";
import dayjs from "@/configs/dayjs.config";
import {addSharp, arrowBackSharp, ellipseOutline} from "ionicons/icons";
import {useUserStore} from "@/stores/user";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();

const movie = ref<Movie | null>(null);

const releaseDate = computed(() => {
  if (!movie.value) return "loading";
  const dateFormatted = dayjs(movie.value.releasedAt).format('DD MMMM YYYY');
  if (movie.value.releasedAt > new Date()) {
    return `Sortie le ${dateFormatted}`;
  }
  return `Sort le ${dateFormatted}`;
});


function handleAddToWatchList() {
  if(!movie.value || !userStore.user) return;
  if(userStore.user.watchList.some(watchList => watchList.movie.id === movie.value?.id)) {
    //todo Display alert to remove it
    console.warn("Display warning to remove it");
    userStore.removeFromWatchList(movie.value);
  } else {
    userStore.addToWatchList(movie.value);
  }
}

onMounted(async () => {
  const movieId = route.params.movie_id;
  if (!movieId || movieId === "" || typeof movieId !== "string") {
    return router.back();
  }

  const movieService = MovieContainer.getMovieService();
  movie.value = await movieService.fetchMovieById(movieId);
});
</script>
<!-- fixme essayer de faire d'une différente manière
 mettre l'image en background plutot ?
 mettre les boutons en haut en fixe ?
 -->
<template>
  <ion-page>
    <ion-content fullscreen>
      <div v-if="movie === null">
        loading...
      </div>
      <div v-else>
        <!-- Image and title       -->
        <div class="relative">
          <MovieImage :image-url="movie.posterUrls?.w500 || ''" class="rounded-lg"/>
          <!-- Buttons header        -->
          <div class="absolute top-0 w-full p-5">
            <div class="flex justify-between">
              <ion-icon :icon="arrowBackSharp" size="large" @click="$router.back()"></ion-icon>
              <ion-icon :icon="addSharp" size="large" @click="handleAddToWatchList()"></ion-icon>
            </div>
          </div>
          <!-- Title and button         -->
          <div class="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent">
            <div class="flex flex-col p-5">
              <ion-text class="text-2xl font-bold" color="light">{{ movie.title }}</ion-text>
              <ion-text class="text-lg" color="light">{{ releaseDate }}</ion-text>
              <div class="flex items-center text-sm">
                <ion-text color="light">{{ movie.releasedAt.getFullYear() }}</ion-text>
                <ion-icon :icon="ellipseOutline" class="text-xs mx-1" color="light"></ion-icon>
                <ion-text v-for="(genre, i) in movie.genres.slice(0, 3)" color="light">
                  {{ i === movie.genres.length - 1 || i === 0 ? '' : ', ' }} {{ genre.name }}
                </ion-text>
                <ion-icon :icon="ellipseOutline" class="text-xs mx-1" color="light"></ion-icon>
                <ion-text color="light">2h05</ion-text>
              </div>
              <ion-button class="h-8 mt-3 mb-0" shape="round" size="small">J'ai regardé ce film</ion-button>
            </div>
          </div>
        </div>

        <ion-card class="rounded-xl">
          <ion-card-header>
            <ion-card-title>{{ movie.title }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            {{ movie.overview }}
          </ion-card-content>
        </ion-card>

      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>