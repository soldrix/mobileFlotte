<template>
  <div class="course">
    <div>
      <h2 v-if="!toggleUpdate">Type d'entretien : {{ entretien.type }}</h2>
      <div v-else class="div-modif">
        <label for="ville">Type d'entretien : </label>
        <input id="ville" type="text" v-model="typeEntretien">
      </div>
      <h2 v-if="!toggleUpdate">Nom du garage : {{ entretien.nom }}</h2>
      <div v-else class="div-modif">
        <label for="rue">Nom du garage : </label>
        <input id="rue" type="text" v-model="nomGarage">
      </div>
      <h2 v-if="!toggleUpdate">Date de l'entretien : {{ entretien.date }}</h2>
      <div v-else class="div-modif">
        <label for="codepostal">Date de l'entretien : </label>
        <input id="codepostal" type="text" v-model="dateEntretien">
      </div>
      <h2 v-if="!toggleUpdate">Montant total : {{ entretien.montant }}</h2>
      <div v-else class="div-modif">
        <label for="montant">Montant total : </label>
        <input id="montant" type="text" v-model="montant">
      </div>
      <pre v-if="!toggleUpdate">Note supplémentaire : <br> {{ entretien.note }}</pre>
      <div v-else class="div-modif">
        <label>Note supplémentaire : </label>
        <textarea id="note" v-model="note"></textarea>
      </div>
      <h2 v-if="!toggleUpdate">Immatriculation : {{voitureData.immatriculation ?? 'Aucune voiture'}}</h2>
      <ion-list v-else>
        <ion-item>
          <ion-select placeholder="Selectioner une voiture" v-model="id_voiture">
            <select-voiture v-for="(voiture, index) in voitures" :key="index" :voiture="voiture" />
          </ion-select>
        </ion-item>
      </ion-list>
    </div>
    <div class="actions">
      <button class="update" @click="updateEntretien(entretien.id)">Modifier</button>
      <button class="delete" @click="deleteEntretien(entretien.id)">Supprimer</button>
    </div>
  </div>
</template>

<script>
import { IonItem, IonList, IonSelect } from '@ionic/vue';
import {defineComponent, ref} from "vue";
import axios from "axios";
import SelectVoiture from "./SelectVoiture";
export default defineComponent({
  name: "EntretiensItem",
  components:{
    SelectVoiture,
    IonItem,
    IonList,
    IonSelect
  },
  props: {
    entretien: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
    const toggleUpdate = ref(false)
    const typeEntretien = ref(props.entretien.type)
    const nomGarage = ref(props.entretien.nom)
    const dateEntretien = ref(props.entretien.date)
    const montant = ref(props.entretien.montant)
    const note = ref(props.entretien.note)
    const id_voiture = ref(props.entretien.id_voiture ?? 'null');
    const voitureData = ref([])
    const voitures = ref([])
    const voiture = ref({})

    if(props.entretien.id_voiture !== null){
      //get immatriculation
      axios.get('http://localhost:8000/api/voiture/'+props.entretien.id_voiture,{
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

    const updateEntretien = (courseId) => {
      if (toggleUpdate.value) {
        emit('updateEntretien', {id: courseId, type: typeEntretien.value,nom:nomGarage.value,date:dateEntretien.value,montant:montant.value,note:note.value,id_voiture:id_voiture.value})
        toggleUpdate.value = false
      } else {
        toggleUpdate.value = true
      }
    }

    const deleteEntretien = (courseId) => {
      emit('deleteEntretien', courseId)
    }

    return {updateEntretien, deleteEntretien, typeEntretien, toggleUpdate,nomGarage,dateEntretien,montant,note,voitureData,id_voiture,voitures,voiture}
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