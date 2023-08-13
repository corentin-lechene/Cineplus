<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonTitle,
  IonFooter,
  IonModal,
  IonTextarea,
  IonList,
  IonItem,
  IonListHeader,
  IonInput,
  IonIcon,
  IonText,
} from "@ionic/vue";
import {useRouter} from "vue-router";
import {computed, onMounted, reactive, ref} from "vue";
import {TheMovieDbService} from "@/services/the-movie-db.service";
import {Movie, TheMovieDb, ViewedMovie} from "@/models";
import AppHeader from "@/components/headers/BaseHeader.vue";
import AddToList from "@/components/cards/AddToList.vue";
import dayjs from "dayjs";
import AppButton from "@/components/buttons/AppButton.vue";
import {arrowBack} from "ionicons/icons";
import {useUserStore} from "@/stores/user";
import {MovieService} from "@/services/movie.service";

interface FormViewedMovie {
  date: string;
  extra: 0 | number;
  note?: string;
}

const router = useRouter();
const id = router.currentRoute.value.params.id as string;

const userStore = useUserStore();

let movie = ref<Movie>();
const openModalViewMovie = ref(false);

const formViewedMovie = reactive<FormViewedMovie>({
  date: dayjs().toISOString().split('T')[0],
  extra: 0,
  note: "",
});

const isMovieViewed = computed(() => {
  if(!userStore.user) {
    return false;
  }
  return userStore.user.viewedMovies.some(m => String(m.movie.id) === id);
});

const viewedAt = computed(() => {
  if(!userStore.user) {
    return null;
  }
  const viewedMovie = userStore.user.viewedMovies.find(m => String(m.movie.id) === id);
  if(!viewedMovie) {
    return null;
  }
  return dayjs(viewedMovie.viewedAt).format('DD/MM/YYYY');
});

onMounted(async () => {
  userStore.loadUser().catch();

  const result = await MovieService.fetchMovieById(id);
  if (!result) {
    router.back();
    return;
  }
  movie.value = result;
});


function saveMovie() {

  userStore.loadUser()
      .then(() => {
        if(!userStore.user) {
          return;
        }
        const movieViewed: ViewedMovie = {
          viewedAt: dayjs(formViewedMovie.date).toDate(),
          movie: movie.value!,
          extra: formViewedMovie.extra,
          note: formViewedMovie.note || '',
          subscription: userStore.user.subscriptions[userStore.user.subscriptions.length - 1],
        };
        userStore.addMovieToViewed(movieViewed);
        userStore.removeFromWatchList(movie.value!);
      });
  openModalViewMovie.value = false;
}

</script>

<template>
  <ion-page>

    <AppHeader class="flex flex-row justify-between pb-3">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title color="dark" class="text-2xl">Détail du film</ion-title>
      </ion-toolbar>
    </AppHeader>

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
      </div>

      <!-- modal       -->
      <ion-modal trigger="open-modal" :is-open="openModalViewMovie" :initial-breakpoint="1" :breakpoints="[0, 1]">
        <div class="">

          <AppHeader class="flex flex-row justify-between pb-3">
            <ion-toolbar>
              <ion-icon :icon="arrowBack" size="small"></ion-icon>
              <ion-title color="dark" class="text-2xl">Enregistrer</ion-title>
            </ion-toolbar>
          </AppHeader>

          <ion-list class="pr-4">

            <ion-list-header>
              <ion-text color="dark" class="font-medium">Date</ion-text>
            </ion-list-header>
            <ion-item>
              <ion-input
                  :model-value="formViewedMovie.date"
                  aria-text="Date"
                  type="date"
              />
            </ion-item>

            <ion-list-header>
              <ion-text color="dark" class="font-medium">Achats supplémentaires</ion-text>
            </ion-list-header>
            <ion-item>
              <ion-input
                  :model-value="formViewedMovie.extra"
                  aria-text="Achat supplémentaire"
                  type="number"
                  placeholder="Achat supplémentaire"
              />
            </ion-item>

            <ion-list-header>
              <ion-text color="dark" class="font-medium">Note personnelle</ion-text>
            </ion-list-header>
            <ion-item>
              <ion-textarea
                  :model-value="formViewedMovie.note"
                  aria-text="Note personnelle"
                  placeholder="Note personnelle"
                  :rows="3"
              />
            </ion-item>
          </ion-list>

          <div class="px-4 py-4">
            <app-button
                color="dark"
                text="Enregistrer"
                @onTap="saveMovie()"
            />

          </div>

        </div>
      </ion-modal>
    </ion-content>

    <ion-footer class="py-4 px-4 flex">
      <ion-text v-if="isMovieViewed" color="medium" class="italic text-lg m-auto">
        Visionné le {{viewedAt}}
      </ion-text>
      <app-button v-else id="open-modal" color="dark" text="J'ai vu ce film" @onTap="openModalViewMovie = true" />
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

