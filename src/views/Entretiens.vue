<template>
  <container title="Liste d'entretiens">
    <div class="create">
      <form>
        <input type="text" placeholder="Type d'entretien" v-model="entretien.type">
        <input type="date" placeholder="Date de l'entretien" v-model="entretien.date">
        <input type="text" placeholder="Nom du garage" v-model="entretien.nom">
        <input type="text" placeholder="Montant total" v-model="entretien.montant">
        <textarea placeholder="Note supplémentaire ..." v-model="entretien.note" cols="30" rows="10"></textarea>
        <ion-list>
          <ion-item>
            <ion-select placeholder="Selectioner une voiture" v-model="entretien.id_voiture">
              <select-voiture v-for="(voiture, index) in voitures" :key="index" :voiture="voiture" />
            </ion-select>
          </ion-item>
        </ion-list>
        <button @click.prevent="addEntretien">Ajouter</button>
      </form>
    </div>

    <div class="courses">
      <EntretiensItem v-for="(entretien, index) in entretiens" :key="index" :entretien="entretien"
                   @updateEntretien="updateEntretien" @deleteEntretien="deleteEntretien"/>
    </div>
  </container>
</template>

<script>
import {IonItem, IonList, IonSelect, toastController} from '@ionic/vue';
import {defineComponent, ref} from 'vue';
import Container from "../components/Container";
import SelectVoiture from "../components/SelectVoiture";
import EntretiensItem from "../components/EntretiensItem";
import axios from "axios";

export default defineComponent({
  name: 'EntretienList',
  components: {
    Container,
    SelectVoiture,
    EntretiensItem,
    IonItem,
    IonList,
    IonSelect
  },
  setup() {
    const voitures = ref([])
    const voiture = ref({})
    const entretiens = ref([])
    const entretien = ref({})

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
    const getEntretiens = () => {
      axios.get('http://localhost:8000/api/entretiens', {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        entretiens.value = response.data
      }).catch(error => {
        if(error.message){
          window.location.href  = "/login";
        }
        console.log(error)
      })
    }

    getVoitures()
    getEntretiens()

    const addEntretien = () => {
      axios.post('http://localhost:8000/api/entretien/create', entretien.value, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getEntretiens()
        entretien.value = {}
      }).catch(error => {
        // TODO Manage error
        presentToast(error)
      })
    }

    const updateEntretien = (data) => {
      console.log(data)
      axios.post('http://localhost:8000/api/entretien/update/', data, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getEntretiens()
      }).catch(error => {
        // TODO Manage error
        presentToast(error)
      })
    }

    const deleteEntretien = (agenceId) => {
      axios.delete('http://localhost:8000/api/entretien/delete/' + agenceId, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getEntretiens()
      }).catch(error => {
        // TODO Manage error
        presentToast(error)
      })
    }

    return {entretiens, entretien, addEntretien, updateEntretien, deleteEntretien,voiture,voitures}
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
