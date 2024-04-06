<script lang="ts" setup>

import {eyeOffOutline} from "ionicons/icons";
import {IonIcon, IonNote} from "@ionic/vue";
import {computed} from "vue";

interface ImageNotFoundProps {
  error?: string;
  thumbnail?: boolean;
}

const props = defineProps<ImageNotFoundProps>();
const emit = defineEmits(['onClick']);

const message = computed(() => props.error || 'Aucune image fournie');

</script>

<template>
  <div
    :class="{'py-2': !thumbnail}"
    class="flex flex-col items-center justify-center border-2 border-gray-400 rounded-lg py-4 w-full h-full"
    @click="$emit('onClick')"
  >
    <ion-icon :class="{'text-xl': thumbnail}" :icon="eyeOffOutline" size="large"></ion-icon>
    <ion-note v-if="!thumbnail" class="text-center ion-padding-horizontal">{{ message }}</ion-note>
  </div>
</template>

<style scoped>

</style>