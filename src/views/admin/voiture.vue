<template>
  <container title="Liste de voiture">
    <div class="create">
      <form>
        <input type="text" placeholder="Marque" v-model="voiture.marque">
        <input type="text" placeholder="Model" v-model="voiture.model">
        <input type="text" placeholder="Puissance" v-model="voiture.puissance">
        <ion-list>
          <ion-item>
            <ion-select placeholder="Statut" v-model="voiture.statut">
              <ion-select-option :value="1">Disponible</ion-select-option>
              <ion-select-option :value="0">Indisponible</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
        <input type="file" @change="getFile">
        <input type="text" placeholder="Date de circulation"  v-model="voiture.circulation">
        <input type="text" placeholder="Carburant" v-model="voiture.carburant">
        <input type="text" placeholder="Type de voiture" v-model="voiture.type">
        <input type="text" placeholder="Nombre de porte" v-model="voiture.nbPorte">
        <input type="text" placeholder="Nombre de place" v-model="voiture.nbPlace">
        <input type="text" placeholder="Immatricualtion" v-model="voiture.immatriculation">
        <input type="text" placeholder="Prix" v-model="voiture.prix">
        <ion-list>
          <ion-item>
            <ion-select placeholder="Selectioner une agence" v-model="voiture.id_agence">
              <select-agence v-for="(agence, index) in agences" :key="index" :agence="agence" />
            </ion-select>
          </ion-item>
        </ion-list>
        <button @click.prevent="addVoiture">Ajouter</button>
      </form>
    </div>
    <div class="courses">
      <VoitureItem v-for="(voiture, index) in voitures" :key="index" :voiture="voiture"
                   @updateVoiture="updateVoiture" @deleteVoiture="deleteVoiture"/>
    </div>
  </container>
</template>

<script>
import { IonItem, IonList, IonSelect, IonSelectOption,toastController } from '@ionic/vue';
import {defineComponent, ref} from 'vue';
import Container from "@/components/Container";
import SelectAgence from "@/components/SelectAgence";
import VoitureItem from "../../components/admin/VoitureItem";
import axios from "axios";

export default defineComponent({
  name: 'CoursesList',
  components: {
    Container,
    SelectAgence,
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
    VoitureItem
  },
  setup() {
    const voitures = ref([])
    const voiture = ref({})

    const agences = ref([]);
    const agence = ref({});
    const getAgence = () =>{
      axios.get('http://localhost:8000/api/agences',{
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response=>{
        agences.value = response.data.data
      }).catch(error =>{
        agences.value =error
      })
    }
    getAgence()

    const getFile = (event) => {
      voiture.value.image =  event.target.files[0];
    };



    const getVoitures = async () => {
      const azerty = await axios.get('http://localhost:8000/api/voitures', {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      });
      let test =  azerty.data;
      for (const datas of test) {
         const toto = await axios.get('http://localhost:8000/api/agence/'+datas.id_agence,{
             headers: {
               "Authorization": 'Bearer ' + localStorage.getItem('token')
             }
           });
         if(toto.data.agence !== null){
           datas.ville = toto.data.agence.ville
           datas.rue = toto.data.agence.rue
           datas.codePostal = toto.data.agence.codePostal
         }

      }
      voitures.value = test;
    };

    getVoitures()

    const addVoiture = () => {
      axios.post('http://localhost:8000/api/voiture/create', voiture.value, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token'),
          "Content-type" : "multipart/form-data"
        },
      }).then(() => {
        getVoitures()
        voiture.value = {}
      }).catch(error => {
        // TODO Manage error
        presentToast(error)
      })
    }
    const  presentToast = async (datas) => {
      const  toast = await toastController.create({
        message: JSON.stringify(datas.response.data.error).replaceAll('{', '').replaceAll('}','').replaceAll(','," </br>") ,
        duration: 4500,
        position: 'middle'
      });
      toast.onDidDismiss = () =>{
        toast.del()
      }
      await toast.present();
    };
    const updateVoiture = (data)=>{
      axios.post('http://localhost:8000/api/voiture/update/',
          data, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token'),
          "Content-type": 'multipart/form-data'
        }
      }).then(() => {
        getVoitures()
      }).catch(response => {
        // TODO Manage error
        presentToast(response)
      })
    };


    const deleteVoiture = (agenceId) => {
      axios.delete('http://localhost:8000/api/voiture/delete/' + agenceId, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getVoitures()
      }).catch(error => {
        // TODO Manage error
        presentToast(error)
      })
    }

    return {voitures, voiture, addVoiture,getVoitures, deleteVoiture,agences,agence,getFile,updateVoiture}
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
