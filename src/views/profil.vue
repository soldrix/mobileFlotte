<template>
  <container title="Mon Profil">
    <div class="container-fluid px-3">
      <h2 class="px-3">{{(user.first_name ?? '')+" "+(user.last_name ?? '')}}</h2>
      <div class="col-auto bg-dark rounded">
        <div class="px-3 d-flex justify-content-between">
          <div class="col-auto">
            <p class="m-0">Prenom</p>
            <p class="m-0" >{{user.first_name}}</p>
          </div>
          <button class="btn btn-outline-light h-fit align-self-center" @click="openOrClose('first_name',true)">Modifier</button>
        </div>
        <div class="px-3 d-flex justify-content-between">
          <div class="col-auto">
            <p class="m-0">Nom</p>
            <p class="m-0" >{{user.last_name}}</p>
          </div>
          <button class="btn btn-outline-light h-fit align-self-center" @click="openOrClose('last_name',true)">Modifier</button>
        </div>
        <div class="px-3 d-flex justify-content-between">
          <div class="col-auto">
            <p class="m-0">Email</p>
            <p class="m-0" >{{user.email}}</p>
          </div>
          <button class="btn btn-outline-light h-fit align-self-center" @click="openOrClose('email',true)">Modifier</button>
        </div>
      </div>
      <div class="border-1 border-top border-light mt-5 pt-3">
        <h3>Mot de passe</h3>
        <button class="btn btn-outline-primary" @click="openOrClose('password',true)">Modifier mot de passe</button>
      </div>
      <div class="border-1 border-top border-light mt-5 pt-3">
        <h3>Suppression de compte</h3>
        <button class="btn btn-outline-primary" @click="presentActionSheet('delete')">Supprimer le compte</button>
      </div>
    </div>


    <ion-modal :is-open="first_name_isOpen">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="openOrClose('first_name',false)">Cancel</ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="confirm('first_name')">Confirm</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Prenom</ion-label>
          <ion-input ref="input" type="text" class="inputForm" :placeholder="user.first_name" v-model="data.first_name"></ion-input>
          <p class="text-danger">{{(msg.first_name !== undefined) ? msg.first_name[0] : ''}}</p>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Mot de passe</ion-label>
          <ion-input ref="input" type="password" class="inputForm" placeholder="Mot de passe" v-model="data.old_password"></ion-input>
          <p class="text-danger">{{(msg.old_password !== undefined) ? msg.old_password[0] : ''}}</p>
        </ion-item>
      </ion-content>
    </ion-modal>
    <ion-modal :is-open="last_name_isOpen">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="openOrClose('last_name',false)">Cancel</ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="confirm('last_name')">Confirm</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Nom</ion-label>
          <ion-input ref="input" type="text" class="inputForm" :placeholder="user.last_name" v-model="data.last_name"></ion-input>
          <p class="text-danger">{{(msg.last_name !== undefined) ? msg.last_name[0] : ''}}</p>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Mot de passe</ion-label>
          <ion-input ref="input" type="password" class="inputForm" placeholder="Mot de passe" v-model="data.old_password"></ion-input>
          <p class="text-danger">{{(msg.old_password !== undefined) ? msg.old_password[0] : ''}}</p>
        </ion-item>
      </ion-content>
    </ion-modal>
    <ion-modal :is-open="email_isOpen">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="openOrClose('email',false)">Cancel</ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="confirm('email')">Confirm</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Email</ion-label>
          <ion-input ref="input" type="text" class="inputForm" :placeholder="user.email" v-model="data.email"></ion-input>
          <p class="text-danger">{{(msg.email !== undefined) ? msg.email[0] : ''}}</p>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Mot de passe</ion-label>
          <ion-input ref="input" type="password" class="inputForm" placeholder="Mot de passe" v-model="data.old_password"></ion-input>
          <p class="text-danger">{{(msg.old_password !== undefined) ? msg.old_password[0] : ''}}</p>
        </ion-item>
      </ion-content>
    </ion-modal>
    <ion-modal :is-open="password_isOpen">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="openOrClose('password',false)">Cancel</ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="confirm('password')">Confirm</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Ancien mot de passe</ion-label>
          <ion-input ref="input" type="password" class="inputForm" placeholder="Ancien mot de passe" v-model="data.old_password"></ion-input>
          <p class="text-danger">{{(msg.old_password !== undefined) ? msg.old_password[0] : ''}}</p>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Nouveau mot de passe</ion-label>
          <ion-input ref="input" type="password" class="inputForm" placeholder="Nouveau mot de passe" v-model="data.new_password"></ion-input>
          <p class="text-danger">{{(msg.new_password !== undefined) ? msg.new_password[0] : ''}}</p>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Confirmer mot de passe</ion-label>
          <ion-input ref="input" type="password" class="inputForm" placeholder="Confirmer mot de passe" v-model="data.new_password_confirmation"></ion-input>
          <p class="text-danger">{{(msg.new_password_confirmation !== undefined) ? msg.new_password_confirmation[0] : ''}}</p>
        </ion-item>
      </ion-content>
    </ion-modal>
  </container>

