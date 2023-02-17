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
      <button class="btn btn-outline-primary" @click.prevent="login">Se connecter</button>
      <button class="btn btn-outline-secondary my-2" @click.prevent="register">S'inscrire</button>
      <a href="/forgot-password" class="text-center">Mot de passe oublié ?</a>
    </form>
  </container>
</template>

<script>
import {defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import Container from "@/components/Container";
import axios from "axios";

export default defineComponent({
  name: "AuthLogin",
  components: {
    Container
  },
  setup() {
    const user = ref({})
    const router = useRouter()
    const msg = ref("");
    const verifConexion = () =>{
      if(localStorage.getItem('token') !== null){
        window.location.href = '/agences';
      }
    }
    verifConexion();
    const register = () => {
      router.push('/register')
    };
    const login = () => {
      axios.post('http://localhost:8000/api/login', user.value)
          .then(response => {
            localStorage.setItem('token', response.data.access_token)
            user.value = {}
            msg.value = "";
            router.push('/agences')
            document.querySelectorAll('.inputForm').forEach(function (elm) {
              elm.classList.value = 'inputForm';
            })
          })
          .catch(error => {
            msg.value = error.response.data.message;
            document.querySelectorAll('.inputForm').forEach(function (elm) {
              elm.classList.value = 'inputForm is-invalid';
            })
          })
    }

    return {user, login, register,msg}
  }
})
</script>