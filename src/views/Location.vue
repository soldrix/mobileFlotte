<template>
  <container title="Liste des location">
    <div class="create">
      <form>
        <input type="text" placeholder="Date de debut" v-model="location.DateDebut">
        <input type="text" placeholder="date de fin" v-model="location.DateFin">
        <input type="text" placeholder="Montant total" v-model="location.montant">
        <ion-list>
          <ion-item>
            <ion-select placeholder="Selectioner une voiture" v-model="location.id_voiture">
              <select-voiture v-for="(voiture, index) in voitures" :key="index" :voiture="voiture" />
            </ion-select>
          </ion-item>
        </ion-list>
        <button @click.prevent="addLocation">Ajouter</button>
      </form>
    </div>

    <div class="courses">
      <LocationItem v-for="(location, index) in locations" :key="index" :location="location"
                     @updateLocation="updateLocation" @deleteLocation="deleteLocation"/>
    </div>
  </container>
</template>

<script>
import {defineComponent, ref} from 'vue';
import Container from "@/components/Container";
import LocationItem from "../components/LocationItem";
import SelectVoiture from "../components/SelectVoiture";
import axios from "axios";
import {IonItem, IonList, IonSelect, toastController} from '@ionic/vue';

export default defineComponent({
  name: 'AssuranceList',
  components: {
    Container,
    LocationItem,
    SelectVoiture,
    IonList,
    IonItem,
    IonSelect
  },
  setup() {
    const locations = ref([])
    const location = ref({})
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

    const getVoitures = () => {
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
    }
    getVoitures()
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
    const getLocations = () => {
      axios.get('http://localhost:8000/api/locations', {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        locations.value = response.data.data
      }).catch(error => {
        if(error.message){
          window.location.href  = "/login";
        }
      })
    }

    getLocations()

    const addLocation = () => {
      location.value.DateDebut =reverseDate(location.value.DateDebut);
      location.value.DateFin =reverseDate(location.value.DateFin);
      axios.post('http://localhost:8000/api/location/create', location.value, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getLocations()
        location.value = {}
      }).catch(error => {
        // TODO Manage error
        presentToast(error)
      })
    }

    const updateLocation = (data) => {
      axios.post('http://localhost:8000/api/location/update/', data, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getLocations()
      }).catch(error => {
        // TODO Manage error
        presentToast(error)
      })
    }

    const deleteLocation = (locationId) => {
      axios.delete('http://localhost:8000/api/location/delete/' + locationId, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getLocations()
      }).catch(error => {
        // TODO Manage error
        console.log(error)
      })
    }

    return {locations, location, addLocation, updateLocation, deleteLocation,voitures,voiture}
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
