<template>
  <container title="Liste des location">
    <form-picker @addLocation="addLocation"/>
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
    const locations = ref([])
    const location = ref({})
    const voitures = ref([])
    const voiture = ref({})
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
    const getVoitures = () => {
      axios.get('http://localhost:8000/api/voitures', {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        voitures.value = response.data
      }).catch(error => {
        if(error.message){
          window.location.href  = "/login";
        }
        console.log(error)
      })
    }
    getVoitures()



    const addLocation = (datas) => {
      if(datas.DateDebut){
        location.value.DateDebut =reverseDate(datas.DateDebut);
      }
      if(datas.DateFin){
        location.value.DateFin =reverseDate(datas.DateFin);
      }
      if(datas.montant){
        location.value.montant = datas.montant;
      }
      if(datas.id_voiture){
        location.value.id_voiture = datas.id_voiture;
      }
      axios.post('http://localhost:8000/api/location/create', location.value, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        location.value = {}
        localStorage.setItem('message', 'La location à été enregistrer avec succès.')
        router.push('/agences')
      })
    }


    return {locations, location, addLocation,voitures,voiture}
  }
});
</script>

<style lang="scss" scoped>
.create {
  padding: 15px;
  background: #f3f3f3;
  border-radius: 8px;
  margin-bottom: 20px;

  form {
    display: flex;
    flex-direction: column;

    input {
      padding: 10px 10px;
      border-radius: 8px;
      margin: 2.5px 0;
      border: 1px solid black;
    }

    button {
      padding: 10px 20px;
      background: #b3b3ff;
      border-radius: 8px;
      margin-top: 10px;
    }
  }
}

.courses {
  padding: 15px;
  background: #232121;
  border-radius: 8px;

  & > div:not(& > div:last-child) {
    border-bottom: 1px solid #d5d5d5;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
}
</style>
