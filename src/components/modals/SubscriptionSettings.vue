<script lang="ts" setup>
import {computed, onMounted} from "vue";
import {IonFooter, IonButtons, IonHeader, IonBackButton, IonTitle, IonSelect, IonSelectOption, IonItem, IonLabel, IonList, IonListHeader, IonInput} from "@ionic/vue";
import {Subscription} from "@/models";
import AppButton from "@/components/buttons/AppButton.vue";
import SubscriptionImage from "@/components/SubscriptionImage.vue";

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'close']);

const value = computed<Subscription>({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
});

const expireAt = computed<string>(() => {
  if(!value.value.expireAt) return new Date().toISOString().split('T')[0];
  return value.value.expireAt.toISOString().split('T')[0];
});

onMounted(() => {
  value.value.expireAt = value.value.expireAt ? value.value.expireAt : new Date();
});

function updatePayment(e: CustomEvent) {
  if(!['monthly', 'yearly'].includes(e.detail.value)) {
    console.error('Invalid payment');
    return;
  }
  value.value.payment = e.detail.value as 'monthly' | 'yearly';
}

function updatePrice(e: CustomEvent) {
  if(!e.detail.value || parseFloat(e.detail.value) <= 0) {
    console.error('Invalid price');
    return;
  }
  value.value.price = e.detail.value as number;
}

function updateTicketPrice(e: CustomEvent) {
  if(!e.detail.value || parseFloat(e.detail.value) <= 0) {
    console.error('Invalid ticket price');
    return;
  }
  value.value.ticketPrice = e.detail.value as number;
}

</script>

<template>
  <div class="flex flex-col items-center w-full">
    <ion-header class="h-20">
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title color="dark" class="text-3xl p-0">{{ value.name }}</ion-title>
    </ion-header>

    <div class="flex flex-col">
      <SubscriptionImage class="my-5 px-4" :image-url="value.imageUrl" />
      <div class="flex flex-col my-4">
        <ion-list>

          <ion-list-header>
            <ion-label>
              Prix de l'abonnement
              <span class="text-xs font-medium italic">({{ value.payment === 'monthly' ? 'par mois' : "par an" }})</span>
            </ion-label>
          </ion-list-header>
          <ion-item>
            <ion-input
                aria-label="Price"
                type="number"
                placeholder="Prix de l'abonnement"
                :value="value.price"
                @ionInput="updatePrice"
            />
          </ion-item>

          <ion-list-header>
            <ion-label>Prix d'une place</ion-label>
          </ion-list-header>
          <ion-item>
            <ion-input
                aria-label="Price ticket"
                type="number"
                placeholder="Prix d'une place"
                :value="value.ticketPrice"
                @ionInput="updateTicketPrice"
            />
          </ion-item>

          <ion-list-header>
            <ion-label>Expiration</ion-label>
          </ion-list-header>
          <ion-item>
            <ion-input
                aria-label="Expiration"
                type="date"
                :value="expireAt"
                @ionInput="updatePrice"
            />
          </ion-item>
        </ion-list>


      </div>
    </div>

    <ion-footer class="px-4 py-4">
      <app-button class="h-full" color="dark" text="Terminer" @click="emit('close')" />
    </ion-footer>
  </div>
</template>

<style>

ion-modal {
  --height: auto;
}
</style>