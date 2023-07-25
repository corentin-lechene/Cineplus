<script setup lang="ts">
import {IonContent, IonPage, IonSearchbar, IonCard, IonCardContent} from '@ionic/vue';
import {computed, onMounted, reactive, ref} from "vue";
import Movie from "@/models/Movie";
import {MovieDbService} from "@/services/MovieDbService";
import MovieListItem from "@/components/cards/MovieListItem.vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import 'swiper/css';
import MovieSave from "@/models/MovieSave";
import {MovieService} from "@/services/MovieService";

const state = reactive({
  movieInput: "",
  movieList: [] as Movie[],
  popularMovies: [] as Movie[],
  viewedMovies: [] as MovieSave[],
});

async function searchMovies(input: Event) {
  if (!input.target || !("value" in input.target)) {
    return;
  }

  // state.movieList[0] = {"id":575264,"title":"Mission : Impossible - Dead Reckoning Partie 1","url":"https://image.tmdb.org/t/p/w500/bdYbHxECXsN169pVrTz2TobFqXb.jpg","description":"Ethan Hunt et son équipe de l’IMF se lancent dans leur mission la plus périlleuse à ce jour : traquer une effroyable nouvelle arme avant que celle-ci ne tombe entre de mauvaises mains et menace l’humanité entière. Le contrôle du futur et le destin du monde sont en jeu. Alors que les forces obscures de son passé ressurgissent, Ethan s’engage dans une course mortelle autour du globe. Confronté à un puissant et énigmatique ennemi, Ethan réalise que rien ne peut se placer au-dessus de sa mission - pas même la vie de ceux qu’il aime.","release_date":"08 July 2023","vote_average":"7.83"};
  const value = (input.target as HTMLInputElement).value;
  state.movieList = await MovieDbService.fetchMoviesByInput(value);
}

const swiperOptions = ref({
  slidesPerView: 1,
  spaceBetween: 5,
  pagination: {
    clickable: true,
  },
  freeMode: true,
});

const totalRentability = computed(() => {
  return (198.22 / state.viewedMovies.length).toFixed(2);
})

onMounted(() => {
  MovieDbService.fetchPopularMovies().then(movies => state.popularMovies = movies);
  MovieService.getViewedMovies().then(movies => state.viewedMovies = movies);
})
</script>

<template>
  <ion-page style="background:#0D0B0D;">
    <ion-content color="dark">

      <div class="flex flex-row justify-between items-center text-white px-3 pt-8 pb-4">
        <div class="text-3xl">Mon Cinéma</div>
        <div class="">...</div>
      </div>

      <ion-searchbar
          v-model="state.movieInput"
          class="mb-4"
          debounce="500"
          color="secondary"
          placeholder="Rechercher"
          inputmode="text"
          @ionInput="searchMovies"
      />
      <div class="flex flex-col gap-y-3 px-3">
        <MovieListItem v-for="movie in state.movieList" :key="movie.id" :movie="movie"/>
      </div>

      <div class="flex flex-col">
        <div class="text-2xl text-white px-3">Films populaires</div>
        <div>
          <Swiper :options="swiperOptions">
            <SwiperSlide v-for="movie in state.popularMovies">
              <ion-card>
                <ion-card-content class="bg-secondary">
                  <img
                    :src="movie.backdropUrl"
                    alt="img"
                    @click="$router.push(`movies/${movie.id}`)"
                  >
                </ion-card-content>
              </ion-card>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <ion-card>
        <ion-card-content class="bg-secondary">
          <div class="flex flex-col text-white">
            <div class="flex flex-row justify-between">
              <div>Suivi de la rentabilité</div>
              <div>{{ totalRentability }}€</div>
            </div>
            <div class="flex flex-row justify-between">
              <div v-for="i in 15">
                <span v-if="i <= state.viewedMovies.length" class="text-primary">...</span>
                <span v-else class="text-white">...</span>
              </div>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <div class="flex flex-col">
        <div class="text-2xl text-white px-3">Films visionnés</div>
        <ion-card color="dark" class="text-white">
          <Swiper
            :slidesPerView="2.3"
            :spaceBetween="30"
            :pagination="{ clickable: true, }"
          >
            <SwiperSlide class="flex flex-col gap-y-2 relative" v-for="movie in state.viewedMovies">
              <div v-if="movie.extra && movie.extra > 0" class="absolute text-danger right-1" style="font-size: 0.75em">+{{movie.extra}}€</div>
              <img :src="movie.url" alt="img">
              <div class="flex flex-col ">
                <div class="whitespace-nowrap overflow-hidden text-ellipsis">{{ movie.title }}</div>
                <div class="text-xs text-gray">Visionné le {{ movie.viewedAt }}</div>
              </div>
            </SwiperSlide>
          </Swiper>
        </ion-card>
      </div>

    </ion-content>
  </ion-page>
</template>

<style scoped>


</style>