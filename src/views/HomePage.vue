<script setup lang="ts">
import {IonContent, IonPage, IonSearchbar, IonCard, IonCardContent} from '@ionic/vue';
import {reactive, ref} from "vue";
import Movie from "@/models/Movie";
import {MovieService} from "@/services/MovieService";
import MovieListItem from "@/components/cards/MovieListItem.vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import 'swiper/css';

const state = reactive({
  movieInput: "",
  movieList: [] as Movie[],
});

async function searchMovies(input: Event) {
  if (!input.target || !("value" in input.target)) {
    return;
  }

  // state.movieList[0] = {"id":575264,"title":"Mission : Impossible - Dead Reckoning Partie 1","url":"https://image.tmdb.org/t/p/w500/bdYbHxECXsN169pVrTz2TobFqXb.jpg","description":"Ethan Hunt et son équipe de l’IMF se lancent dans leur mission la plus périlleuse à ce jour : traquer une effroyable nouvelle arme avant que celle-ci ne tombe entre de mauvaises mains et menace l’humanité entière. Le contrôle du futur et le destin du monde sont en jeu. Alors que les forces obscures de son passé ressurgissent, Ethan s’engage dans une course mortelle autour du globe. Confronté à un puissant et énigmatique ennemi, Ethan réalise que rien ne peut se placer au-dessus de sa mission - pas même la vie de ceux qu’il aime.","release_date":"08 July 2023","vote_average":"7.83"};
  const value = (input.target as HTMLInputElement).value;
  state.movieList = await MovieService.fetchMoviesByInput(value);
}

const swiperOptions = ref({
  // Options de configuration de swiper.js
  // Vous pouvez les ajuster selon vos besoins
  slidesPerView: 1,
  spaceBetween: 5,
  pagination: {
    clickable: true,
  },
  freeMode: true,
});
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
            <SwiperSlide v-for="i in 2">
              <ion-card>
                <ion-card-content class="bg-secondary">
                  <img src="https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive.jpg" alt="img">
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
              <div>43,78€</div>
            </div>
            <div class="flex flex-row justify-between">
              <div v-for="i in 15">...</div>
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
            <SwiperSlide class="flex flex-col gap-y-2" v-for="i in 7">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Eiffel_Tower_Vertical.JPG" alt="img">
              <div class="flex flex-col ">
                <div class="whitespace-nowrap overflow-hidden text-ellipsis">Mission impossible : vraiment trop bien</div>
                <div class="text-xs text-gray">Visionné le 28 juin 2023</div>
              </div>
            </SwiperSlide>
          </Swiper>
        </ion-card>
      </div>

      <!--
       <div class="flex flex-col">
                  <img class="w-32" src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Eiffel_Tower_Vertical.JPG"
                       alt="img">
                  <ion-card-content class="bg-secondary">
                    <div>Mission impossible</div>
                    <div>Visionné le 28 juin 2023</div>
                  </ion-card-content>
                </div>-->
    </ion-content>
  </ion-page>
</template>

<style scoped>


</style>