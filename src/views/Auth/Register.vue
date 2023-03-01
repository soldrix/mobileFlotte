<template>
  <container title="Inscription">
    <form class="bg-dark px-2 mt-5 d-flex flex-column">
      <div class="d-flex justify-content-between px-3 my-2">
        <label for="first_name">Prenom : </label>
        <input id="first_name" type="text" class="inputForm" v-model="user.first_name">
      </div>
      <p class="text-danger text-center">{{(msgErrors.first_name === undefined) ? '' : msgErrors.first_name[0]}}</p><div class="d-flex justify-content-between px-3 my-2">
        <label for="last_name">Nom : </label>
        <input id="last_name" type="text" class="inputForm" v-model="user.last_name">
      </div>
      <p class="text-danger text-center">{{(msgErrors.last_name === undefined) ? '' : msgErrors.last_name[0]}}</p>
      <div class="d-flex justify-content-between px-3 my-2">
        <label for="email">Email :</label>
        <input id="email" type="email" class="inputForm" v-model="user.email">
      </div>
      <p class="text-danger text-center">{{(msgErrors.email === undefined) ? '' : msgErrors.email[0]}}</p>
      <div class="d-flex justify-content-between px-3 my-2">
        <label for="password">Mot de passe :</label>
        <input id="password" type="password" class="inputForm" v-model="user.password">
      </div>
      <p class="text-danger text-center">{{(msgErrors.password === undefined) ? '' : msgErrors.password[0]}}</p>
      <div class="d-flex justify-content-between px-3 my-2">
        <label for="password_confirmation">Confirmer mot de passe :</label>
        <input id="password_confirmation" class="inputForm" type="password" v-model="user.password_confirmation">
      </div>
      <p class="text-danger text-center">{{(msgErrors.password_confirmation === undefined) ? '' : msgErrors.password_confirmation[0]}}</p>
      <button class="btn btn-outline-primary my-3" @click.prevent="register">S'inscrire</button>
      <a href="/login" class="text-center mb-2">Vous êtes déjà inscrit(e)? connectez-vous.</a>
    </form>
  </container>
</template>

<script>
import {defineComponent, ref} from "vue";
import Container from "@/components/Container";
import axios from "axios"
import router from "../../router";
export default defineComponent({
  name: "AuthRegister",
  components: {
    Container
  },
  setup() {
    const user = ref({})
    const msgErrors = ref({});
    const verifConexion = () =>{
      if(localStorage.getItem('token') !== null){
        router.replace('/agences');
      }
    }
    verifConexion();
    const register = () => {
      axios.post('http://localhost:8000/api/register', user.value)
          .then(response => {
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('id_user', response.data.id_user)
            user.value = {}
            router.push('/agences')
            document.querySelectorAll('.inputForm').forEach(function (elm) {
              elm.classList.value = 'inputForm';
            })
          })
          .catch(error => {
            // TODO Error message when password is wrong
            msgErrors.value = error.response.data.error;
            document.querySelectorAll('.inputForm').forEach(function (elm) {
              elm.classList.value = 'inputForm';
            })
            for (let i = 0; i < Object.keys(msgErrors.value).length; i++) {
              document.getElementById(Object.keys(msgErrors.value)[i]).classList.value = 'inputForm is-invalid';
            }
          })
    }

    return {user, register,msgErrors}
  }
})
</script>