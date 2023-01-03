<template>

    <div class="course">
      <div>
        <img v-if="!toggleUpdate" :src="'http://localhost:8000/api/image/'+voiture.image" alt="">
        <div v-else class="div-modif">
          <label for="file">Image : </label>
          <input id="file" type="file" @change="getFile">
        </div>
        <h2 v-if="!toggleUpdate">Marque : {{voiture.marque}}</h2>
        <div v-else class="div-modif">
          <label for="marque">Marque : </label>
          <input id="marque" type="text" :placeholder="voiture.marque" v-model="voitureData.marque">
        </div>
        <h2 v-if="!toggleUpdate">Model : {{voiture.model}}</h2>
        <div v-else class="div-modif">
          <label for="model">Model : </label>
          <input type="text" id="model" :placeholder="voiture.model" v-model="voitureData.model">
        </div>
        <h2 v-if="!toggleUpdate">Type : {{voiture.type}}</h2>
        <div v-else class="div-modif">
          <label for="type">Type de Voiture : </label>
          <input type="text" id="type" :placeholder="voiture.type" v-model="voitureData.type">
        </div>
        <h2 v-if="!toggleUpdate">{{(voiture.statut === 1) ? 'Disponible' : 'Indisponible'}}</h2>
        <div v-else>
          <label for="statut">Statut ({{(voiture.statut === 1) ? 'Disponible' : 'Indisponible'}}) : </label>
          <input id="statut" type="checkbox" :checked="(voiture.statut === 1) ? 1 : 0" v-model="voitureData.statut">
        </div>
        <h2 v-if="!toggleUpdate" >Puissance : {{voiture.puissance}}</h2>
        <div v-else class="div-modif">
          <label for="puissance">Puissance :</label>
          <input id="puissance" type="number" :placeholder="voiture.puissance" v-model="voitureData.puissance">
        </div>
        <h2 v-if="!toggleUpdate">Date de circulation : {{reverseDate(voiture.circulation)}}</h2>
        <div v-else class="div-modif">
          <label for="circulation">Date de circulation : </label>
          <input id="circulation" type="text" :placeholder="reverseDate(voiture.circulation)" v-model="voitureData.circulation">
        </div>
        <h2 v-if="!toggleUpdate">Carburant : {{voiture.carburant}}</h2>
        <div v-else class="div-modif">
          <label for="carburant">Carburant : </label>
          <input id="carburant" type="text" :placeholder="voiture.carburant" v-model="voitureData.carburant">
        </div>
        <h2 v-if="!toggleUpdate">Nombre de porte : {{voiture.nbPorte}}</h2>
        <div v-else class="div-modif">
          <label for="nbPorte">Nombre de porte : </label>
          <input id="nbPorte" type="number" :placeholder="voiture.nbPorte" v-model="voitureData.nbPorte">
        </div>
        <h2 v-if="!toggleUpdate">Nombre de place : {{voiture.nbPlace}}</h2>
        <div v-else class="div-modif">
          <label for="nbPlace">Nombre de place : </label>
          <input id="nbPlace" type="number" :placeholder="voiture.nbPlace" v-model="voitureData.nbPlace">
        </div>
        <h2 v-if="!toggleUpdate">Immatriculation : {{voiture.immatriculation}}</h2>
        <div v-else class="div-modif">
          <label for="immatriculation">Immatriculation : </label>
          <input id="immatriculation" type="text" :placeholder="voiture.immatriculation" v-model="voitureData.immatriculation">
        </div>
        <h2 v-if="!toggleUpdate">Prix par jour : {{voiture.prix}}€</h2>
        <div v-else class="div-modif">
          <label for="prix">Prix par jour : </label>
          <input id="prix" type="number" :placeholder="voiture.prix" v-model="voitureData.prix">
        </div>
        <h2 v-if="!toggleUpdate">Agence : {{(voiture.ville !== undefined) ? voiture.ville +' '+voiture.rue+' '+voiture.codePostal : 'Aucune agence'}}</h2>
        <div v-else class="div-modif">
          <label>Agence : </label>
          <ion-list>
            <ion-item>
              <ion-select :placeholder="(voiture.ville !== undefined) ? voiture.ville +' '+voiture.rue+' '+voiture.codePostal : 'Selectionner une agence'" v-model="voitureData.id_agence">
                <select-agence v-for="(agence, index) in agences" :key="index" :agence="agence" />
              </ion-select>
            </ion-item>
          </ion-list>
        </div>
      </div>
      <div class="actions">
        <button class="update" @click="updateVoiture(voiture.id)">Modifier</button>
        <button class="delete" @click="deleteVoiture(voiture.id)">Supprimer</button>
      </div>
    </div>

</template>

<script>
import {defineComponent, ref} from "vue";
import { IonItem, IonList, IonSelect } from '@ionic/vue';
import SelectAgence from "./SelectAgence";
import axios from "axios";
export default defineComponent({
  name: "VoitureItem",
  components:{
    SelectAgence,
    IonList,
    IonItem,
    IonSelect
  },
  props: {
    voiture: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
    const toggleUpdate = ref(false);
    const voitureData = ref({
      'id' : props.voiture.id
    });
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
    const reverseDate =  (d) => {
        if(d.match('-')){
          d = d.split('-');
          return d[2] + '/' + d[1] + '/' + d[0]
        }else {
          d = d.split('/');
          return d[2] + '-' + d[1] + '-' + d[0]
        }
    };

    const getFile = (event) => {
        voitureData.value.image =event.target.files[0];
    };
    const updateVoiture = (id) => {
      if (toggleUpdate.value) {
        voitureData.value.id = id;
        if (voitureData.value.statut){
          voitureData.value.statut = (voitureData.value.statut === true) ? 1 : 0;
        }
        if(voitureData.value.circulation){
          voitureData.value.circulation = reverseDate(voitureData.value.circulation);
        }
        emit("updateVoiture",voitureData.value)
        voitureData.value = ref({
          'id' : props.voiture.id
        })
        toggleUpdate.value = false
      } else {
        toggleUpdate.value = true
      }
    }

    const deleteVoiture = (courseId) => {
      console.log(courseId)
      emit('deleteVoiture', courseId)
    }

    return {updateVoiture, deleteVoiture, toggleUpdate,getFile,voitureData,reverseDate,agence,agences}
  },methods:{


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