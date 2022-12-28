<template>
  <container title="Connexion">
    <form>
      <input type="email" v-model="user.email">
      <input type="password" v-model="user.password">
      <button @click.prevent="login">Se connecter</button>
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

    const login = () => {
      axios.post('http://localhost:8000/api/login', user.value)
          .then(response => {
            localStorage.setItem('token', response.data.access_token)
            user.value = {}
            router.push('/voitures')
          })
          .catch(error => {
            console.log(error)
          })
    }

    return {user, login}
  }
})
</script>