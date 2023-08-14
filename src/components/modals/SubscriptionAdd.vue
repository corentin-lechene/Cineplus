<script setup lang="ts">

import {ref} from "vue";

import Header from "@/components/headers/Header.vue";
import AppButton from "@/components/buttons/AppButton.vue";
import SubscriptionsSlides from "@/components/slides/SubscriptionsSlides.vue";
import Separator from "@/components/Separator.vue";

import {Subscription} from "@/models";
import {IonFooter, IonText} from "@ionic/vue";
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
            placeholder="Expiration"
            after-now
        >
          <template #label>
            <div class="flex flex-row justify-between items-center">
              <ion-text color="dark" class="text-xl">Expiration</ion-text>
              <ion-text
                  v-if="selectedSubscription.expireAt"
                  color="danger"
                  class="text-sm"
                  @click="selectedSubscription.expireAt = null"
              >
                Supprimer
              </ion-text>
            </div>
          </template>
        </BaseInput>
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