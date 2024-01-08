<script lang="ts" setup>

import {IonIcon, IonThumbnail} from "@ionic/vue";
import {imageOutline} from "ionicons/icons";

interface EmptyImageProps {
  title?: string;
  position?: 'horizontal' | 'vertical';
  thumbnail?: boolean;
  errorText?: string;
}

const props = withDefaults(defineProps<EmptyImageProps>(), {
  position: 'vertical',
  thumbnail: false,
});


</script>

<template>
  <ion-thumbnail v-if="props.thumbnail">
    <div
        :class="{'py-2': !thumbnail}"
        class="flex flex-col items-center justify-center border-2 border-gray-400 rounded-lg w-full h-full"
        @click="$emit('onClick')"
    >
      <ion-icon :class="{'text-xl': thumbnail}" :icon="imageOutline" size="large"></ion-icon>
    </div>
  </ion-thumbnail>

  <div v-else>
    <div
        :class="{'py-2': !thumbnail}"
        class="flex flex-col items-center justify-center border-2 border-gray-400 rounded-lg py-4 w-full h-full"
        @click="$emit('onClick')"
    >
      <ion-icon :class="{'text-xl': thumbnail}" :icon="imageOutline" size="large"></ion-icon>
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