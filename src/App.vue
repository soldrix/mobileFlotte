<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>
<style>
@import '~bootstrap/dist/css/bootstrap.css';
.is-invalid{
  border: 1px solid red;
}
ion-content {
  --background: #121212;
}
ion-header{
  --ion-toolbar-background: #0d0d0d;
}
input{
  outline: transparent;
}
.h-fit{
  height: fit-content;
}
*:not(input){
  --ion-text-color: white !important;
}
</style>
