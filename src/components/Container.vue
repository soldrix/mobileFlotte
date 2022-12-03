<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ title }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <main>
        <slot></slot>
      </main>
    </ion-content>
  </ion-page>
</template>

<script>
import {defineComponent} from "vue";
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent} from "@ionic/vue";

export default defineComponent({
  name: "ContainerComponent",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
  },
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
main {
  padding: 0 10px;
}
</style>