</template>
<script>
import {defineComponent, ref} from "vue";
import Container from "../components/Container";
import axios from "axios";
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  toastController,
  actionSheetController
} from "@ionic/vue";
import router from "../router";
export default defineComponent({
  name : "ProfilView",
  components:{
    Container,
    IonModal,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonContent,
    IonItem,
    IonLabel,
    IonInput
  },data(){
   return {
     first_name_isOpen:false,
     last_name_isOpen:false,
     email_isOpen:false,
     password_isOpen:false
   }
  },setup(){
    const user = ref([]);
    const data =ref({
      'id' : localStorage.getItem('id_user')
    });
    const msg =ref([])
    const getUser = () =>{
      axios.get('http://localhost:8000/api/user/'+localStorage.getItem('id_user'),{
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response =>{
        user.value = response.data.user[0]
      }).catch(error =>{
        if(error.response.data.message){
          localStorage.clear();
          router.replace('/login');
        }
      })
    };

    getUser()

    const presentActionSheet = async (type) => {
      const actionSheet = await actionSheetController.create({
        header: 'Êtes-vous sûr ?',
        buttons: [
          {
            text: 'Delete',
            handler: () => {
              if(type === 'delete'){
                axios.delete('http://localhost:8000/api/user/delete/'+localStorage.getItem('id_user'),{
                  headers: {
                    "Authorization": 'Bearer ' + localStorage.getItem('token')
                  }
                }).then(response =>{
                    localStorage.setItem('deleteMsg',response.data.message)
                    router.replace('/login');
                })
                .catch(error =>{
                  if(error.response.data.message){
                    localStorage.clear();
                    router.replace('/login');
                  }
                })
              }
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            data: {
              action: 'cancel',
            },
          },
        ],
      });

      await actionSheet.present();
    };

    return {user,data,msg,presentActionSheet}
  },methods:{
    async presentToast  (datas)   {
      const  toast = await toastController.create({
        message: datas ,
        duration: 4500,
        position: 'middle'
      });
      toast.onDidDismiss = () =>{
        toast.del()
      }
      await toast.present();
    },
    openOrClose(modal,value){
      this.data = {'id': localStorage.getItem('id_user')};
      switch (modal){
        case  'first_name':
          this.first_name_isOpen = value;
        break;
        case 'last_name':
          this.last_name_isOpen = value;
        break;
        case 'email':
          this.email_isOpen = value;
        break;
        case 'password':
          this.password_isOpen = value;
        break;
      }
    },
    confirm: function (update) {
      switch (update) {
          case 'first_name':
            axios.post("http://localhost:8000/api/user/edit/first_name", this.data, {
              headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
              }
            }).then(response => {
              this.user.first_name = response.data.datas.first_name;
              this.data = {'id': localStorage.getItem('id_user') };
              this.first_name_isOpen = false;
            }).catch(error => {
              if(error.response.data.message){
                localStorage.clear();
                router.replace('/login');
              }
              this.msg = error.response.data.error;
              document.querySelectorAll('.inputForm').forEach(function (elm) {
                elm.classList.value = 'inputForm is-invalid';
              })
            })
          break;
          case "last_name":
            axios.post("http://localhost:8000/api/user/edit/last_name", this.data, {
              headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
              }
            }).then(response => {
              this.user.last_name = response.data.datas.last_name;
              this.data = {'id': localStorage.getItem('id_user') };
              this.last_name_isOpen = false;
            }).catch(error => {
              if(error.response.data.message){
                localStorage.clear();
                router.replace('/login');
              }
              this.msg = error.response.data.error;
              document.querySelectorAll('.inputForm').forEach(function (elm) {
                elm.classList.value = 'inputForm is-invalid';
              })
            })
          break;
          case 'email':
            axios.post("http://localhost:8000/api/user/edit/email", this.data, {
              headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
              }
            }).then(response => {
              this.user.email = response.data.datas.email;
              this.data = {'id': localStorage.getItem('id_user') };
              this.email_isOpen = false;
            }).catch(error => {
              if(error.response.data.message){
                localStorage.clear();
                router.replace('/login');
              }
              this.msg = error.response.data.error;
              document.querySelectorAll('.inputForm').forEach(function (elm) {
                elm.classList.value = 'inputForm is-invalid';
              })
            })
          break;
          case 'password':
            axios.post("http://localhost:8000/api/user/edit/password", this.data, {
              headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
              }
            }).then(response => {
              this.presentToast(response.data.success)
              this.data = {'id': localStorage.getItem('id_user') };
              this.password_isOpen = false;
            }).catch(error => {
              if(error.response.data.message){
                localStorage.clear();
                router.replace('/login');
              }
              this.msg = error.response.data.error;
              document.querySelectorAll('.inputForm').forEach(function (elm) {
                elm.classList.value = 'inputForm is-invalid';
              })
            })
          break;

      }

    }
  }
})
</script>