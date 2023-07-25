<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonHeader,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonToolbar,
  IonButton,
  IonFooter
} from "@ionic/vue";
import {computed, onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import Movie from "@/models/Movie";
import {MovieDbService} from "@/services/MovieDbService";
import {MovieService} from "@/services/MovieService";
import MovieSave from "@/models/MovieSave";

const state = reactive({
  movie: {} as Movie,
  movieViewed: {} as MovieSave | undefined,
});

const buttonText = computed(() => {
  if(state?.movieViewed) {
    return `Visionné le ${state.movieViewed.viewedAt}`;
  }
  return `J'ai vu ce film`;
})

const router = useRouter();
const id = router.currentRoute.value.params.id as string;

function addMovie() {
  router.push({path: `/add-movies/${id}`});
}

onMounted(async () => {
  MovieDbService.fetchMovieById(id).then((movie) => {
    state.movie = movie;
  });

  state.movieViewed = await MovieService.isMovieViewed(id);
})
</script>

<template>
  <ion-page>

    <ion-header>
      <ion-toolbar color="dark">
        <ion-buttons slot="start">
          <ion-back-button class="text-tertiary"></ion-back-button>
        </ion-buttons>
        <ion-title color="tertiary">Détail du film</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="dark" class="ion-padding">
      <img :src="state.movie.url" alt="img" />
      <div class="mt-2 text-2xl text-white">{{ state.movie.title }}</div>
      <div class="flex flex-row justify-between">
        <div class="text-gray italic text-sm">Sortie le {{ state.movie.release_date }}</div>
        <div>
          <span class="text-lg text-primary">{{ state.movie.vote_average }}</span>
          <span class="text-sm text-gray"> /10</span>
        </div>
      </div>

      <div class="text-2xl mt-4 text-white mb-2">Synopsis</div>
      <div class="text-gray">{{ state.movie.description }}</div>

    </ion-content>

    <ion-footer>
      <ion-toolbar color="dark">
        <ion-button
            expand="full"
            class="text-black bg-primary rounded-xl"
            @click="addMovie()"
            :disabled="!!state.movieViewed"
            v-text="buttonText"
        />
      </ion-toolbar>
    </ion-footer>

  </ion-page>
</template>

<style scoped>

</style>