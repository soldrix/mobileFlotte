<template>
  <div class="course">
    <div>
      <h2 v-if="!toggleUpdate">Type de reparation : {{ reparation.type }}</h2>
      <div v-else class="div-modif">
        <label for="ville">Type de reparation : </label>
        <input id="ville" type="text" :placeholder="reparation.type" v-model="reparations.type">
      </div>
      <h2 v-if="!toggleUpdate">Nom du garage : {{ reparation.nom }}</h2>
      <div v-else class="div-modif">
        <label for="rue">Nom du garage : </label>
        <input id="rue" type="text" :placeholder="reparation.nom" v-model="reparations.nom">
      </div>
      <h2 v-if="!toggleUpdate">Date de la reparation : {{ reverseDate(reparation.date) }}</h2>
      <div v-else class="div-modif">
        <label for="codepostal">Date de la reparation : </label>
        <input id="codepostal" type="text" :placeholder="reverseDate(reparation.date)" v-model="reparations.date">
      </div>
      <h2 v-if="!toggleUpdate">Montant total : {{ reparation.montant }}</h2>
      <div v-else class="div-modif">
        <label for="montant">Montant total : </label>
        <input id="montant" type="text" :placeholder="reparation.montant" v-model="reparations.montant">
      </div>
      <div v-if="!toggleUpdate">
        <h2>Note supplémentaire : </h2>
        <pre>   x{{ reparation.note }}</pre>
      </div>
      <div v-else class="div-modif">
        <label>Note supplémentaire : </label>
        <textarea id="note" :placeholder="reparation.note?? 'Aucune note.'" v-model="reparations.note"></textarea>
      </div>
      <h2 v-if="!toggleUpdate">Immatriculation : {{voitureData.immatriculation ?? 'Aucune voiture'}}</h2>
      <ion-list v-else>
        <ion-item>
          <ion-select :placeholder="voitureData.immatriculation ?? 'Selectioner une voiture'" v-model="reparations.id_voiture">
            <select-voiture v-for="(voiture, index) in voitures" :key="index" :voiture="voiture" />
          </ion-select>
        </ion-item>
      </ion-list>
    </div>
    <div class="actions">
      <button class="update" @click="updateReparation(reparation.id)">Modifier</button>
      <button class="delete" @click="deleteReparation(reparation.id)">Supprimer</button>
    </div>
  </div>
</template>

<script>
import { IonItem, IonList, IonSelect } from '@ionic/vue';
import {defineComponent, ref} from "vue";
import axios from "axios";
import SelectVoiture from "./SelectVoiture";
export default defineComponent({
  name: "ReparationsItem",
  components:{
    SelectVoiture,
    IonItem,
    IonList,
    IonSelect
  },
  props: {
    reparation: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
    const toggleUpdate = ref(false)
    const reparations = ref({
      'id' : props.reparation.id,
    });
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
    if(props.reparation.id_voiture !== null){
      //get immatriculation
      axios.get('http://localhost:8000/api/voiture/'+props.reparation.id_voiture,{
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

    const updateReparation = () => {
      if (toggleUpdate.value) {
        if (reparations.value.date){
          reparations.value.date = reverseDate(reparations.value.date);
        }
        emit('updateReparation', reparations.value)
        toggleUpdate.value = false
      } else {
        toggleUpdate.value = true
      }
    }

    const deleteReparation = (courseId) => {
      emit('deleteReparation', courseId)
    }

    return {updateReparation, deleteReparation, toggleUpdate,voitureData,voitures,voiture,reparations,reverseDate}
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