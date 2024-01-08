<script setup lang="ts">

import {IonContent, IonPage} from "@ionic/vue";
import Header from "@/components/headers/Header.vue";
</script>

<template>
  <ion-page>
    <Header
        title="Politique de Confidentialité"
        default-href="/settings"
        no-text
        back-button
    />

    <ion-content>
      <div class="container ion-padding">
        <p>L'application Ciné+ est une application gratuite proposée par Corentin. Ce SERVICE est fourni par Corentin gratuitement et est destiné à être utilisé tel quel.</p>

        <p>Cette page est utilisée pour informer les visiteurs de nos politiques en matière de collecte, d'utilisation et de divulgation des informations personnelles si quelqu'un décide d'utiliser notre Service.</p>

        <p>Si vous choisissez d'utiliser notre Service, vous acceptez la collecte et l'utilisation d'informations conformément à cette politique. Les informations personnelles que nous collectons sont utilisées pour fournir et améliorer le Service. Nous n'utiliserons ni ne partagerons vos informations avec personne, sauf tel que décrit dans cette Politique de Confidentialité.</p>

        <p>Les termes utilisés dans cette Politique de Confidentialité ont la même signification que dans nos Conditions Générales, qui sont accessibles sur Ciné+ sauf indication contraire dans cette Politique de Confidentialité.</p>

        <!-- Autres sections de votre politique de confidentialité... -->

        <p>Politique de confidentialité en vigueur à partir du 2023-09-06</p>

        <h2>Nous Contacter</h2>
        <p>Si vous avez des questions ou des suggestions concernant notre Politique de Confidentialité, n'hésitez pas à <a href="mailto:corentin.lechene.pro@gmail.com">me contacter</a>.</p>
      </div>

    </ion-content>
  </ion-page>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f7f7f7;
  color: #333;
}
h1 {
  font-size: 24px;
  margin: 20px 0;
  text-align: center;
}
h2 {
  font-size: 20px;
  color: #007BFF;
}
p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}
a {
  color: #007BFF;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>