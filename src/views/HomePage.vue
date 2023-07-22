<script setup lang="ts">
import {IonContent, IonPage, IonSearchbar} from '@ionic/vue';
import {reactive} from "vue";
import Movie from "@/models/Movie";
import {MovieService} from "@/services/MovieService";
import MovieListItem from "@/components/cards/MovieListItem.vue";

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
</script>

<template>
  <ion-page style="background:#0D0B0D;">
    <ion-content color="dark">
      <div class="text-white">Mon Cinéma</div>
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
    </ion-content>
  </ion-page>
</template>
