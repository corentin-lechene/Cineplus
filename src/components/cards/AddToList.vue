<script setup lang="ts">
import {IonFabButton, IonIcon} from "@ionic/vue";
import {add, checkmark, ban} from "ionicons/icons";
import {useUserStore} from "@/stores/user";
import {computed, onMounted} from "vue";
import {TheMovieDb} from "@/models";

const props = defineProps<{ theMovieDb: TheMovieDb }>();

const userStore = useUserStore();

const icon = computed(() => {
  if(!userStore.user) return ban;
  return userStore.user.watchlist.some(movie => movie.id === props.theMovieDb.id) ? checkmark : add;
});

const bgColor = computed(() => {
  if(!userStore.user) return 'tertiary';
  return userStore.user.watchlist.some(movie => movie.id === props.theMovieDb.id) ? 'success' : 'primary';
});

onMounted(() => {
  userStore.loadUser();
})

function addToWatchList() {
  if(!userStore.user) return;
  if(userStore.user.watchlist.some(movie => movie.id === props.theMovieDb.id)) {
    userStore.removeFromWatchList(props.theMovieDb);
  } else {
    userStore.addToWatchList(props.theMovieDb);
  }
}

</script>

<template>
  <ion-fab-button class="add-list" size="small" :color="bgColor" @click="addToWatchList()">
    <ion-icon :icon="icon" size="small" ></ion-icon>
  </ion-fab-button>
</template>


<style scoped>

</style>