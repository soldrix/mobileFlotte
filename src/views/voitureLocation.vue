<template>
  <container title="Liste des location">
<!--    <div class="create">-->
<!--      <form>-->
<!--        <input type="text" placeholder="Date de debut" v-model="location.DateDebut">-->
<!--        <input type="text" placeholder="date de fin" v-model="location.DateFin">-->
<!--        <input type="text" placeholder="Montant total" v-model="location.montant">-->
<!--        <button @click.prevent="addLocation">Ajouter</button>-->
<!--      </form>-->
<!--    </div>-->
    <form-picker/>
  </container>
</template>

<script>
import {defineComponent, ref} from 'vue';
import Container from "@/components/Container";
import FormPicker from "../components/FormPicker";
import axios from "axios";
export default defineComponent({
  name: 'AssuranceList',
  components: {
    FormPicker,
    Container,
  },data() {
    return {
      range: {
        start: new Date(2020, 0, 6),
        end: new Date(2020, 0, 23),
      },
      masks: {
        input: 'YYYY-MM-DD h:mm A',
      },
    };
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



    const addLocation = () => {
      if(location.value.DateDebut){
        location.value.DateDebut =reverseDate(location.value.DateDebut);
      }
      if(location.value.DateFin){
        location.value.DateFin =reverseDate(location.value.DateFin);
      }
      axios.post('http://localhost:8000/api/location/create', location.value, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        location.value = {}
      })
    }


    return {locations, location, addLocation,voitures,voiture}
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
