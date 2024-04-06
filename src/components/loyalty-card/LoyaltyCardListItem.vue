<script lang="ts" setup>

import {IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonText} from "@ionic/vue";
import {LoyaltyCard} from "@/models";
import {useUserStore} from "@/stores/user";

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

function deleteLoyaltyCard() {
  useUserStore().deleteLoyaltyCard(props.loyaltyCard);
}

</script>

<template>
  <ion-item-sliding :disabled="!props.slider">
    <ion-item
        :button="props.clickable"
        :disabled="props.disabled"
        :lines="props.line"
        @click="$emit('onClick', loyaltyCard)"
    >
      <img
          v-if="loyaltyCard.imageUrl === 'ugc_illimite'"
          alt="sub-img"
          class="w-16 h-10 mr-3" src="@/assets/images/ugc_illimite.png"
      />
      <img
          v-else-if="loyaltyCard.imageUrl === 'ugc_illimite_26'"
          alt="sub-img"
          class="w-16 h-10 mr-3" src="@/assets/images/ugc_illimite_26.png"
      />
      <div class="flex items-start h-full">
        <div class="flex flex-col gap-y-0.5 relative" style="max-width: 10em">
          <ion-text class="whitespace-nowrap uppercase">{{ loyaltyCard.brand }}</ion-text>
          <ion-text color="medium" style="font-size: 0.95em">N°{{ loyaltyCard.cardNumber }}</ion-text>
        </div>
      </div>
    </ion-item>
    <ion-item-options>
      <ion-item-option color="danger" @click="deleteLoyaltyCard()">Supprimer</ion-item-option>
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