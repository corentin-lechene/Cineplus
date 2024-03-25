<script lang="ts" setup>

import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonText,} from "@ionic/vue";
import {MovieContainer} from "@/containers/movie.container";
import MovieImage from "@/components/movie/MovieImage.vue";
import {Movie} from "@/models";
import dayjs from "@/configs/dayjs.config";
import {useUserStore} from "@/stores/user";
import BaseHeader from "@/components/common/BaseHeader.vue";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();

const movie = ref<Movie | null>(null);

const isMovieWatched = computed(() => {
  if (!userStore.user || !movie.value) return false;
  return userStore.user.watchedMovies.some(watchMovie => watchMovie.movie.id === movie.value?.id);
});

const addButtonColor = computed<"amber" | "gray">(() => {
  if (!userStore.user || !movie.value) return "gray";
  if(isMovieWatched.value) return "amber";
  if(userStore.user.watchList.some(watchList => watchList.movie.id === movie.value?.id)) {
    return "amber";
  } else {
    return "gray";
  }
});

const releaseDate = computed(() => {
  if (!movie.value) return "loading";
  const releaseAt = dayjs(movie.value.releasedAt)
  if (releaseAt.isBefore(dayjs())) {
    return `Sortie le ${releaseAt.format('DD MMMM YYYY')}`;
  }
  return `Sort le ${releaseAt.format('DD MMMM YYYY')}`;
});


function handleAddToWatchList() {
  if (!movie.value || !userStore.user || isMovieWatched.value) return;
  try {
    userStore.addToWatchList(movie.value);
  } catch (e) {
    userStore.removeFromWatchList(movie.value);
  }
}

function removeFromWatchedList() {
  if (!movie.value || !userStore.user) return;
  userStore.removeFromWatchedList(movie.value);
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
          <!-- Buttons header        -->
          <BaseHeader :add-button-color="addButtonColor" add-button title="Détail du film"
                      @onAdd="handleAddToWatchList()"/>

          <MovieImage :image-url="movie.posterUrls?.w500 || ''"/>
          <!-- Title and button         -->
          <div class="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent">
            <div class="flex flex-col p-5">
              <ion-text class="text-2xl font-bold" color="light">{{ movie?.title }}</ion-text>
              <ion-text class="text-lg" color="light">{{ releaseDate }}</ion-text>
              <div class="flex items-center text-sm">
                <ion-text color="light">{{ movie?.releasedAt.getFullYear() }}</ion-text>
<!--                <ion-icon :icon="ellipseOutline" class="text-xs mx-1" color="light"></ion-icon>-->
<!--                <ion-text v-for="(genre, i) in movie.genres.slice(0, 3)" color="light">-->
<!--                  {{ i === movie?.genres.length - 1 || i === 0 ? '' : ', ' }} {{ genre.name }}-->
<!--                </ion-text>-->
<!--                <ion-icon :icon="ellipseOutline" class="text-xs mx-1" color="light"></ion-icon>-->
<!--                <ion-text color="light">2h05</ion-text>-->
              </div>
              <div class="flex gap-x-2 mt-3 mb-0 w-full">
                <ion-button
                    v-if="isMovieWatched"
                    class="h-8"
                    color="secondary"
                    shape="round"
                    size="small"
                    @click="removeFromWatchedList()"
                >
                  Supprimer
                </ion-button>
                <ion-button
                    class="h-8 w-full"
                    shape="round"
                    size="small"
                    @click="$router.push(`/movies/watched/new?movie_id=${movie.id}`)"
                >
                  <span v-if="isMovieWatched">Voir mon récapitulatif</span>
                  <span v-else>J'ai regardé ce film</span>
                </ion-button>
              </div>
            </div>
          </div>
        </div>

        <ion-card class="rounded-xl">
          <ion-card-header>
            <ion-card-title>{{ movie?.title }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            {{ movie?.overview }}
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>