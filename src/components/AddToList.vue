<script setup lang="ts">
import {alertController, IonFabButton, IonIcon} from "@ionic/vue";
import {ban, heartOutline, checkmark, heart} from "ionicons/icons";
import {useUserStore} from "@/stores/user";
import {computed, onMounted} from "vue";
import {Movie} from "@/models";

const props = defineProps<{ movie: Movie }>();

const userStore = useUserStore();

const viewedMovie = computed(() => {
  if(!userStore.user) return undefined;
  return userStore.user.viewedMovies.find(m => String(m.movie.id) === String(props.movie.id));
});

const icon = computed(() => {
  if(!userStore.user) return ban;
  if(viewedMovie.value) return checkmark;
  return userStore.user.watchlist.some(movie => String(movie.id) === String(props.movie.id)) ? heart : heartOutline;
});

const bgColor = computed(() => {
  if(!userStore.user) return 'tertiary';
  if(viewedMovie.value) return 'success';
  return userStore.user.watchlist.some(movie => String(movie.id) === String(props.movie.id)) ? 'primary' : 'light';
});



onMounted(() => {
  userStore.loadUser();
})

async function onTap() {
  if(!userStore.user) return;
  if(viewedMovie.value) {
    console.log("ici")
    const alert = await alertController.create({
      header: 'Alert',
      message: 'Voulez-vous retirer ce film de votre liste ?',
      buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
          },
          {
            text: 'Ok',
            role: 'ok',
          }
      ],
    });
    alert.onDidDismiss().then((e) => {
      if(e.role === 'ok') {
        userStore.removeFromViewedMovie(viewedMovie.value!);
      }
    });
    await alert.present();
    return;
  }

  if(userStore.user.watchlist.some(movie => movie.id === props.movie.id)) {
    userStore.removeFromWatchList(props.movie);
    return
  }

  userStore.addToWatchList(props.movie);
}

</script>

<template>
  <ion-fab-button class="add-list" size="small" :color="bgColor" @click="onTap()">
    <ion-icon :icon="icon" size="small"></ion-icon>
  </ion-fab-button>
</template>


<style scoped>

</style>