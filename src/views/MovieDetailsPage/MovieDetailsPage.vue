<script lang="ts" setup>

import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {IonButton, IonContent, IonIcon, IonPage, IonText} from "@ionic/vue";
import {MovieContainer} from "@/containers/movie.container";
import MovieImage from "@/components/movie/MovieImage.vue";
import {Movie} from "@/models";
import dayjs from "@/configs/dayjs.config";
import {ellipseOutline} from "ionicons/icons";

const route = useRoute();
const router = useRouter();

const movie = ref<Movie | null>(null);

const releaseDate = computed(() => {
  if (!movie.value) return "loading";
  const dateFormatted = dayjs(movie.value.releasedAt).format('DD MMMM YYYY');
  if (movie.value.releasedAt > new Date()) {
    return `Sortie le ${dateFormatted}`;
  }
  return `Sort le ${dateFormatted}`;
});

onMounted(async () => {
  const movieId = route.params.movie_id;
  if (!movieId || movieId === "" || typeof movieId !== "string") {
    return router.back();
  }

  const movieService = MovieContainer.getMovieService();
  movie.value = {
    "id": 507089,
    "title": "Five Nights at Freddy's",
    "overview": "Mike, jeune homme perturbé, s’occupe de sa sœur Abby, âgée de 10 ans. Il est toujours hanté par la disparition, jamais élucidée, de son petit frère, survenue il y a une dizaine d’années. Récemment licencié, il a absolument besoin de retrouver un emploi pour ne pas perdre la garde d’Abby. Il accepte donc un poste de gardien de nuit, dans un restaurant désaffecté : Freddy Fazbear’s Pizzeria. Mais Mike ne tarde pas à comprendre que les apparences y sont terriblement trompeuses. Avec l’aide de Vanessa Shelly, agent de police, il est confronté, la nuit, à des phénomènes surnaturels inexplicables et bascule dans un univers cauchemardesque...",
    "backdropUrls": {
      "w300": "https://image.tmdb.org/t/p/w300/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg",
      "w780": "https://image.tmdb.org/t/p/w780/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg",
      "w1280": "https://image.tmdb.org/t/p/w1280/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg",
      "original": "https://image.tmdb.org/t/p/original/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg"
    },
    "posterUrls": {
      "w92": "https://image.tmdb.org/t/p/w92/tEY81I7lpiHaLJa7AZ3O4vWXmJo.jpg",
      "w154": "https://image.tmdb.org/t/p/w154/tEY81I7lpiHaLJa7AZ3O4vWXmJo.jpg",
      "w185": "https://image.tmdb.org/t/p/w185/tEY81I7lpiHaLJa7AZ3O4vWXmJo.jpg",
      "w342": "https://image.tmdb.org/t/p/w342/tEY81I7lpiHaLJa7AZ3O4vWXmJo.jpg",
      "w500": "https://image.tmdb.org/t/p/w500/tEY81I7lpiHaLJa7AZ3O4vWXmJo.jpg",
      "w780": "https://image.tmdb.org/t/p/w780/tEY81I7lpiHaLJa7AZ3O4vWXmJo.jpg",
      "original": "https://image.tmdb.org/t/p/original/tEY81I7lpiHaLJa7AZ3O4vWXmJo.jpg"
    },
    "releasedAt": new Date("2023-10-25T00:00:00.000Z"),
    "genres": [
      {id: 0, name: 'Truc'},
      {id: 1, name: 'Drame'},
      {id: 2, name: 'Machin'},
      {id: 3, name: 'Bidule'},
    ],
    "rating": 7.841
  };
});
</script>

<template>
  <ion-page>
    <ion-content>
      <div v-if="movie === null">
        loading...
      </div>
      <div v-else>
        <!-- Image and title       -->
        <div class="relative">
          <MovieImage :image-url="movie.posterUrls?.w500 || ''" class="rounded-lg"/>
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

      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>