<script lang="ts" setup>

import {IonText} from "@ionic/vue";
import {Subscription} from "@/models";
import {computed} from "vue";

interface SubscriptionImageProps {
  subscription: Subscription;
  noTitle?: boolean;
  type?: 'icon' | 'image';
}

const props = defineProps<SubscriptionImageProps>();

const imageClasses = computed(() => {
  return {
    'w-28': props.type === 'icon',
    'sm:w-44': props.type === 'icon',
    'rounded-md': true,
  }
})

</script>

<template>
  <div class="flex flex-col gap-y-2">
    <img v-if="subscription.imageUrl === 'ugc_illimite.png'" src="@/assets/images/ugc_illimite.png" :class="imageClasses" alt="sub-img"/>
    <img v-else-if="subscription.imageUrl === 'ugc_illimite_26.png'" src="@/assets/images/ugc_illimite_26.png" :class="imageClasses" alt="sub-img"/>
    <img v-else-if="subscription.brand === 'PATHE'" src="@/assets/images/cine_pass.png" :class="imageClasses" alt="sub-img"/>
    <div v-else class="text-center py-20">Image not found</div>
    <ion-text v-if="!noTitle" color="medium" class="text-md text-center">{{subscription.name}}</ion-text>
  </div>
</template>