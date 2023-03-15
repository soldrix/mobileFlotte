<template>
  <container title="Connexion">
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
      <div v-if="userDisabled === true">
        <button class="btn btn-outline-danger w-100" @click="redirectDeleteAccount">Supprimer le compte ?</button>
        <button class="btn btn-outline-success w-100 my-2" @click="redirectActivateAccount">Réactiver le compte ?</button>
      </div>
      <div v-else>
        <button class="btn btn-outline-primary w-100" @click.prevent="login">Se connecter</button>
        <button class="btn btn-outline-secondary w-100 my-2" @click.prevent="register">S'inscrire</button>
        <a href="/forgot-password" class="text-center">Mot de passe oublié ?</a>
      </div>

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
    const userDisabled = ref(false);
    const verifConexion = () =>{
      if(localStorage.getItem('token') !== null){
        router.replace('/agences');
      }
    }
    verifConexion();
    const register = () => {
      router.replace('/register')
    };
    const  presentToast = async (datas) => {
      const  toast = await toastController.create({
        message: datas ,
        duration: 4500,
        position: 'middle'
      });
      toast.onDidDismiss = () =>{
        toast.del()
      }
      await toast.present();
    };
    if(localStorage.getItem('deleteMsg') !== null){
      presentToast(localStorage.getItem('deleteMsg'))
      localStorage.clear()
    }
    const login = () => {
      axios.post(apiUrl+'/login', user.value)
          .then(response => {
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('id_user', response.data.id_user)
            user.value = {}
            msg.value = "";
            router.replace('/agences')
            document.querySelectorAll('.inputForm').forEach(function (elm) {
              elm.classList.value = 'inputForm';
            })
          })
          .catch(error => {
            msg.value = error.response.data.message;
            document.querySelectorAll('.inputForm').forEach(function (elm) {
              elm.classList.value = 'inputForm is-invalid';
            });
            if(error.response.data.data){
              userDisabled.value = true;
              localStorage.setItem('userDisabled',error.response.data.data)
            }
          })
    };
    const redirectDeleteAccount = () =>{
      router.replace('/deleteAccount');
    };
    const redirectActivateAccount = ()=>{
      router.replace('/activateAccount');
    };

    return {user, login, register,msg,userDisabled,redirectDeleteAccount,redirectActivateAccount}
  }
})
</script>