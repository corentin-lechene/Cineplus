<script lang="ts" setup>

import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";
import {computed, ref} from "vue";
import {IonActionSheet, IonContent, IonModal} from "@ionic/vue";

import BaseList from "@/components/lists/BaseList.vue";
import {
  cardOutline,
  cloudDoneOutline,
  cloudOutline,
  handLeftOutline,
  helpCircleOutline,
  informationOutline,
  languageOutline,
  notificationsOutline,
  personOutline,
  sunnyOutline,
} from "ionicons/icons";
import ListItem from "@/components/lists/ListItem.vue";
import AppButton from "@/components/buttons/AppButton.vue";
import BaseHeader from "@/components/common/BaseHeader.vue";
import CloudBackups from "@/components/backups/CloudBackups.vue";

const router = useRouter();
const userStore = useUserStore();

const fullName = computed(() => {
  if (!userStore.user || userStore.user.loyaltyCards.length <= 0) return ""
  return userStore.user.loyaltyCards[userStore.user.loyaltyCards.length - 1]!.firstname
      + ' ' +
      userStore.user.loyaltyCards[userStore.user.loyaltyCards.length - 1]!.lastname
});

const openResetModal = ref(false);
const openCloudModalSave = ref(false);

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
    },
    {
      label: 'Cartes de fidélité',
      route: 'loyalty-cards',
      value: "",
      icon: cardOutline,
      clickable: true,
      last: true
    }
  ]
})
const listPreferencesItems = [
  {
    label: 'Notifications',
    value: 'Désactivées',
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
  // {
  //   label: 'Publicité',
  //   value: 'Désactivée',
  //   clickable: true,
  //   icon: cashOutline,
  //   disabled: true,
  // },
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
    router.push(item.route);
  } else {
    console.error("Cant find route");
  }
}

function resetApp(e: CustomEvent) {
  if (e?.detail?.data?.action === 'delete') {
    openResetModal.value = true;
    userStore.resetUser();
  } else {
    openResetModal.value = false;
  }
}


</script>

<template>
  <ion-page>

    <BaseHeader
        :right-button="userStore.user?.backup ? cloudDoneOutline : cloudOutline"
        :right-button-color="userStore.user?.backup ? 'bg-green-200' : 'bg-gray-200 '"
        title="Paramètres"
        @on-cloud="openCloudModalSave = true"
    />

    <ion-content :force-overscroll="false" class="ion-padding" color="light">

      <BaseList title="Mon compte">
        <ListItem v-for="(item, i) in listAccountItems" :key="i" v-bind="item" @on-click="openSetting"/>
      </BaseList>

      <BaseList title="Préférences">
<!--        <ListItem v-bind="listPreferencesItems[0]"/>-->
        <ListItem v-bind="listPreferencesItems[1]"/>
<!--        <ListItem last v-bind="listPreferencesItems[2]"/>-->
      </BaseList>

<!--      <BaseList title="Aide">-->
<!--        <ListItem v-for="(item, i) in listHelpItems" :key="i" v-bind="item" @onClick="openSetting"/>-->
<!--      </BaseList>-->

      <BaseList title="Mention légal">
        <ListItem v-for="(item, i) in listLegalItems" :key="i" v-bind="item" @onClick="openSetting"/>
      </BaseList>

      <app-button bg-color="white" color="danger" text="Réinitialiser" @onTap="openResetModal = true"/>

      <ion-action-sheet
          :buttons="resetActions"
          :is-open="openResetModal"
          header="Reinitialiser"
          @didDismiss="resetApp"
      />
      <ion-modal
          :breakpoints="[0, 1]"
          :initial-breakpoint="1"
          :is-open="openCloudModalSave"
          @didDismiss="openCloudModalSave = false"
      >
        <CloudBackups @onClose="openCloudModalSave = false" />
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-modal {
  --height: auto;
}

ion-toolbar {
  --background: white;
  --border-style: none;
}
</style>