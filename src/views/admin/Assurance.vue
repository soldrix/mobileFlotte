<template>
  <container title="Liste d'assurance">
    <div class="create">
      <form>
        <input type="text" placeholder="Nom de l'assurance" v-model="assurance.nom">
        <input type="text" placeholder="Date de debut" v-model="assurance.DateDebut">
        <input type="text" placeholder="date de fin" v-model="assurance.DateFin">
        <input type="text" placeholder="Frais" v-model="assurance.frais">
        <ion-list>
          <ion-item>
            <ion-select placeholder="Selectioner une voiture" v-model="assurance.id_voiture">
              <select-voiture v-for="(voiture, index) in voitures" :key="index" :voiture="voiture" />
            </ion-select>
          </ion-item>
        </ion-list>
        <button @click.prevent="addAssurance">Ajouter</button>
      </form>
    </div>

    <div class="courses">
      <AssuranceItem v-for="(assurance, index) in assurances" :key="index" :assurance="assurance"
                   @updateAssurance="updateAssurance" @deleteAssurance="deleteAssurance"/>
    </div>
  </container>
</template>

<script>
import {defineComponent, ref} from 'vue';
import Container from "@/components/Container";
import AssuranceItem from "../../components/admin/AssuranceItem";
import SelectVoiture from "../../components/admin/SelectVoiture";
import axios from "axios";
import {IonItem, IonList, IonSelect, toastController} from '@ionic/vue';

export default defineComponent({
  name: 'AssuranceList',
  components: {
    Container,
    AssuranceItem,
    SelectVoiture,
    IonList,
    IonItem,
    IonSelect
  },
  setup() {
    const assurances = ref([])
    const assurance = ref({})
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
    const getAssurances = () => {
      axios.get('http://localhost:8000/api/assurances', {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        assurances.value = response.data.data
      }).catch(error => {
        if(error.message){
          window.location.href  = "/login";
        }
      })
    }

    getAssurances()

    const addAssurance = () => {
      if(assurance.value.DateDebut){
        assurance.value.DateDebut =reverseDate(assurance.value.DateDebut);
      }
      if(assurance.value.DateFin){
        assurance.value.DateFin =reverseDate(assurance.value.DateFin);
      }
      axios.post('http://localhost:8000/api/assurance/create', assurance.value, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getAssurances()
        assurance.value = {}
      }).catch(error => {
        // TODO Manage error
        presentToast(error)
      })
    }

    const updateAssurance = (data) => {
      axios.post('http://localhost:8000/api/assurance/update/', data, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getAssurances()
      }).catch(error => {
        // TODO Manage error
        presentToast(error)
      })
    }

    const deleteAssurance = (agenceId) => {
      axios.delete('http://localhost:8000/api/assurance/delete/' + agenceId, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getAssurances()
      }).catch(error => {
        // TODO Manage error
        console.log(error)
      })
    }

    return {assurances, assurance, addAssurance, updateAssurance, deleteAssurance,voitures,voiture}
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
