<script setup lang="ts">

import {ref} from "vue";

import Header from "@/components/headers/Header.vue";
import AppButton from "@/components/buttons/AppButton.vue";
import SubscriptionsSlides from "@/components/slides/SubscriptionsSlides.vue";
import Separator from "@/components/Separator.vue";

import {Subscription} from "@/models";
import {IonFooter} from "@ionic/vue";
import BaseInput from "@/components/inputs/BaseInput.vue";

const emit = defineEmits(['onSave']);

const selectedSubscription = ref<Subscription>();

</script>

<template>
  <div class="px-4">
    <Header title="Abonnements"/>

    <div class="flex flex-col gap-y-2">
      <div class="w-full h-full flex items-center bg-none" >
        <SubscriptionsSlides v-model="selectedSubscription"/>
      </div>

      <Separator class="my-2"/>

      <div v-if="selectedSubscription" class="flex flex-col gap-y-4 px-4">
        <BaseInput
            v-model.number="selectedSubscription.price"
            type="price"
            label="Prix de l'abonnement (par mois)"
            placeholder="Prix de l'abonnement"
            required
        />
        <BaseInput
            v-model.number="selectedSubscription.ticketPrice"
            type="price"
            label="Prix d'une place"
            placeholder="Prix d'une place"
            required
        />
        <BaseInput
            v-model="selectedSubscription.expireAt"
            type="date"
            label="Expiration"
            placeholder="Expiration"
            required
            after-now
        />
      </div>
    </div>

    <ion-footer class="px-4 py-4">
      <app-button
          class="h-full"
          color="dark"
          text="Ajouter"
          :disabled="!selectedSubscription"
          @click="$emit('onSave', selectedSubscription!)"
      />
    </ion-footer>
  </div>
</template>

<style scoped>

</style>