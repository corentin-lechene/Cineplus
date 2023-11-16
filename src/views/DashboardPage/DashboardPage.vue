<script lang="ts" setup>

import {IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonRow, IonToolbar} from "@ionic/vue";
</script>

<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-grid>
          <ion-row>
            <ion-col class="flex items-center">
              <ion-label class="text-3xl font-medium">Dashboard</ion-label>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>

    <ion-content :force-overscroll="false" class="rounded-lg">
      dashboard
    </ion-content>

  </ion-page>
</template>