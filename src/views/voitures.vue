<template>
  <container title="Liste des voitures">
    <div class="col-auto d-flex">
      <input type="text" class="form-control" v-model="searchVal">
      <button class="btn btn-outline-primary mx-2" @click="searchVoiture">Rechercher</button>
      <button class="btn btn-outline-danger mx-2" @click="resetSearch">
        <ion-icon slot="icon-only" :icon="refresh"></ion-icon>
      </button>
    </div>
    <div v-if="voitures.length > 0">
      <VoitureItem class="courses mt-2" v-for="(voiture, index) in voitures" :key="index" :voiture="voiture"
                  @voitureLocation="voitureLocation"/>
    </div>
    <h2 class="text-center" v-else-if="statusSearch===false">Malheureusement, aucun résultat n'a été trouvé. Veuillez vérifier l'orthographe et réessayer.</h2>
    <p v-else class="text-center mt-5 text-danger">Aucune voitures disponible veuillez revenir plus tard.</p>
  </container>
</template>

<script>
import {defineComponent, ref} from 'vue';
import Container from "@/components/Container";
import VoitureItem from "../components/Voitureitem";
import axios from "axios";
import router from "../router";
import {IonIcon} from '@ionic/vue';
import {refresh} from 'ionicons/icons';

export default defineComponent({
  name: 'CoursesList',
  components: {
    Container,
    VoitureItem,
    IonIcon
  },
  data(){
    return {
      refresh
    }
  },
  setup() {
    const voitures = ref([]);
    const voiture = ref({});
    const searchVal = ref('');
    const statusSearch = ref(true);
    const getVoitures = () => {
        axios.get('https://gestion-flotte.project-soldrix.fr/api/voitures/agence/'+localStorage.getItem('agenceId'), {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token')
          }
        }).then(response => {
          voitures.value = response.data.voitures
        }).catch(error => {
          if(error.response.data.message){
            localStorage.clear();
            router.replace('/login');
          }
        })
    }
    getVoitures()

    const voitureLocation = (id) => {
      localStorage.setItem('voitureId',id);
      router.replace('/voiture/location')
    }
    const searchVoiture = ()=>{
      axios.get("https://gestion-flotte.project-soldrix.fr/api/voitures/search/"+searchVal.value,{
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response=>{
        statusSearch.value = response.data.status;
        voitures.value =  (response.data.research.length > 0) ? response.data.research : [];
      })
      .catch(error=>{
        if(error.response.data.message){
          localStorage.clear();
          router.replace('/login');
        }
      })
    };
    const resetSearch = ()=>{
      if(searchVal.value !== ''){
        searchVal.value = "";
        getVoitures();
      }
    };
    return {voitures, voiture,getVoitures, voitureLocation,searchVoiture,statusSearch,searchVal,resetSearch}
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
