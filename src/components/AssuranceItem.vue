<template>
  <div class="course">
    <div>
      <h2 v-if="!toggleUpdate">Nom de l'assurance : {{ assurance.nom }}</h2>
      <div v-else class="div-modif">
        <label for="nom">Nom de l'assurance : </label>
        <input id="nom" type="text" :placeholder="assurance.nom" v-model="assurances.nom">
      </div>
      <h2 v-if="!toggleUpdate">Date de debut : {{reverseDate(assurance.DateDebut) }}</h2>
      <div v-else class="div-modif">
        <label for="DateDebut">Date de debut : </label>
        <input id="DateDebut" type="text" :placeholder="reverseDate(assurance.DateDebut)" v-model="assurances.DateDebut">
      </div>
      <h2 v-if="!toggleUpdate">Date de fin : {{ reverseDate(assurance.DateFin)}}</h2>
      <div v-else class="div-modif">
        <label for="DateFin">Date de fin : </label>
        <input id="DateFin" type="text" :placeholder="reverseDate(assurance.DateFin)" v-model="assurances.DateFin">
      </div>
      <h2 v-if="!toggleUpdate">Frais : {{ assurance.frais }}</h2>
      <div v-else class="div-modif">
        <label for="frais">Frais : </label>
        <input id="frais" type="text" :placeholder="assurance.frais" v-model="assurances.frais">
      </div>
      <h2 v-if="!toggleUpdate">Immatriculation : {{voitureData.immatriculation ?? 'Aucune voiture'}}</h2>
      <ion-list v-else>
        <ion-item>
          <ion-select :placeholder="voitureData.immatriculation ?? 'Selectioner une voiture'" v-model="assurances.id_voiture">
            <select-voiture v-for="(voiture, index) in voitures" :key="index" :voiture="voiture" />
          </ion-select>
        </ion-item>
      </ion-list>
    </div>
    <div class="actions">
      <button class="update" @click="updateAssurance(assurance.id)">Modifier</button>
      <button class="delete" @click="deleteAssurance(assurance.id)">Supprimer</button>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import axios from "axios";
import { IonItem, IonList, IonSelect } from '@ionic/vue';
import SelectVoiture from "./SelectVoiture";
export default defineComponent({
  name: "AssuranceItem",
  components:{
    SelectVoiture,
    IonList,
    IonItem,
    IonSelect
  },
  props: {
    assurance: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
    const toggleUpdate = ref(false)
    const assurances =ref({
      'id' : props.assurance.id
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
    if(props.assurance.id_voiture !== null){
      //get immatriculation
      axios.get('http://localhost:8000/api/voiture/'+props.assurance.id_voiture,{
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

    const updateAssurance = () => {
      if (toggleUpdate.value) {
        if(assurances.value.DateDebut  ){
          assurances.value.DateDebut = reverseDate(assurances.value.DateDebut);
        }
        if(assurances.value.DateFin){
          assurances.value.DateFin = reverseDate(assurances.value.DateFin);
        }
        emit('updateAssurance',assurances.value)
        toggleUpdate.value = false
      } else {
        toggleUpdate.value = true
      }
    }

    const deleteAssurance = (courseId) => {
      emit('deleteAssurance', courseId)
    }

    return {updateAssurance, deleteAssurance, assurances, toggleUpdate,voitures,voiture,voitureData,reverseDate}
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