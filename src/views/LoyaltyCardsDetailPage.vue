<script lang="ts" setup>

import {IonModal} from "@ionic/vue";
import BaseHeader from "@/components/common/BaseHeader.vue";
import BaseContent from "@/components/common/BaseContent.vue";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import router from "@/router";
import {LoyaltyCard, Subscription} from "@/models";
import {useUserStore} from "@/stores/user";
import BaseList from "@/components/ui/BaseList.vue";
import LoyaltyCardSave from "@/components/loyalty-card/LoyaltyCardSave.vue";
import SubscriptionSave from "@/components/subscriptions/SubscriptionSave.vue";
import {ToastService} from "@/services/toast.service";
import SubscriptionListItem from "@/components/subscriptions/SubscriptionListItem.vue";

const userStore = useUserStore();
const loyaltyCard = ref<LoyaltyCard>();

const openLoyaltyCardSave = ref(false);
const openSubscriptionSaveModal = ref(false);

const subscriptions = computed<Subscription[]>(() => {
  if(!loyaltyCard.value) return [];
  return loyaltyCard.value.subscriptions.sort((a, b) => {
    return new Date(b.startAt).getDate() - new Date(a.startAt).getDate()
  })
})

onMounted(() => {
  const loyaltyCardId = useRoute().params['loyalty_card_id'] as string;
  if (!loyaltyCardId || !userStore.user) {
    return router.back();
  }

  loyaltyCard.value = userStore.user.loyaltyCards.find(lc => lc.id === parseInt(loyaltyCardId));
});


function updateLoyaltyCard(loyaltyCardParam: { id: number, firstname: string, lastname: string, imageName: string, cardNumber: string}) {
  if (!loyaltyCardParam) {
    return ToastService.error("Le formulaire est invalide");
  }
  if (!userStore.user) {
    return;
  }

  const lc = LoyaltyCard.of(
      loyaltyCardParam.id,
      loyaltyCardParam.firstname,
      loyaltyCardParam.lastname,
      "ugc",
      loyaltyCardParam.imageName,
      loyaltyCardParam.cardNumber,
  );
  userStore.updateLoyaltyCard(lc);
  ToastService.success("Carte de fidélité mise à jour");
  loyaltyCard.value = lc;
  openLoyaltyCardSave.value = false;
}

function saveSubscription(subscription: Subscription) {
  if (!userStore.user || !loyaltyCard.value) return;
  if (!subscription) {
    return ToastService.error("Le formulaire est invalide");
  }

  subscription.id = userStore.user.loyaltyCards.reduce((acc, lc) => lc.subscriptions.length + acc, 0);
  userStore.attachSubscription(subscription, loyaltyCard.value);
  ToastService.success("Abonnement ajouté");
  openSubscriptionSaveModal.value = false;
}
</script>

<template>
  <ion-page>
    <BaseHeader title="Détail de la carte" add-button @onAdd="openSubscriptionSaveModal = true"/>
    <BaseContent class="ion-padding">
      <div v-if="!loyaltyCard">Loading...</div>

      <div v-else>
        <img v-if="loyaltyCard.imageUrl === 'ugc_illimite'" alt="sub-img" src="@/assets/images/ugc_illimite.png"
             @click="openLoyaltyCardSave = true"/>
        <img v-else-if="loyaltyCard.imageUrl === 'ugc_illimite_26'" alt="sub-img"
             src="@/assets/images/ugc_illimite_26.png" @click="openLoyaltyCardSave = true"/>

        <BaseList :items="subscriptions" title="Mes abonnements">
          <template #default="{item: subscription}: {item: Subscription}">
            <SubscriptionListItem
                :subscription="subscription"
                slider
                @onClick="$router.push(`/loyalty-cards/${loyaltyCard.id}/subscriptions/${$event.id}`)"
            />
          </template>
        </BaseList>
      </div>

      <ion-modal
          :breakpoints="[0, 1]"
          :initial-breakpoint="1"
          :is-open="openLoyaltyCardSave"
          @didDismiss="openLoyaltyCardSave = false"
      >
        <LoyaltyCardSave :loyalty-card="loyaltyCard" @on-save="updateLoyaltyCard($event)"/>
      </ion-modal>
      <ion-modal
          :breakpoints="[0, 1]"
          :initial-breakpoint="1"
          :is-open="openSubscriptionSaveModal"
          @didDismiss="openSubscriptionSaveModal = false"
      >
        <SubscriptionSave @onSave="saveSubscription($event)"/>
      </ion-modal>
    </BaseContent>

  </ion-page>
</template>

<style scoped>
ion-modal {
  --height: auto;
}
</style>