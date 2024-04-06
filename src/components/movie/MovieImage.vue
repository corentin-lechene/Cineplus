<script lang="ts" setup>

import {IonImg, IonText, IonThumbnail} from "@ionic/vue";
import {computed, ref} from "vue";
import ImageNotFound from "@/components/images/ImageNotFound.vue";

interface MovieImageProps {
  title?: string;
  imageUrl: string;
  position?: 'horizontal' | 'vertical';
  thumbnail?: boolean;
  errorText?: string;
}

const props = withDefaults(defineProps<MovieImageProps>(), {
  position: 'vertical',
  thumbnail: false,
});

const imageUnavailable = ref(false);

const hasImage = computed(() => props.imageUrl && !imageUnavailable.value);


</script>

<template>
  <ion-thumbnail v-if="props.thumbnail">
    <ion-img v-if="hasImage" :src="props.imageUrl" alt="movie-image" @ionError="imageUnavailable = true"></ion-img>
    <ImageNotFound v-else :error="props.errorText" thumbnail type="image"/>
  </ion-thumbnail>

  <div v-else class="relative">
    <ion-img v-if="hasImage" :src="props.imageUrl" alt="movie-image" @ionError="imageUnavailable = true"></ion-img>
    <ImageNotFound v-else :error="props.errorText" type="image"/>
    <div
      v-if="props.title"
      :class="!hasImage ? 'border-b-2 border-x-2 border-gray-400 ' : ''"
      class="flex absolute bottom-0 rounded-b-lg bg-black bg-opacity-60 w-full"
    >
      <ion-text class="m-auto whitespace-nowrap overflow-hidden text-ellipsis p-3 text-white">
        {{ props.title }}
      </ion-text>
    </div>
  </div>
</template>

<style scoped>
ion-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

ion-img::part(image) {
  border-radius: 0.5em;
}
</style>