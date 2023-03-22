<template>
  <container title="Liste d'agences">
    <div class="col-auto d-flex">
      <input type="text" class="form-control" v-model="searchVal">
      <button class="btn btn-outline-primary mx-2" @click="searchagence">Rechercher</button>
      <button class="btn btn-outline-danger mx-2" @click="resetSearch">
        <ion-icon slot="icon-only" :icon="refresh"></ion-icon>
      </button>
    </div>
    <div v-if="agences.length > 0">
        <Agence-item  class="courses mt-3"  v-for="(agence, index) in agences" :key="index" :agence="agence"
                      @VoituresAgence="VoituresAgence"/>
    </div>
    <h2 class="text-center" v-else-if="statusSearch===false">Malheureusement, aucun résultat n'a été trouvé. Veuillez vérifier l'orthographe et réessayer..</h2>
    <p v-else class="text-center mt-5 text-danger">Aucune agences disponible veuillez revenir plus tard.</p>

  </container>
</template>

<script>
import {api} from "../main";
import {defineComponent, ref} from 'vue';
import Container from "../components/Container";
import AgenceItem from "../components/AgenceItem";
import axios from "axios";
import {toastController,IonIcon} from "@ionic/vue";
import router from "../router";
import {refresh} from "ionicons/icons";

export default defineComponent({
  name: 'CoursesList',
  components: {
    Container,
    AgenceItem,
    IonIcon
  },
  data(){
    return {
      refresh
    }
  },
  setup() {
    const apiUrl = api();
    const agences = ref([])
    const agence = ref({})
    const searchVal = ref("");
    const statusSearch = ref(true);
    const getAgences = () => {
      searchVal.value = "";
      axios.get(apiUrl+'/agences', {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        agences.value = response.data.data
      }).catch(error => {
        if(error.response.data.message){
          localStorage.clear();
          router.replace('/login');
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
      router.replace('/agence/voitures');
    }
    const searchagence = ()=>{
      axios.get(apiUrl+"/agences/search/"+searchVal.value,{
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(response=>{
        statusSearch.value = response.data.status;
        agences.value =  (response.data.research.length > 0) ? response.data.research : [];
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
        getAgences();
      }
    };
    return {agences, agence, VoituresAgence, searchagence,searchVal,statusSearch,getAgences,resetSearch}
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
