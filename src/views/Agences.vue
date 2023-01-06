<template>
  <container title="Liste d'agence">
    <div class="create">
      <form>
        <input type="text" placeholder="Ville de l'agence" v-model="agence.ville">
        <input type="text" placeholder="rue de l'agence" v-model="agence.rue">
        <input type="text" placeholder="Code postal de l'agence" v-model="agence.codePostal">
        <button @click.prevent="addAgence">Ajouter</button>
      </form>
    </div>

    <div class="courses">
      <Agence-item v-for="(agence, index) in agences" :key="index" :agence="agence"
                   @updateAgence="updateAgence" @deleteAgence="deleteAgence"/>
    </div>
  </container>
</template>

<script>
import {defineComponent, ref} from 'vue';
import Container from "@/components/Container";
import AgenceItem from "@/components/AgenceItem";
import axios from "axios";
import {toastController} from "@ionic/vue";

export default defineComponent({
  name: 'CoursesList',
  components: {
    Container,
    AgenceItem
  },
  setup() {
    const agences = ref([])
    const agence = ref({})
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
    const getAgences = () => {
      axios.get('http://localhost:8000/api/agences', {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        agences.value = response.data.data
      }).catch(error => {
        if(error.message){
          window.location.href  = "/login";
        }
      })
    }

    getAgences()

    const addAgence = () => {
      axios.post('http://localhost:8000/api/agence/create', agence.value, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getAgences()
        agence.value = {}
      }).catch(error => {
        // TODO Manage error
        presentToast(error)
      })
    }

    const updateAgence = (data) => {
      axios.post('http://localhost:8000/api/agence/update/', data, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getAgences()
      }).catch(error => {
        // TODO Manage error
        presentToast(error)
      })
    }

    const deleteAgence = (agenceId) => {
      axios.delete('http://localhost:8000/api/agence/delete/' + agenceId, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getAgences()
      }).catch(error => {
        // TODO Manage error
        console.log(error)
      })
    }

    return {agences, agence, addAgence, updateAgence, deleteAgence}
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
