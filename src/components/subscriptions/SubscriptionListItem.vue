<script lang="ts" setup>

import {IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonText} from "@ionic/vue";
import {Subscription} from "@/models";
import {computed} from "vue";
import dayjs from "@/configs/dayjs.config";
import {useUserStore} from "@/stores/user";

interface SubscriptionListItemProps {
  subscription: Subscription,
  line?: 'full' | 'inset' | 'none',
  clickable?: boolean,
  disabled?: boolean,
  slider?: boolean,
}

const props = withDefaults(defineProps<SubscriptionListItemProps>(), {
  line: 'full',
  clickable: true,
  disabled: false,
  slider: false,
});

const subscriptionDate = computed(() => {
  const startAt = dayjs(props.subscription.startAt).format('DD MMM YYYY');
  const endAt = props.subscription.endAt;
  if(endAt) {
    return `${startAt} au ${dayjs(endAt).format("DD MMM YYYY")}`
  }
  return startAt;
});

defineEmits(['onClick'])

function deleteSubscription() {
  useUserStore().deleteSubscription(props.subscription);
}

</script>

<template>
  <ion-item-sliding :disabled="props.disabled || !props.slider">
    <ion-item
        :button="props.clickable"
        :disabled="props.disabled"
        :lines="props.line"
        @click="$emit('onClick', subscription)"
    >
      <img
          src="@/assets/images/ugc_illimite.png"
          class="w-16 h-12 bg-gray-200 rounded-md"
          alt="movie-image"
          slot="start"
      />
      <div class="flex items-start h-full">
        <div class="flex flex-col relative">
          <ion-text class="text-lg whitespace-nowrap">{{ subscription.name }}</ion-text>
          <ion-text class="text-sm" color="medium">{{ subscriptionDate }}</ion-text>
        </div>
      </div>
    </ion-item>
    <ion-item-options>
      <ion-item-option color="danger" @click="deleteSubscription()">Supprimer</ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<style scoped>
ion-item {
  --padding-start: 0.65em;
  --padding-bottom: 0.5em;
  --padding-top: 0.5em;
}
</style>