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
input{
  outline: transparent;
}
.h-fit{
  height: fit-content;
}
</style>
