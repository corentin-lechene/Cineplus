<script lang="ts" setup>
import {ref} from "vue";
import {IonFooter} from "@ionic/vue";

import Header from "@/components/headers/Header.vue";
import BaseInput from "@/components/inputs/BaseInput.vue";
import AppButton from "@/components/buttons/AppButton.vue";

import {ToastService} from "@/services/toast.service";
import dayjs from "@/configs/dayjs.config";
import BaseTextarea from "@/components/inputs/BaseTextarea.vue";


const emit = defineEmits(['update:modelValue', 'onSave']);

const form = ref({
  date: dayjs().format('YYYY-MM-DD'),
  extra: 0,
  note: '',
});



function formIsValid() {
  if(!dayjs(form.value.date).isValid()) return false;
  if(form.value.extra < 0) return false;
  return form.value.note.length <= 255;
}

function beforeSave() {
  if(!formIsValid()) {
    ToastService.error('Le formulaire est invalide').catch();
    return;
  }

  emit('onSave', form.value);
}

</script>

<template>
  <div>
    <Header title="Sauvegarde" />

    <div class="flex flex-col gap-y-4 px-4">
      <BaseInput
          v-model="form.date"
          type="date"
          label="Date de la séance"
          placeholder="date de la séance"
          required
      />
      <BaseInput
          v-model.number="form.extra"
          type="price"
          label="Achat supplémentaire"
          placeholder="Achat supplémentaire"
      />
      <BaseTextarea
          v-model.trim="form.note"
          type="textarea"
          label="Ma note"
          placeholder="Ma note"
      />
    </div>

    <ion-footer class="px-4 py-4">
      <app-button class="h-full" color="dark" text="Terminer" @click="beforeSave()" />
    </ion-footer>

  </div>
</template>

<style>

ion-modal {
  --height: auto;
}
</style>