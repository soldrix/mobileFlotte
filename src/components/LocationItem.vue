<template>
  <div class="course">
    <div>
      <h2 v-if="!toggleUpdate">Date de debut : {{reverseDate(location.DateDebut) }}</h2>
      <div v-else class="div-modif">
        <label for="DateDebut">Date de debut : </label>
        <input id="DateDebut" type="text" :placeholder="reverseDate(location.DateDebut)" v-model="locations.DateDebut">
      </div>
      <h2 v-if="!toggleUpdate">Date de fin : {{ reverseDate(location.DateFin)}}</h2>
      <div v-else class="div-modif">
        <label for="DateFin">Date de fin : </label>
        <input id="DateFin" type="text" :placeholder="reverseDate(location.DateFin)" v-model="locations.DateFin">
      </div>
      <h2 v-if="!toggleUpdate">Montant total : {{ location.montant }}</h2>
      <div v-else class="div-modif">
        <label for="frais">Montant total : </label>
        <input id="frais" type="text" :placeholder="location.montant" v-model="locations.montant">
      </div>
      <h2 v-if="!toggleUpdate">Immatriculation : {{voitureData.immatriculation ?? 'Aucune voiture'}}</h2>
      <ion-list v-else>
        <ion-item>
          <ion-select :placeholder="voitureData.immatriculation ?? 'Selectioner une voiture'" v-model="locations.id_voiture">
            <select-voiture v-for="(voiture, index) in voitures" :key="index" :voiture="voiture" />
          </ion-select>
        </ion-item>
      </ion-list>
    </div>
    <div class="actions">
      <button class="update" @click="updateLocation(location.id)">Modifier</button>
      <button class="delete" @click="deleteLocation(location.id)">Supprimer</button>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import axios from "axios";
import { IonItem, IonList, IonSelect } from '@ionic/vue';
import SelectVoiture from "./SelectVoiture";
export default defineComponent({
  name: "LocationItem",
  components:{
    SelectVoiture,
    IonList,
    IonItem,
    IonSelect
  },
  props: {
    location: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
    const toggleUpdate = ref(false)
    const locations =ref({
      'id' : props.location.id
    })
    const voitureData = ref([])
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
    if(props.location.id_voiture !== null){
      //get immatriculation
      axios.get('http://localhost:8000/api/voiture/'+props.location.id_voiture,{
        headers:{
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      })
          .then(response =>{
            voitureData.value = response.data.voiture;
          })
          .catch(error=>{
            console.log(error)
          })
    }

    //to get all car in the select
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

    const updateLocation = () => {
      if (toggleUpdate.value) {
        if(locations.value.DateDebut){
          locations.value.DateDebut = reverseDate(locations.value.DateDebut);
        }
        if(locations.value.DateFin){
          locations.value.DateFin = reverseDate(locations.value.DateFin);
        }
        emit('updateLocation',locations.value)
        toggleUpdate.value = false
      } else {
        toggleUpdate.value = true
      }
    }

    const deleteLocation = (locationId) => {
      emit('deleteLocation', locationId)
    }

    return {updateLocation, deleteLocation, locations, toggleUpdate,voitures,voiture,voitureData,reverseDate}
  }
})
</script>

<style lang="scss" scoped>
.div-modif{
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  align-items: center;
}
.course {
  h2 {
    margin: 0;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    a {
      padding: 10px 20px;
      border-radius: 8px;
      color: #000;
      background: lightgray;
      text-decoration: none;
    }

    button {
      padding: 10px 20px;
      border-radius: 8px;
      color: #fff;

      &.update {
        background: #54a5ff;
      }
      &.delete {
        background: #ff6969;
      }
    }
  }
}
</style>