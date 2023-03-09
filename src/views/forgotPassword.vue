<template>
  <container title="Mot de passe oublié">
    <form class="d-flex justify-content-center flex-column p-2 bg-dark mt-5">
      <div class="d-flex justify-content-between align-items-center px-3 mb-2">
        <label for="email">Email :</label>
        <input id="email" type="email" v-model="user.email">
      </div>
      <p class="text-center text-success">{{message}}</p>
      <p class="text-danger text-center">{{msgErrors}}</p>
      <button class="btn btn-outline-primary mb-2" @click.prevent="forgotPassword">Continuer</button>
      <a href="#" class="text-center" @click.prevent="login">Revenir ?</a>

    </form>
  </container>
</template>

<script>
import {defineComponent, ref} from "vue";
import Container from "@/components/Container";
import axios from "axios";
import router from "../router";
export default defineComponent({
  name: "AuthLogin",
  components: {
    Container
  },
  setup() {
    const user = ref({})
    const message = ref("");
    const msgErrors =ref("");
    const verifConexion = () =>{
      if(localStorage.getItem('token') !== null){
        router.replace('/agences');
      }
    }
    verifConexion();
    const login = () => {
      router.replace('/login')
    }
    const forgotPassword = () =>{
      axios.post('https://gestion-flotte.project-soldrix.fr/api/forget-password',user.value)
      .then(response =>{
        if(response.data.msg){
          message.value = response.data.msg;
          msgErrors.value = "";
          document.getElementById('email').classList.value = '';
        }
      })
      .catch(errors =>{
        msgErrors.value = errors.response.data.errors.email[0];
        document.getElementById('email').classList.value = 'is-invalid';
      })
    };
    return {user, login,forgotPassword,message,msgErrors}
  }
})
</script>
