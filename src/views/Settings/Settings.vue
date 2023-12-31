<script setup lang="ts">

import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";
import {computed, ref} from "vue";
import { IonPage, IonContent, IonActionSheet } from "@ionic/vue";

import Header from "@/components/headers/Header.vue";
import BaseList from "@/components/lists/BaseList.vue";
import {
  cardOutline,
  cashOutline, handLeftOutline,
  helpCircleOutline,
  informationOutline,
  languageOutline,
  notificationsOutline,
  personOutline,
  sunnyOutline,
} from "ionicons/icons";
import ListItem from "@/components/lists/ListItem.vue";
import AppButton from "@/components/buttons/AppButton.vue";


const router = useRouter();

const userStore = useUserStore();


const fullName = computed(() => userStore.fullName);
const subscription = computed(() => userStore.lastSubscription);

const openResetModal = ref(false);

const resetActions = [
  {
    text: 'Confirmer',
    role: 'destructive',
    data: {
      action: 'delete',
    },
  },
  {
    text: 'Annuler',
    role: 'cancel',
    data: {
      action: 'cancel',
    },
  },
];


/* lists */

const listAccountItems = computed(() => {
  return [
    {
      label: 'Profil',
      route: 'my-account',
      value: fullName.value,
      icon: personOutline,
      clickable: true,
    },
    {
      label: 'Abonnements',
      route: 'my-subscriptions',
      value: subscription.value?.name || 'Aucun abonnement',
      icon: cardOutline,
      clickable: true,
      last: true
    }
  ]
})
const listPreferencesItems = [
  {
    label: 'Notifications',
    value: 'Activées',
    icon: notificationsOutline,
    disabled: true,
  },
  {
    label: 'Langue',
    value: 'Français',
    icon: languageOutline,
    disabled: true,
  },
  {
    label: 'Mode sombre',
    value: false,
    icon: sunnyOutline,
    disabled: true,
    last: true
  }
]
const listHelpItems = [
  {
    label: 'FAQ',
    value: undefined,
    icon: helpCircleOutline,
    disabled: true,
    clickable: true,
  },
  {
    label: 'A propos',
    value: undefined,
    icon: informationOutline,
    disabled: true,
    clickable: true,
    last: true
  }
];
const listLegalItems = [
  {
    label: 'Publicité',
    value: 'Désactivée',
    clickable: true,
    icon: cashOutline,
    disabled: true,
  },
  {
    label: 'Politique de confidentialité',
    value: undefined,
    route: 'privacy-policy',
    icon: handLeftOutline,
    clickable: true,
    last: true
  }
]


function openSetting(item: any) {
  if (item.route) {
    router.push({ path: `/settings/${item.route}` });
  } else {
    console.error("Cant find route");
  }
}

function resetApp(e: CustomEvent) {
  if (e?.detail?.data?.action === 'delete') {
    openResetModal.value = true;
    userStore.resetUser();
    router.replace('/intro');
  }
}


</script>

<template>
  <ion-page>

    <Header title="Paramètres" back-button default-href="/home" no-text />

    <ion-content color="tertiary" class="ion-padding" :force-overscroll="false">

      <BaseList title="Mon compte">
        <ListItem v-for="(item, i) in listAccountItems" :key="i" v-bind="item" @on-click="openSetting"/>
      </BaseList>

      <BaseList title="Préférences">
        <ListItem v-bind="listPreferencesItems[0]" />
        <ListItem v-bind="listPreferencesItems[1]" />
        <ListItem v-bind="listPreferencesItems[2]" last />
      </BaseList>

      <BaseList title="Aide">
        <ListItem v-for="(item, i) in listHelpItems" :key="i" v-bind="item" @onClick="openSetting" />
      </BaseList>

      <BaseList title="Mention légal">
        <ListItem v-for="(item, i) in listLegalItems" :key="i" v-bind="item" @onClick="openSetting" />
      </BaseList>

      <app-button color="danger" text="Réinitialiser" bg-color="light" @onTap="openResetModal = true"/>

      <ion-action-sheet
        :is-open="openResetModal"
        :buttons="resetActions"
        header="Reinitialiser"
        @didDismiss="resetApp"
      />
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-toolbar {
  --background: white;
  --border-style: none;
}
</style>