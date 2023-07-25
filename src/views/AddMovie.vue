<script setup lang="ts">
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonFooter,
  IonLabel,
  IonButton,
} from "@ionic/vue";
import {onMounted, reactive} from "vue";
import Movie from "@/models/Movie";
import {useRouter} from "vue-router";
import {MovieDbService} from "@/services/MovieDbService";
import MovieListItem from "@/components/cards/MovieListItem.vue";
import {MovieService} from "@/services/MovieService";

const state = reactive({
  movie: {} as Movie,
  amount: null,
  error: "",
});


const router = useRouter();
const id = router.currentRoute.value.params.id as string;

onMounted(async () => {
  MovieDbService.fetchMovieById(id).then((movie) => {
    state.movie = movie;
  });
})

async function saveMovie() {
  state.error = "";

  //amount
  if(state.amount !== null && state.amount <= 0) {
    state.error = "Le montant doit être supérieur à 0";
    return;
  }

  //date

  const amount = parseFloat(state.amount || '0');
  await MovieService.saveMovie(state.movie, amount, new Date());
}

</script>

<template>
  <ion-page>

    <ion-header>
      <ion-toolbar color="dark">
        <ion-buttons slot="start">
          <ion-back-button class="text-tertiary"></ion-back-button>
        </ion-buttons>
        <ion-title color="tertiary">Ajouter un film</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="dark" class="ion-padding">

      <ion-label color="light" class="text-xl">Film</ion-label>
      <MovieListItem :movie="state.movie" />

      <div class="my-5"></div>

      <ion-label color="light">Avez-vous craquer pour un plaisir ?</ion-label>
      <ion-input
        v-model="state.amount"
        class="input"
        label="Price"
        type="number"
        inputmode="decimal"
        placeholder="Saisir le montant"
      />
      <ion-label v-if="state.error !== null" class="text-sm text-danger">{{state.error}}</ion-label>

    </ion-content>

    <ion-footer>
      <ion-toolbar color="dark">
        <ion-button type="submit" expand="full" class="text-black bg-primary rounded-xl" @click="saveMovie()">Sauvegarder le film</ion-button>
      </ion-toolbar>
    </ion-footer>

  </ion-page>
</template>