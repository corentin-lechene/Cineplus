<script lang="ts" setup>
import {IonBadge, IonItem, IonItemOptions, IonItemSliding, IonText} from "@ionic/vue";
import {WatchedMovie} from "@/models";
import MovieImage from "@/components/movie/MovieImage.vue";
import {computed} from "vue";
import dayjs from "dayjs";

interface MovieWatchListItemProps {
  watchedMovie: WatchedMovie,
  line?: 'full' | 'inset' | 'none',
  clickable?: boolean,
  disabled?: boolean,
  slider?: boolean,
  thumbnail?: boolean,
}

const props = withDefaults(defineProps<MovieWatchListItemProps>(), {
  line: 'full',
  clickable: true,
  disabled: false,
  slider: false,
  thumbnail: false,
});

const subscriptionName = computed(() => {
  if (!props.watchedMovie.subscription) return "";
  if(props.watchedMovie.subscription?.name === "ugc_illimite") return "UGC Illimité";
  if(props.watchedMovie.subscription?.name === "ugc_illimite_26") return "UGC Illimité -26 ans";
  if(props.watchedMovie.subscription?.name === "ugc_illimite_duo") return "UGC Illimité Duo";
  return "";
});

const movie = props.watchedMovie.movie;

</script>

<template>
  <ion-item-sliding :disabled="props.disabled || !props.slider">
    <ion-item
        :button="props.clickable"
        :disabled="props.disabled"
        :lines="props.line"
    >
      <MovieImage
          slot="start"
          :class="{ 'w-28 h-16': props.thumbnail, 'h-32 w-22': !props.thumbnail }"
          :image-url="props.thumbnail ? movie.backdropUrls?.w300 || '' : movie.posterUrls?.w185 || ''"
          :thumbnail="props.thumbnail"
      />
      <div class="flex items-start h-full overflow-hidden" style="max-width: 9.5em">
        <div class="flex flex-col gap-y-0.5 relative">
          <ion-text :class="props.thumbnail ? 'whitespace-nowrap' : ''" class="title">
            {{ movie.title }}qsds qsqsd
          </ion-text>
          <ion-text color="dark" style="font-size: 0.95em">
            Vu le {{ dayjs(watchedMovie.watchedAt).format('DD MMM YYYY') }}
          </ion-text>
          <ion-text class="text-xs" color="medium">{{ subscriptionName }}</ion-text>
        </div>
      </div>
      <ion-badge class="absolute top-0 right-3">{{ watchedMovie.ticketPrice }}€</ion-badge>
    </ion-item>
    <ion-item-options>
    </ion-item-options>
  </ion-item-sliding>
</template>

<style scoped>
ion-item {
  --padding-start: 0.65em;
  --padding-bottom: 0.5em;
  --padding-top: 0.5em;
}

.title {
  font-size: 1.3em !important;
}

.genres {
  font-size: 0.8em !important;
}
</style>

