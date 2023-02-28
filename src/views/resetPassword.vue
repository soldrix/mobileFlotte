<template>
  <container title="Modification mot de passe">
    <p class="alert-success text-center bg-success text-white">{{successMsg ?? ''}}</p>
    <form class="d-flex justify-content-center flex-column p-2 bg-dark mt-5">
      <div class="d-flex justify-content-between px-3 mb-2">
        <label for="password">Mot de passe :</label>
        <input id="password" type="password" class="inputForm" v-model="data.password">
      </div>
      <p class="text-danger text-center">{{(msg.password === undefined) ? '' : msg.password[0]}}</p>
      <div class="d-flex justify-content-between px-3 mb-2">
        <label for="Confirm_password">Confirmer mot de passe :</label>
        <input id="Confirm_password" type="password" class="inputForm" v-model="data.password_confirmation">
      </div>
      <p class="text-danger text-center">{{(msg.password_confirmation === undefined) ? '' : msg.password_confirmation[0]}}</p>
      <button class="btn btn-outline-primary" @click.prevent="resetPassword(user.id)">Continuer</button>
      <a href="#" class="text-center mt-3" @click="goLogin">Se connecter ?</a>
    </form>
  </container>
</template>
<script>
import {defineComponent, ref} from "vue";
import Container from "../components/Container";
import axios from "axios";
import router from "../router";
export default defineComponent({
  name:"resetView",
  components:{
    Container
  },setup(){
    const user = ref([]);
    const data =ref({});
    const msg = ref({});
    const successMsg= ref('');
    const getUser = ()=>{
      // const params = new URLSearchParams(document.location.search);
      axios.get('http://localhost:8000/api/reset-password'+document.location.search)
          .then(response =>{
            user.value = response.data.data[0];
          })
          .catch(error =>{
            if(error.response.data.success === false){
              localStorage.clear();
              router.push('Login');
            }
          })
    }
    getUser();
    const resetPassword = (id)=>{
      data.value.id = id;
      axios.post('http://localhost:8000/api/reset-password',data.value)
        .then(response =>{
          successMsg.value = response.data.message;
        })
        .catch(error=>{
          msg.value = error.response.data.error;
          document.querySelectorAll('.inputForm').forEach(function (elm) {
            elm.classList.value = 'inputForm';
          })
          for (let i = 0; i < Object.keys(msg.value).length; i++) {
            document.getElementById(Object.keys(msg.value)[i]).classList.value = 'inputForm is-invalid';
          }
        })
    }
    const goLogin = ()=>{
      router.push('/login');
    };
    return {user,data,msg,resetPassword,goLogin,successMsg}
  }
})
</script>