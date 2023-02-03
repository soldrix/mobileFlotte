<template>
  <container title="Liste des reparations">
    <div class="create">
      <form>
        <input type="text" placeholder="Type de reparation" v-model="reparation.type">
        <input type="text" placeholder="Date ex:(10/12/2000)" v-model="reparation.date">
        <input type="text" placeholder="Nom du garage" v-model="reparation.nom">
        <input type="text" placeholder="Montant total" v-model="reparation.montant">
        <textarea placeholder="Note supplémentaire ..." v-model="reparation.note" cols="30" rows="10"></textarea>
        <ion-list>
          <ion-item>
            <ion-select placeholder="Selectioner une voiture" v-model="reparation.id_voiture">
              <select-voiture v-for="(voiture, index) in voitures" :key="index" :voiture="voiture" />
            </ion-select>
          </ion-item>
        </ion-list>
        <button @click.prevent="addReparation">Ajouter</button>
      </form>
    </div>

    <div class="courses">
      <ReparationItem v-for="(reparation, index) in reparations" :key="index" :reparation="reparation"
                      @updateReparation="updateReparation" @deleteReparation="deleteReparation"/>
    </div>
  </container>
</template>

<script>
import {IonItem, IonList, IonSelect, toastController} from '@ionic/vue';
import {defineComponent, ref} from 'vue';
import Container from "../../components/Container";
import SelectVoiture from "../../components/admin/SelectVoiture";
import axios from "axios";
import ReparationItem from "../../components/admin/ReparationItem";
export default defineComponent({
  name: 'ReparationList',
  components: {
    Container,
    SelectVoiture,
    ReparationItem,
    IonItem,
    IonList,
    IonSelect
  },
  setup() {
    const voitures = ref([])
    const voiture = ref({})
    const reparations = ref([])
    const reparation = ref({})

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
    const getReparations = () => {
      axios.get('http://localhost:8000/api/reparations', {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        reparations.value = response.data
      }).catch(error => {
        if(error.message){
          window.location.href  = "/login";
        }
        console.log(error)
      })
    }

    getVoitures()
    getReparations()

    const addReparation = () => {
      reparation.value.date = reverseDate(reparation.value.date);
      axios.post('http://localhost:8000/api/reparation/create', reparation.value, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getReparations()
        reparation.value = {}
      }).catch(error => {
        // TODO Manage error
        presentToast(error)
      })
    }

    const updateReparation = (data) => {
      axios.post('http://localhost:8000/api/reparation/update/', data, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getReparations()
      }).catch(error => {
        // TODO Manage error
        presentToast(error)
      })
    }

    const deleteReparation = (reparationId) => {
      axios.delete('http://localhost:8000/api/reparation/delete/' + reparationId, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getReparations()
      }).catch(error => {
        // TODO Manage error
        presentToast(error)
      })
    }

    return {reparations, reparation, addReparation, updateReparation, deleteReparation,voiture,voitures}
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
