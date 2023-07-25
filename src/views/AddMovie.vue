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
  IonDatetimeButton,
  IonModal,
  IonDatetime
} from "@ionic/vue";
import {onMounted, reactive} from "vue";
import Movie from "@/models/Movie";
import {useRouter} from "vue-router";
import {MovieDbService} from "@/services/MovieDbService";
import MovieListItem from "@/components/cards/MovieListItem.vue";
import {MovieService} from "@/services/MovieService";
import dayjs from "dayjs";

const state = reactive({
  movie: {} as Movie,
  amount: null,
  viewedAt: dayjs().toISOString(),
  amountError: "",
  viewedError: "",
});


const router = useRouter();
const id = router.currentRoute.value.params.id as string;

onMounted(async () => {
  MovieDbService.fetchMovieById(id).then((movie) => {
    state.movie = movie;
  });
})

async function saveMovie() {
  state.amountError = "";
  state.viewedError = "";

  //amount
  if(state.amount !== null && state.amount <= 0) {
    state.amountError = "Le montant doit être supérieur à 0";
    return;
  }

  //date
  if(!dayjs(state.viewedAt).isValid()) {
    state.viewedError = "Le montant doit être supérieur à 0";
    return;
  }
  console.log(state.viewedAt);

  const amount = parseFloat(state.amount || '0');
  const viewedAt = dayjs(state.viewedAt).toDate();
  await MovieService.saveMovie(state.movie, amount, viewedAt);

  await router.replace({ path: '/home', force: true });
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

      <ion-label color="light">Quand avez-vous vu ce film ?</ion-label>
      <ion-datetime-button datetime="datetime"></ion-datetime-button>
      <ion-label v-if="state.viewedError !== ''" class="text-sm text-danger">{{ state.viewedError }}</ion-label>

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
      <ion-label v-if="state.amountError !== ''" class="text-sm text-danger">{{ state.amountError }}</ion-label>

      <ion-modal :keep-contents-mounted="true">
        <ion-datetime v-model="state.viewedAt" id="datetime"></ion-datetime>
      </ion-modal>
    </ion-content>

    <ion-footer>
      <ion-toolbar color="dark">
        <ion-button type="submit" expand="full" class="text-black bg-primary rounded-xl" @click="saveMovie()">Sauvegarder le film</ion-button>
      </ion-toolbar>
    </ion-footer>

  </ion-page>
</template>