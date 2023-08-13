<script setup lang="ts">
import {IonFabButton, IonIcon} from "@ionic/vue";
import {ban, heartOutline, checkmark, heart} from "ionicons/icons";
import {useUserStore} from "@/stores/user";
import {computed, onMounted} from "vue";
import {Movie, TheMovieDb} from "@/models";

const props = defineProps<{ movie: Movie }>();

const userStore = useUserStore();

const isMovieViewed = computed(() => {
  if(!userStore.user) {
    return false;
  }
  return userStore.user.viewedMovies.some(m => String(m.movie.id) === String(props.movie.id));
});

const icon = computed(() => {
  if(!userStore.user) return ban;
  if(isMovieViewed.value) return checkmark;
  return userStore.user.watchlist.some(movie => String(movie.id) === String(props.movie.id)) ? heart : heartOutline;
});

const bgColor = computed(() => {
  if(!userStore.user) return 'tertiary';
  if(isMovieViewed.value) return 'success';
  return userStore.user.watchlist.some(movie => String(movie.id) === String(props.movie.id)) ? 'primary' : 'light';
});



onMounted(() => {
  userStore.loadUser();
})

function addToWatchList() {
  if(!userStore.user || isMovieViewed.value) return;
  if(userStore.user.watchlist.some(movie => movie.id === props.movie.id)) {
    userStore.removeFromWatchList(props.movie);
  } else {
    userStore.addToWatchList(props.movie);
  }
}

</script>

<template>
  <ion-fab-button class="add-list" size="small" :color="bgColor" @click="addToWatchList()">
    <ion-icon :icon="icon" size="small"></ion-icon>
  </ion-fab-button>
</template>


<style scoped>

</style>