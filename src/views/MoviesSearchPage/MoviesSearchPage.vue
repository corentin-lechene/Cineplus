<script lang="ts" setup>

import {IonCol, IonContent, IonGrid, IonHeader, IonRow, IonSearchbar, IonToolbar} from "@ionic/vue";
import {ref} from "vue";

const minimize = ref(false);
const isAnimating = ref(false);

async function searchMovies(event: CustomEvent) {
  console.log(event.detail.value);
}

</script>

<template>
  <ion-page>
    <ion-header v-if="!minimize" class="ion-no-border">
      <ion-toolbar>
        <ion-grid class="">
          <ion-row>
            <ion-col class="flex items-center">
              <ion-searchbar
                animated
                class="ion-no-padding"
                placeholder="Rechercher..."
                show-cancel-button="focus"
                @ionChange="searchMovies($event)"
              ></ion-searchbar>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      search
    </ion-content>

  </ion-page>
</template>