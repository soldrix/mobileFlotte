<template>
  <container title="Liste de voiture">
    <div class="courses">
      <VoitureItem v-for="(voiture, index) in voitures" :key="index" :voiture="voiture"
                  @voitureLocation="voitureLocation"/>
    </div>
  </container>
</template>

<script>
import {defineComponent, ref} from 'vue';
import Container from "@/components/Container";
import VoitureItem from "../components/Voitureitem";
import axios from "axios";

export default defineComponent({
  name: 'CoursesList',
  components: {
    Container,
    VoitureItem
  },
  setup() {
    const voitures = ref([])
    const voiture = ref({})

    const getVoitures = () => {
      axios.get('http://localhost:8000/api/voitures/agence/'+localStorage.getItem('agenceId'), {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        voitures.value = response.data.voitures
      }).catch(error => {
        if(error.message){
          window.location.href  = "/login";
        }
      })
    }
    getVoitures()

    const voitureLocation = (id) => {
      localStorage.setItem('voitureId',id);
      window.location.href = '/voiture/location';
    }

    return {voitures, voiture,getVoitures, voitureLocation}
  }
});
</script>
<style>
ion-list{
  border-radius: 10px;
  margin: 2px 0;
}
</style>
<style lang="scss" scoped>

.create {
  padding: 15px;
  background: #f3f3f3;
  border-radius: 8px;
  margin-bottom: 20px;
  form {
    display: flex;
    flex-direction: column;
    input{
      margin: 5px 0;
      padding: 10px 10px;
      border-radius: 8px;
      border: 1px solid black;
      background: black;
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
