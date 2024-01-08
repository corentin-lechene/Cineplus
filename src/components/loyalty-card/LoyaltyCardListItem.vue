<script lang="ts" setup>

import {IonItem, IonItemOptions, IonItemSliding, IonText} from "@ionic/vue";
import {LoyaltyCard} from "@/models";

interface LoyaltyCardListItemProps {
  loyaltyCard: LoyaltyCard,
  line?: 'full' | 'inset' | 'none',
  clickable?: boolean,
  disabled?: boolean,
  slider?: boolean,
}

const props = withDefaults(defineProps<LoyaltyCardListItemProps>(), {
  line: 'full',
  clickable: true,
  disabled: false,
  slider: false,
});

defineEmits(['onClick'])

</script>

<template>
  <ion-item-sliding>
    <ion-item
        :button="props.clickable"
        :disabled="props.disabled"
        :lines="props.line"
        @click="$emit('onClick', loyaltyCard)"
    >
      <img
          class="w-16 h-10 mr-3"
          v-if="loyaltyCard.imageUrl === 'ugc_illimite'"
          src="@/assets/images/ugc_illimite.png" alt="sub-img"
      />
      <img
          class="w-16 h-10 mr-3"
          v-else-if="loyaltyCard.imageUrl === 'ugc_illimite_26'"
          src="@/assets/images/ugc_illimite_26.png" alt="sub-img"
      />
      <div class="flex items-start h-full">
        <div class="flex flex-col gap-y-0.5 relative" style="max-width: 10em">
          <ion-text class="whitespace-nowrap uppercase">{{ loyaltyCard.brand }}</ion-text>
          <ion-text color="medium" style="font-size: 0.95em">N°{{ loyaltyCard.cardNumber }}</ion-text>
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
</style>