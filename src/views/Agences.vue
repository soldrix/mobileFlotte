<template>
  <container title="Liste d'agence">
    <div v-if="agences.length > 0" class="courses">
      <Agence-item  v-for="(agence, index) in agences" :key="index" :agence="agence"
                   @VoituresAgence="VoituresAgence"/>
    </div>
    <p v-else class="text-center mt-5 text-danger">Aucune agences disponible veuillez revenir plus tard.</p>
  </container>
</template>

<script>
import {defineComponent, ref} from 'vue';
import Container from "../components/Container";
import AgenceItem from "../components/AgenceItem";
import axios from "axios";
import {toastController} from "@ionic/vue";

export default defineComponent({
  name: 'CoursesList',
  components: {
    Container,
    AgenceItem
  },
  setup() {
    const agences = ref([])
    const agence = ref({})
    const getAgences = () => {
      axios.get('http://localhost:8000/api/agences', {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        agences.value = response.data.data
      }).catch(error => {
        if(error.message){
          localStorage.removeItem('token')
          window.location.href  = "/login";
        }
      })
    }
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
    if(localStorage.getItem('message') !== null){
      presentToast(localStorage.getItem('message'))
      localStorage.removeItem('message')
    }
    getAgences()

    const VoituresAgence = (id) => {
      localStorage.setItem('agenceId', id);
      window.location.href = '/agence/voitures';
    }

    return {agences, agence, VoituresAgence}
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
