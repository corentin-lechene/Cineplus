<script lang="ts" setup>

import {IonText} from "@ionic/vue";
import {Subscription} from "@/models";

interface SubscriptionImageProps {
  subscription: Subscription;
}

const props = defineProps<SubscriptionImageProps>();

</script>

<template>
  <div class="flex flex-col gap-y-2">
    <img v-if="subscription.brand === 'UGC'" src="@/assets/images/ugc_illimite.png" alt="sub-img"/>
    <img v-else-if="subscription.brand === 'PATHE'" src="@/assets/images/cine_pass.png" alt="sub-img"/>
    <div v-else class="text-center py-20">Image not found</div>
    <ion-text color="medium" class="text-md text-center">{{subscription.name}}</ion-text>
  </div>
</template>