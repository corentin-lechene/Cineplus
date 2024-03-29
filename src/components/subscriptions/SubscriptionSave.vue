<script lang="ts" setup>

import {
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption
} from "@ionic/vue";
import {onMounted, ref} from "vue";
import {Subscription, SubscriptionPayment} from "@/models";
import dayjs from "@/configs/dayjs.config";

const id = ref();
const name = ref<"ugc_illimite_26" | "ugc_illimite" | "ugc_illimite_duo">("ugc_illimite_26");
const payment = ref<"yearly" | "monthly">("monthly");
const price = ref(17.90);
const startAt = ref(dayjs().format("YYYY-MM-DD"));
const endAt = ref(dayjs().add(1, 'month').format("YYYY-MM-DD"));

const props = defineProps<{ subscription?: Subscription }>()
const emit = defineEmits(['onSave'])

onMounted(() => {
  if (props.subscription) {
    console.log("props.subscription: ", props.subscription);
    id.value = props.subscription.id;
    name.value = props.subscription.name as "ugc_illimite_26" | "ugc_illimite" | "ugc_illimite_duo";
    price.value = props.subscription.price;
    payment.value = props.subscription.payment;
    startAt.value = new Date(props.subscription.startAt).toISOString() || "1994-12-15";
    endAt.value = props.subscription.endAt ? new Date(props.subscription.endAt).toISOString() : new Date().toISOString();
  }
})

function updatePrice() {
  price.value = name.value === "ugc_illimite_26"
      ? 17.90
      : name.value === "ugc_illimite"
        ? 21.90
        : 36.80
  price.value = parseFloat((price.value * (payment.value === 'monthly' ? 1 : 12)).toFixed(2))
}

function onSaveSubscription() {
  const subscription = Subscription.of(
      id.value || 0,
      "UGC",
      name.value,
      price.value,
      payment.value as SubscriptionPayment,
      new Date(startAt.value),
      new Date(endAt.value),
  );
  emit("onSave", subscription);
}
</script>

<template>
  <div class="ion-padding-horizontal py-8" style="background-color: var(--ion-color-light)">
    <div class="flex gap-x-2 justify-between mb-4">
      <ion-segment v-model="name" @update:model-value="updatePrice()">
        <ion-segment-button value="ugc_illimite_26">
          <ion-label>-26 ans</ion-label>
        </ion-segment-button>
        <ion-segment-button value="ugc_illimite">
          <ion-label>UGC Illimité</ion-label>
        </ion-segment-button>
        <ion-segment-button value="ugc_illimite_duo">
          <ion-label>Duo</ion-label>
        </ion-segment-button>
      </ion-segment>
    </div>

    <ion-list class="mb-4 rounded-xl drop-shadow-card">
      <ion-item>
        <ion-label>Paiement par</ion-label>
        <ion-select v-model="payment" aria-label="payment" interface="popover" label="" @update:model-value="updatePrice()">
          <ion-select-option value="monthly">Mois</ion-select-option>
          <ion-select-option value="yearly">Année</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>Début le</ion-label>
        <ion-datetime-button datetime="startAt"></ion-datetime-button>
      </ion-item>
      <ion-item lines="none">
        <ion-label>Date de fin / expiration</ion-label>
        <ion-datetime-button datetime="endAt"></ion-datetime-button>
      </ion-item>
    </ion-list>

    <ion-list class="mb-4 rounded-xl drop-shadow-card">
      <ion-item lines="none">
        <ion-input v-model="price" label="Prix de l'abonnement"></ion-input>
      </ion-item>
    </ion-list>

    <ion-button
        class="h-8 w-full"
        shape="round"
        size="small"
        @click="onSaveSubscription()"
    >
      Enregistrer
    </ion-button>

    <ion-modal :keep-contents-mounted="true">
      <ion-datetime id="startAt" v-model="startAt" presentation="date"></ion-datetime>
    </ion-modal>
    <ion-modal :keep-contents-mounted="true">
      <ion-datetime id="endAt" v-model="endAt" presentation="date"></ion-datetime>
    </ion-modal>
  </div>
</template>

<style scoped>
ion-datetime-button::part(native):last-child {
  visibility: hidden;
}
</style>