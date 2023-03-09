<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-menu v-if="token !== null" content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu Content</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content  class="ion-padding">
        <ion-item lines="full" @click="redirectRoute('/agences')">
          <ion-label>Agences</ion-label>
        </ion-item>
        <ion-item lines="full" @click="redirectRoute('/locations')">
          <ion-label>Mes locations</ion-label>
        </ion-item>
        <ion-item lines="full" @click="redirectRoute('/profil')">
          <ion-label>Mon profil</ion-label>
        </ion-item>
        <ion-item lines="full" @click="logout" class="logout">
          <ion-label>Déconnexion</ion-label>
        </ion-item>
      </ion-content>
    </ion-menu>
    <ion-content id="main-content">
      <main class="pt-5">
        <slot></slot>
      </main>
    </ion-content>
  </ion-page>
</template>

<script>
import {defineComponent} from "vue";
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonMenu,IonMenuButton,IonButtons,IonItem,IonLabel} from "@ionic/vue";
import axios from "axios";
import router from "@/router";
export default defineComponent({
  name: "ContainerComponent",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonMenu,
    IonMenuButton,
    IonButtons,
    IonItem,
    IonLabel
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },setup(){
    const token = localStorage.getItem('token');
    const logout = () =>{
      axios.post('https://gestion-flotte.project-soldrix.fr/api/logout',{},{
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then( () =>{
        localStorage.clear()
        router.replace('/login');
      }).catch(error => {
        if(error.response.data.message){
          localStorage.clear();
          router.replace('/login');
        }
      })
    }
    const redirectRoute = (route) =>{
      router.replace(route)
    };
    return {logout,token,redirectRoute};
  }
})
</script>

<style lang="scss" scoped>
.logout{
  position: absolute;
  bottom: 0;
  right: 0;
}
.text-white{
  color: white;
  cursor: pointer;
}
main {
  padding: 0 10px;
}
</style>