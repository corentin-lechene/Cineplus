<script lang="ts" setup>

import BaseHeader from "@/components/common/BaseHeader.vue";
import BaseList from "@/components/ui/BaseList.vue";
import {onMounted, ref} from "vue";
import {IonCard, IonIcon, IonItem, IonSpinner, IonText} from "@ionic/vue";
import dayjs from "@/configs/dayjs.config";
import {useUserStore} from "@/stores/user";
import {Backup} from "@/models";
import {
  checkmarkOutline,
  cloudDoneOutline,
  cloudDownloadOutline,
  cloudOfflineOutline,
  cloudOutline
} from "ionicons/icons";
import {BackupService} from "@/services/backup.service";

defineEmits(['onClose']);

const loading = ref("");
const currentBackup = ref<Backup>();
const backups = ref<Backup[]>([]);

onMounted(async () => {
  await fetchBackups();
});


async function fetchBackups() {
  console.log("fetchBackups");
  const userStore = useUserStore();
  if(!userStore.user) return;

  console.log(userStore.user)
  backups.value = await BackupService.fetchBackups(userStore.user.id);
  console.log(backups.value)
  currentBackup.value = backups.value.find(backup => backup.id === userStore.user?.backup?.id);
}

async function downloadBackup(backup: Backup) {
  loading.value = backup.id;
  const userStore = useUserStore();
  userStore.useBackup(backup);
  currentBackup.value = backup;
  setTimeout(() => loading.value = "", 200);
}
</script>

<template>
<div>
  <BaseHeader arrow-back-button close-button title="Sauvegardes" @on-close="$emit('onClose')" />

  <ion-card class="mx-2.5 my-0">
    <ion-item v-if="currentBackup" lines="none">
      <ion-icon slot="start" :icon="cloudDoneOutline" class="rounded-full bg-green-200 p-3" size="large"></ion-icon>
      <div class="flex items-start h-full py-4">
        <div class="flex flex-col gap-y-0.5 relative" style="max-width: 12em">
          <ion-text class="whitespace-nowrap text-xl">
            Sauvegarde {{ currentBackup.type === 'auto' ? 'automatique' : 'manuelle' }}
          </ion-text>
          <ion-text color="medium" style="font-size: 0.95em">
            {{ dayjs(currentBackup.createdAt).format("DD MMMM YYYY [à] HH:mm") }}
          </ion-text>
        </div>
      </div>
    </ion-item>
    <ion-item v-else lines="none">
      <ion-icon slot="start" :icon="cloudOfflineOutline" class="rounded-full bg-gray-200 p-3" size="large"></ion-icon>
      <div class="flex items-start h-full py-4">
        <div class="flex flex-col gap-y-0.5 relative" style="max-width: 12em">
          <ion-text class="whitespace-nowrap text-xl">Pas de sauvegarde</ion-text>
          <ion-text color="medium" style="font-size: 0.95em">Compte non sauvegardé sur le cloud</ion-text>
        </div>
      </div>
    </ion-item>
  </ion-card>

  <BaseList :items="backups.slice(0, 8)" class="ion-margin-horizontal drop-shadow-card" title="Toutes les sauvegardes">
    <template #default="{item: backup}: {item: Backup}">
      <ion-item lines="full">
        <ion-icon
            slot="start"
            :class="backup.id === currentBackup?.id ? 'bg-green-200' : 'bg-gray-200'" :icon="backup.id === currentBackup?.id ? cloudDoneOutline : cloudOutline"
            class="rounded-full bg-gray-200 p-2.5"
        ></ion-icon>
        <div class="flex items-start h-full py-2">
          <div class="flex flex-col gap-y-0.5 relative" style="max-width: 12em">
            <ion-text class="whitespace-nowrap">Sauvegarde {{ backup.type === 'auto' ? 'automatique' : 'manuelle' }}</ion-text>
            <ion-text color="medium" style="font-size: 0.95em">{{ dayjs(backup.createdAt).format("DD MMMM YYYY [à] HH:mm") }}</ion-text>
          </div>
        </div>
        <ion-spinner v-if="loading === backup.id" slot="end" name="crescent"></ion-spinner>
        <ion-icon v-else-if="backup.id !== currentBackup?.id" slot="end" :icon="cloudDownloadOutline" class="" @click="downloadBackup(backup)"></ion-icon>
        <ion-icon v-else slot="end" :icon="checkmarkOutline" class="text-blue-800"></ion-icon>
      </ion-item>
    </template>
  </BaseList>
</div>
</template>

<style scoped>

</style>