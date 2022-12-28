<template>
  <container title="Inscription">
    <form>
      <input type="text" v-model="user.name">
      <input type="email" v-model="user.email">
      <input type="password" v-model="user.password">
      <input type="password" v-model="user.password_confirmation">
      <button @click.prevent="register">S'inscrire</button>
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

    const register = () => {
      axios.post('http://localhost:8000/api/register', user.value)
          .then(response => {
            localStorage.setItem('token', response.data.access_token)
            user.value = {}
            router.push('/courses')
          })
          .catch(error => {
            // TODO Error message when password is wrong
            console.log(error)
          })
    }

    return {user, register}
  }
})
</script>