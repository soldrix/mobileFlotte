<template>
  <container title="Inscription">
    <form class="bg-dark px-2 mt-5 d-flex flex-column">
      <div class="d-flex justify-content-between px-3 my-2">
        <label for="name">Nom : </label>
        <input id="name" type="text" class="inputForm" v-model="user.name">
      </div>
      <p class="text-danger text-center">{{(msgErrors.name === undefined) ? '' : msgErrors.name[0]}}</p>
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
import {useRouter} from "vue-router";
import Container from "@/components/Container";
import axios from "axios"

export default defineComponent({
  name: "AuthRegister",
  components: {
    Container
  },
  setup() {
    const user = ref({})
    const router = useRouter()
    const msgErrors = ref({});
    const verifConexion = () =>{
      if(localStorage.getItem('token') !== null){
        window.location.href = '/agences';
      }
    }
    verifConexion();
    const register = () => {
      axios.post('http://localhost:8000/api/register', user.value)
          .then(response => {
            localStorage.setItem('token', response.data.access_token)
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