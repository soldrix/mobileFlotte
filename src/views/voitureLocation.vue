<template>
  <container title="Liste des location">
    <form-picker @addLocation="addLocation" @returnView="returnView" :msgErrors="msgErrors"/>

  </container>
</template>

<script>
import {defineComponent, ref} from 'vue';
import Container from "@/components/Container";
import FormPicker from "../components/FormPicker";
import axios from "axios";
import router from "../router";
export default defineComponent({
  name: 'AssuranceList',
  components: {
    FormPicker,
    Container,
  },
  setup() {
    const msgErrors =ref([]);
    const reverseDate =  (d) => {
      if(d.match('-')){
        d = d.split('-');
        return d[2] + '/' + d[1] + '/' + d[0]
      }
      if(d.match('/')) {
        d = d.split('/');
        return d[2] + '-' + d[1] + '-' + d[0]
      }
      else {
        return d;
      }
    };

    const addLocation = (datas) => {
      if(datas.DateDebut){
        datas.DateDebut = reverseDate(datas.DateDebut)
      }if(datas.DateFin){
        datas.DateFin = reverseDate(datas.DateFin)
      }
      axios.post('https://gestion-flotte.project-soldrix.fr/api/location/create', datas, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        localStorage.setItem('message', 'La location à été enregistrer avec succès.')
        router.replace('/agences')
      }).catch(error=>{
        if(error.response.data.message){
          localStorage.clear();
          router.replace('/login');
        }
        msgErrors.value = error.response.data.error;
        document.querySelectorAll('.form-control').forEach(function (elm) {
          elm.classList.value = 'form-control';
        })
        for (let i = 0; i < Object.keys(msgErrors.value).length; i++) {
          document.getElementById(Object.keys(msgErrors.value)[i]).classList.value = 'form-control is-invalid';
        }
      })
    }

    const returnView = () =>{
      router.replace('/agence/voitures')
    };

    return {addLocation,returnView,msgErrors}
  }
});
</script>

