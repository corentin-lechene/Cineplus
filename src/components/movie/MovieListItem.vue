<script lang="ts" setup>
import {IonItem, IonItemOptions, IonItemSliding, IonText,} from "@ionic/vue";
import {Movie} from "@/models";
import dayjs from "@/configs/dayjs.config";
import MovieImage from "@/components/movie/MovieImage.vue";
import {computed} from "vue";

interface MovieListItemProps {
  movie: Movie,
  line?: 'full' | 'inset' | 'none',
  clickable?: boolean,
  disabled?: boolean,
  slider?: boolean,
  thumbnail?: boolean,
}

const props = withDefaults(defineProps<MovieListItemProps>(), {
  line: 'full',
  clickable: true,
  disabled: false,
  slider: false,
  thumbnail: false,
});

const releaseDate = computed(() => {
  if (!props.movie) return "loading";
  const releaseAt = dayjs(props.movie.releasedAt)
  if(releaseAt.isBefore(new Date())) {
    return `Sortie le ${releaseAt.format('DD MMMM YYYY')}`;
  }
  return `Sort le ${releaseAt.format('DD MMMM YYYY')}`;
});

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
      <div class="flex items-start h-full">
        <div class="flex flex-col gap-y-0.5 relative" style="max-width: 10em">
          <ion-text :class="props.thumbnail ? 'whitespace-nowrap' : ''" class="title">
            {{ movie.title }}
          </ion-text>
          <ion-text color="medium" style="font-size: 0.95em">{{ releaseDate }}</ion-text>
          <ion-text v-if="!props.thumbnail" class="genres italic font-normal">
            <span v-for="(genre, i) in movie.genres.slice(0, 3)">
              {{ genre.name }}{{ i === movie.genres.slice(0, 3).length - 1 ? '' : ', ' }}
            </span>
          </ion-text>
        </div>
      </div>
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

