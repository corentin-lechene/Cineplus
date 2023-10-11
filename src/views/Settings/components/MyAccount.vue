<script setup lang="ts">

import {IonContent, IonPage} from "@ionic/vue";
import Header from "@/components/headers/Header.vue";
import BaseInput from "@/components/inputs/BaseInput.vue";
import {ref} from "vue";
import {useUserStore} from "@/stores/user";

const userStore = useUserStore();

const currentUser = ref(userStore.user);

function updateUser() {
  if(!currentUser.value) return;
  userStore.updateUser(currentUser.value)
}


</script>

<template>
  <ion-page>
    <Header title="Mon compte" backButton default-href="/settings" />
    <ion-content color="tertiary" class="ion-padding-vertical">
      <div v-if="currentUser" class="flex flex-col gap-y-4 px-4">
        <BaseInput
          v-model="currentUser.firstname"
          :debounce="750"
          type="text"
          placeholder="John"
          label="Prénom"
          bg-color="light"
          @update:model-value="() => updateUser()"
        />
        <BaseInput
          v-model="currentUser.lastname"
          :debounce="750"
          type="text"
          placeholder="Doe"
          label="Nom"
          bg-color="light"
          @update:model-value="() => updateUser()"
        />

        <ion-note class="ion-padding-horizontal">
          Ces informations ne sont pas utilisées dans notre application et sont collectées uniquement à des fins de formalités d'inscription.
        </ion-note>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>