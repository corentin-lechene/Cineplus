<script lang="ts" setup>
import {computed, onMounted} from "vue";
import {IonFooter, IonText} from "@ionic/vue";
import {Subscription} from "@/models";
import AppButton from "@/components/buttons/AppButton.vue";
import Header from "@/components/headers/Header.vue";
import BaseInput from "@/components/inputs/BaseInput.vue";

import {SubscriptionService} from "@/services/subscription.service";
import {ToastService} from "@/services/toast.service";
import {useUserStore} from "@/stores/user";

interface SubscriptionSettingsProps {
  modelValue: Subscription;
  mode: 'update' | 'create';
}

const userStore = useUserStore();

const props = defineProps<SubscriptionSettingsProps>();
const emit = defineEmits(['update:modelValue', 'onSave']);

const modelValue = computed<Subscription>({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
});

onMounted(() => {
  userStore.loadUser();
});


function beforeSave() {
  if (!SubscriptionService.isValid(modelValue.value)) {
    ToastService.error('Le formulaire est invalide').catch();
    return;
  }

  if (props.mode === 'create') {
    modelValue.value.createdAt = new Date();
  }
  emit('onSave', modelValue.value);
}

</script>

<template>
  <div v-if="modelValue">
    <Header title="Configuration"/>

    <div class="flex flex-col gap-y-4 px-4">
      <BaseInput
          v-model="modelValue.startAt"
          type="date"
          label="Début de l'abonnement"
          placeholder="Début de l'abonnement"
          required
          :before-date="modelValue.expireAt"
          before-date-error-message="La date doit être inférieur à l'expiration"
          :disabled="mode === 'update'"
      />
      <BaseInput
          v-model.number="modelValue.price"
          type="price"
          label="Prix de l'abonnement (par mois)"
          placeholder="Prix de l'abonnement"
          required
      />
      <BaseInput
          v-model.number="modelValue.ticketPrice"
          type="price"
          label="Prix d'une place"
          placeholder="Prix d'une place"
          required
      />
      <BaseInput
          v-model="modelValue.expireAt"
          type="date"
          placeholder="Expiration"
      >
        <template #label>
          <div class="flex flex-row justify-between items-center">
            <ion-text color="dark" class="text-xl">Expiration</ion-text>
            <ion-text
                v-if="modelValue.expireAt"
                color="danger"
                class="text-sm"
                @click="modelValue.expireAt = null"
            >
              Supprimer
            </ion-text>
          </div>
        </template>
      </BaseInput>
    </div>

    <ion-footer class="px-4 py-4">
      <app-button class="h-full" color="dark" text="Terminer" @click="beforeSave()"/>
    </ion-footer>

  </div>
  <div v-else class="flex h-20">
    <div class="m-auto">chargement...</div>
  </div>
</template>

<style>

ion-modal {
  --height: auto;
}
</style>