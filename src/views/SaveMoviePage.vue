<script lang="ts" setup>

import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import router from "@/router";
import {
  IonButton,
  IonDatetime,
  IonFooter,
  IonInput,
  IonItem,
  IonList,
  IonListHeader,
  IonModal,
  IonTextarea,
  IonToolbar
} from "@ionic/vue";
import {supabase} from "@/supabase"

import BaseHeader from "@/components/common/BaseHeader.vue";
import BaseContent from "@/components/common/BaseContent.vue";

import {MovieContainer} from "@/containers/movie.container";
import {Cinema, Movie, Subscription, WatchedMovie} from "@/models";
import dayjs from "@/configs/dayjs.config";
import MovieListItem from "@/components/movie/MovieListItem.vue";
import {ToastService} from "@/services/toast.service";
import EmptyListItem from "@/components/ui/EmptyListItem.vue";
import CinemaList from "@/components/cinema/CinemaList.vue";
import CinemaListItem from "@/components/cinema/CinemaListItem.vue";
import {useUserStore} from "@/stores/user";
import SubscriptionListItem from "@/components/subscriptions/SubscriptionListItem.vue";

const route = useRoute();
const userStore = useUserStore();


const movie = ref<Movie>();
const cinema = ref<Cinema>();
const subscription = ref<Subscription>()
const watchAt = ref(dayjs().toISOString());
const room = ref("");
const ticketPrice = ref(12);
const extraExpense = ref(0);
const seat = ref("");
const note = ref("");

const openCinemasModal = ref(false);
const openSubscriptionsModal = ref(false);

const cinemas = ref<Cinema[]>([])

const allSubscriptions = computed<Subscription[]>(() => {
  if (!userStore.user) return [];
  const subs = [];
  for (const loyaltyCard of userStore.user.loyaltyCards) {
    for (const subscriptionOfLoyaltyCard of loyaltyCard.subscriptions) {
      subs.push(subscriptionOfLoyaltyCard);
    }
  }
  console.log(userStore.user.loyaltyCards.map(loyaltyCard => loyaltyCard.subscriptions))
  return subs;
})

onMounted(async () => {
  if ("movie_id" in route.query) {
    try {
      const movieService = MovieContainer.getMovieService();
      movie.value = await movieService.fetchMovieById(route.query.movie_id as string);

      if(!userStore.user) return;
      const watchedMovie = userStore.user.watchedMovies.find(wc => wc.movie.id === parseInt(route.query.movie_id as string))
      if(!watchedMovie) return;

      cinema.value = watchedMovie.cinema;
      subscription.value = watchedMovie.subscription;
      movie.value = watchedMovie.movie
      watchAt.value = new Date(watchedMovie.watchedAt).toISOString()
      ticketPrice.value = watchedMovie.ticketPrice;
      room.value = watchedMovie.room || "";
      seat.value = watchedMovie.seat || "";
      extraExpense.value = watchedMovie.extraExpense || 0
      note.value = watchedMovie.note || "" ;
    } catch (e) {
      console.error(e);
      router.back();
    }
  }

  // await fetchCinema();

});


async function saveMovie() {
  if (!movie.value || !cinema.value) {
    await ToastService.error("Le formulaire est invalide");
    return;
  }

  const watchedMovie = WatchedMovie.of(
      movie.value,
      cinema.value,
      dayjs(watchAt.value).toDate(),
      ticketPrice.value,
      subscription.value,
      room.value,
      seat.value,
      extraExpense.value,
      note.value
  );

  console.log("watchMovie.movie", watchedMovie.movie)
  console.log("watchMovie.cinema", watchedMovie.cinema)
  console.log("watchMovie.watchedAt", dayjs(watchedMovie.watchedAt).format('LLLL'))
  console.log("watchMovie.ticketPrice", watchedMovie.ticketPrice)
  console.log("watchMovie.note", watchedMovie.note)
  console.log("watchMovie.extraExpense", watchedMovie.extraExpense)
  console.log("watchMovie.room", watchedMovie.room)
  console.log("watchMovie.seat", watchedMovie.seat)
  console.log("watchMovie.subscription", watchedMovie.subscription)

  userStore.addToWatchedList(watchedMovie)
  await router.replace(`/movies/${movie.value?.id}/details`);
}


async function fetchCinema() {
  try {
    const result = await supabase
        .from('Cinema')
        .select('*')

    if (!result.data) return;
    cinemas.value = result.data
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <ion-page>
    <BaseHeader title="Sauvegarder un film"/>
    <BaseContent>
      <div class="flex flex-col ion-content-scroll-host">

        <ion-list-header>Film</ion-list-header>
        <ion-list inset style="margin-top: 0 !important;">
          <MovieListItem v-if="movie" :movie="movie" thumbnail/>
        </ion-list>

        <ion-list-header>Cinéma & Abonnement</ion-list-header>
        <ion-list inset style="margin-top: 0 !important;">
          <CinemaListItem v-if="cinema" :cinema="cinema" @click="openCinemasModal = true"/>
          <EmptyListItem v-else label="Ajouter un Cinéma" thumbnail @click="openCinemasModal = true"/>

          <SubscriptionListItem v-if="subscription" :subscription="subscription"
                                @click="openSubscriptionsModal = true"/>
          <EmptyListItem v-else label="Ajouter un Abonnement" thumbnail @click="openSubscriptionsModal = true"/>
        </ion-list>

        <ion-list-header>Date de visionnage</ion-list-header>
        <ion-list inset style="margin-top: 0 !important;">
          <ion-item>
            <ion-datetime v-model="watchAt" class="max-w-full"></ion-datetime>
          </ion-item>
        </ion-list>

        <ion-list inset>
          <ion-item>
            <ion-input v-model="room" label="Salle"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="seat" label="Place"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="ticketPrice" label="Prix du ticket"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-model="extraExpense" label="Dépense"></ion-input>
          </ion-item>
          <ion-item>
            <ion-textarea v-model="note" :rows="3" label="Note personnelle"></ion-textarea>
          </ion-item>
        </ion-list>
      </div>

      <!--    à réflechir car onSelected ? onClick ? CinemaListChoose, CinemaList -->
      <ion-modal
          :breakpoints="[0, 1]"
          :initial-breakpoint="1"
          :is-open="openCinemasModal"
          @didDismiss="openCinemasModal = false"
      >
        <CinemaList :cinemas="cinemas" @onSelected="cinema = $event; openCinemasModal = false"/>
      </ion-modal>
      <!--      -->
      <ion-modal
          :breakpoints="[0, 1]"
          :initial-breakpoint="1"
          :is-open="openSubscriptionsModal"
          @didDismiss="openSubscriptionsModal = false"
      >
        <BaseHeader arrow-back-button title="Tous les abonnements"/>
        <div class="ion-padding " style="background: var(--ion-color-light)">
          <ion-list class="rounded-xl">
            <SubscriptionListItem v-for="sub in allSubscriptions" :subscription="sub"
                                  @click="subscription = sub; openSubscriptionsModal = false"/>
          </ion-list>
        </div>
      </ion-modal>
    </BaseContent>


    <ion-footer class="ion-padding-horizontal ion-no-border" collapse="fade">
      <ion-toolbar>
        <ion-button
            class="h-8 w-full"
            shape="round"
            size="small"
            @click="saveMovie()"
        >
          Enregistrer
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<style scoped>
ion-modal {
  --height: auto;
}

ion-datetime {
  --background: rgb(241, 241, 241);
  --background-rgb: white;
  --wheel-highlight-background: rgb(189, 189, 189);
  --wheel-fade-background-rgb: 241, 241, 241;
}
</style>