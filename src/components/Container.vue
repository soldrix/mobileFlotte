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
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu Content</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content  class="ion-padding">
        <ion-item lines="full" href="/agences">
          <ion-label>Agence</ion-label>
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
    const logout = () =>{
      axios.post('http://localhost:8000/api/logout',{},{
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then( () =>{
        localStorage.removeItem('token')
        window.location.href = '/login';
      }).catch(error => {
        if(error.message){
          window.location.href  = "/login";
        }
        console.log(error)
      })
    }
    return {logout};
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