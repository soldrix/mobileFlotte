
<template>
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
      <button class="btn btn-outline-primary" @click="addLocation(inputValue.start,inputValue.end)">Louer</button>
    </template>
  </DatePicker>
</template>
<script>
import {ref, reactive, defineComponent} from 'vue';
import { DatePicker } from 'v-calendar';
import axios from "axios";
import router from "../router";

export default defineComponent({
  name: 'App',
  components: {
    DatePicker
  },setup(prop,{emit}){
    const id_voiture = localStorage.getItem('voitureId');
    const date = ref(new Date())
    date.value.setDate(Number(date.value.getDate()))
    const range = reactive({

    })
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
    const dateLocation = ref([]);
    const location = () =>{
      axios.get('http://localhost:8000/api/locations',{
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
        if(errors){
          router.push('/login');
        }
      })
    };
    location()
    const addLocation = (dateD,dateF) =>{
      axios.get('http://localhost:8000/api/voiture/'+id_voiture,{
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response =>{
        var date1 = new Date(reverseDate(dateD));
        var date2 = new Date(reverseDate(dateF));
        // To calculate the time difference of two dates
        var Difference_In_Time = date2.getTime() - date1.getTime();
        var Days = Difference_In_Time / (1000 * 3600 * 24);
        let price = parseInt(response.data.voiture.prix) * parseInt(Days + 1);
        emit('addLocation',{DateDebut:dateD,DateFin:dateF,id_voiture:id_voiture,montant:price})
      })

    };
    return {range,date,dateLocation,addLocation};
  }
});
</script>
<style scoped>
@import '~v-calendar/dist/style.css';
</style>