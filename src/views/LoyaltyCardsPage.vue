<script lang="ts" setup>

import {IonList, IonModal, IonNote} from "@ionic/vue";
import BaseHeader from "@/components/common/BaseHeader.vue";
import BaseContent from "@/components/common/BaseContent.vue";
import {LoyaltyCard} from "@/models";
import LoyaltyCardListItem from "@/components/loyalty-card/LoyaltyCardListItem.vue";
import {ref} from "vue";
import LoyaltyCardSave from "@/components/loyalty-card/LoyaltyCardSave.vue";
import {ToastService} from "@/services/toast.service";
import {useUserStore} from "@/stores/user";

const userStore = useUserStore();

const openNewLoyaltyCardModal = ref(false);

function saveLoyaltyCard(event: {
  firstname: string,
  lastname: string,
  cardNumber: string,
  imageName: string,
  ugc: boolean
}) {
  if (event.firstname.length < 3 || event.lastname.length < 3 || event.cardNumber.length < 6 || !event.ugc || !event.imageName) {
    return ToastService.error("Formulaire invalide");
  }
  if (!userStore.user) {
    return;
  }

  const loyaltyCard = LoyaltyCard.of(
      userStore.user.loyaltyCards.length + 1,
      event.firstname,
      event.lastname,
      "ugc",
      event.imageName,
      event.cardNumber,
  );
  try {
    userStore.createLoyaltyCard(loyaltyCard);
    ToastService.success("Carte de fidélité ajoutée")
    openNewLoyaltyCardModal.value = false;
  } catch (e) {
    console.error(e);
    ToastService.error("Formulaire invalide");
  }
}
</script>

<template>
  <ion-page>
    <BaseHeader add-button title="Vos cartes de fidélité" @on-add="openNewLoyaltyCardModal = true"/>
    <BaseContent class="ion-padding">
      <div v-if="!userStore.user || userStore.user.loyaltyCards.length === 0">
        <ion-note>Vous n'avez pas enregistré de carte de fidélité.</ion-note>
      </div>
      <ion-list v-else :items="userStore.user.loyaltyCards" class="rounded-xl drop-shadow-card">
        <LoyaltyCardListItem
            v-for="(item, i) in userStore.user.loyaltyCards"
            :line="i === userStore.user.loyaltyCards.length - 1 ? 'none' : 'full'"
            :loyalty-card="item"
            slider
            thumbnail
            @onClick="$router.push(`/loyalty-cards/${$event.id}`)"
        />
      </ion-list>
    </BaseContent>

    <ion-modal
        :breakpoints="[0, 1]"
        :initial-breakpoint="1"
        :is-open="openNewLoyaltyCardModal"
        @didDismiss="openNewLoyaltyCardModal = false"
    >
      <LoyaltyCardSave @onSave="saveLoyaltyCard($event)"/>
    </ion-modal>
  </ion-page>
</template>

<style scoped>
ion-modal {
  --height: auto;
}
</style>