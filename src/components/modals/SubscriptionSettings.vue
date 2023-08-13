<script lang="ts" setup>
import {computed, onMounted} from "vue";
import {IonFooter} from "@ionic/vue";
import {Subscription} from "@/models";
import AppButton from "@/components/buttons/AppButton.vue";
import Header from "@/components/headers/Header.vue";
import BaseInput from "@/components/inputs/BaseInput.vue";
import dayjs from "@/configs/dayjs.config";
import {SubscriptionService} from "@/services/subscription.service";

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'onSave']);

const modelValue = computed<Subscription>({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
});



onMounted(() => {
  modelValue.value.expireAt = dayjs('18/09/2023', 'DD/MM/YYYY').format('YYYY-MM-DD');
});

function beforeSave() {
  console.log("before save");
  if(!SubscriptionService.isValid(modelValue.value)) {
    //todo notification error
    console.log("Error");
    return;
  }

  emit('onSave');
}

</script>

<template>
  <div v-if="modelValue">
    <Header title="Configuration" />

    <div class="flex flex-col gap-y-4 px-4">
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
        label="Expiration"
        placeholder="Expiration"
        required
        after-now
      />
    </div>

    <ion-footer class="px-4 py-4">
      <app-button class="h-full" color="dark" text="Terminer" @click="beforeSave()" />
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