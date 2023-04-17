<template>
  <container title="Suppression du compte">
    <form class="d-flex justify-content-center flex-column p-2 bg-dark mt-5">
      <div class="d-flex justify-content-between px-3 mb-2">
        <label for="email">Email :</label>
        <input id="email" type="email" class="inputForm" v-model="user.email">
      </div>
      <div class="d-flex justify-content-between px-3 mb-2">
        <label for="password">Mot de passe :</label>
        <input id="password" type="password" class="inputForm" v-model="user.password">
      </div>
      <p class="text-center text-danger">{{msg ?? ''}}</p>
      <button class="btn btn-outline-danger w-100" @click.prevent="deleteAccount">Continuer</button>
      <button class="btn btn-outline-success w-100 my-2" @click="activateAccount">Réactiver le compte ?</button>
      <button class="btn btn-outline-primary w-100 my-2" @click="gologin">Retour</button>
    </form>
  </container>
</template>

<script>
import {api} from '../../main';
import {defineComponent, ref} from "vue";
import Container from "@/components/Container";
import axios from "axios";
import {toastController} from "@ionic/vue";
import router from "../../router";
export default defineComponent({
  name: "AuthLogin",
  components: {
    Container
  },
  setup() {
    const apiUrl = api('local');
    const user = ref({})
    const msg = ref("");
    const verifConexion = () =>{
        if(localStorage.getItem('userDisabled') === null){
          router.replace('/login');
        }else{
          user.value.email = localStorage.getItem('userDisabled');
        }
    }
    verifConexion();
    const  presentToast = async (datas) => {
      const  toast = await toastController.create({
        message: datas ,
        duration: 4500,
        position: 'middle'
      });
      toast.onDidDismiss = () =>{
        toast.del()
        router.replace('/login')
      }
      await toast.present();
    };
    const deleteAccount = () => {
      axios.get(apiUrl+'/delete-user?email='+user.value.email)
      .then(response =>{
          if(response.data.user === true){
            user.value.id = response.data.data.id;
            axios.post(apiUrl+'/delete-user', user.value)
                .then(response => {
                  user.value = {}
                  msg.value = "";
                  document.querySelectorAll('.inputForm').forEach(function (elm) {
                    elm.classList.value = 'inputForm';
                  })
                  localStorage.removeItem('userDisabled');
                  localStorage.setItem('deleteMsg',response.data.message)
                  router.replace('/login')
                })
                .catch(error => {
                  msg.value = error.response.data.message;
                  document.querySelectorAll('.inputForm').forEach(function (elm) {
                    elm.classList.value = 'inputForm is-invalid';
                  });
                })
          }else{
            localStorage.removeItem('userDisabled');
            presentToast("Le compte n'est pas désactiver, vous allez être redirigé.")
          }
      })
    };
    const activateAccount = ()=>{
      router.replace('/activateAccount');
    };
    const gologin = ()=>{
      router.replace('/login');
    }
    return {user,msg,deleteAccount,activateAccount,gologin}
  }
})
</script>