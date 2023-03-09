<template>
  <div class="col-auto bg-dark py-4 px-5" id="background">

  </div>
  <div class="px-3">
    <h2>{{voiture.marque}} {{voiture.model}} ou similaire | {{voiture.type}}</h2>
    <ul class="d-flex flex-wrap justify-content-around list-unstyled">
      <li>
        <p>{{voiture.nbPorte}} Portes</p>
      </li>
      <li>
        <p>{{voiture.prix}}€ | jour</p>
      </li>
      <li>
        <p id="open-modal">Voir plus ...</p>
      </li>
    </ul>
  </div>
  <DatePicker v-model="range" mode="date" is-range :disabled-dates="dateLocation">
    <template v-slot:="{inputValue, inputEvents}">
      <div class="input-group my-3">
        <span class="input-group-text">@</span>
        <div class="form-floating">
          <input type="text" id="DateDebut" class="form-control" v-model="inputValue.start" v-on="inputEvents.start">
          <label for="DateDebut" class="text-black">Date de début</label>
        </div>
        <div class="form-floating">
          <input type="text" id="DateFin" class="form-control" v-model="inputValue.end" readonly>
          <label for="DateFin" class="text-black">Date de Fin</label>
        </div>
      </div>
      <p class="text-danger text-center">{{(msgErrors.DateDebut === undefined) ? '' : msgErrors.DateDebut[0]}}</p>
      <p class="text-danger text-center">{{(msgErrors.DateFin === undefined) ? '' : msgErrors.DateFin[0]}}</p>


      <button class="btn btn-danger" @click="returnView">Retour</button>
      <button class="btn btn-outline-primary mx-3" @click="addLocation(inputValue.start,inputValue.end)">Louer</button>
    </template>
  </DatePicker>
  <ion-modal ref="modal" trigger="open-modal">
    <ion-header>
      <ion-toolbar>
        <ion-title>Plus d'informations</ion-title>
        <ion-buttons slot="end">
          <ion-button :strong="true" @click="cancel()">X</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ul class="list-unstyled mt-3 px-4">
        <li>
          <p>Marque : {{voiture.marque}}</p>
        </li>
        <li>
          <p>Model : {{voiture.model}}</p>
        </li>
        <li>
          <p>Carburant : {{voiture.carburant}}</p>
        </li>
        <li>
          <p>Type de voiture : {{voiture.type}}</p>
        </li>
        <li>
          <p>Sièges : {{voiture.nbPlace}}</p>
        </li>
        <li>
          <p>Portes : {{voiture.nbPorte}}</p>
        </li>
        <li>
          <p>Puissances : {{voiture.puissance}} ch</p>
        </li>
      </ul>
    </ion-content>
  </ion-modal>
</template>
<script>
import {ref, reactive, defineComponent} from 'vue';
import { DatePicker } from 'v-calendar';
import axios from "axios";
import {IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar} from "@ionic/vue";
import router from "../router";

export default defineComponent({
  name: 'FormPickerItem',
  emits: ["addLocation",'returnView'],
  props:{
    msgErrors:{
      type: Object,
      require:true
    }
  },
  components: {
    DatePicker,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent
  },setup(prop,{emit}){
    const id_voiture = localStorage.getItem('voitureId');
    const date = ref(new Date())
    date.value.setDate(Number(date.value.getDate()))
    const range = reactive({})
    const voiture = ref([])

    const getVoiture = ()=>{
      axios.get('https://gestion-flotte.project-soldrix.fr/api/voiture/'+localStorage.getItem('voitureId'),{
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response =>{
        voiture.value = response.data.voiture;
        let test = document.getElementById('background');
        test.style.backgroundImage ="url('https://gestion-flotte.project-soldrix.fr/api/image/"+response.data.voiture.image+"')";
      }).catch(error=>{
        if(error.response.data.message){
          localStorage.clear();
          router.replace('/login');
        }
      })

    };
    getVoiture()
    const dateLocation = ref([]);
    const location = () =>{
      axios.get('https://gestion-flotte.project-soldrix.fr/api/locations',{
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response =>{
        let allDate = response.data.data;
        let dateArray = [];
        allDate.forEach(datas =>{
          dateArray.push({
            start: datas.DateDebut,
            end: datas.DateFin,
          });
        })
        dateLocation.value = dateArray;
      }).catch(errors =>{
        if(errors.response.data.message){
          localStorage.clear();
          router.replace('/login');
        }
      })
    };
    location()
    const addLocation = (dateD,dateF) =>{
      emit('addLocation',{DateDebut:dateD,DateFin:dateF,id_voiture:id_voiture,prix:voiture.value.prix})
    };
    const returnView = () =>{
      emit('returnView')
    } ;

    return {range,date,dateLocation,addLocation,returnView,voiture};
  },methods:{
    cancel() {
      this.$refs.modal.$el.dismiss(null, 'cancel');
    },
  }
});
</script>
<style scoped>
@import '~v-calendar/dist/style.css';
</style>
<style scoped>
#background{
  min-height: 400px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
