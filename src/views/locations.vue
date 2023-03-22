<template>
  <container title="Mes locations">
      <location-item v-for="(location,index) in locations" :key="index" :location="location" />
  </container>
</template>
<script>
import {defineComponent, ref} from "vue";
import Container from "../components/Container";
import locationItem from "../components/locationItem";
import axios from "axios";
import router from "../router";
import {api} from "../main";
export default defineComponent({
  name:'locationView',
  components:{
    Container,
    locationItem
  },setup(){
    const apiUrl = api();
    const locations =ref([]);
    const location =ref({});
    const getLocations = ()=>{
      axios.get(apiUrl+'/locations/user/'+localStorage.getItem('id_user'),{
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response =>{
        locations.value =response.data.locations
      }).catch(error=>{
        if(error.response.data.message){
          localStorage.clear();
          router.replace('/login');
        }
      })
    };
    getLocations()
    return {location,locations}
  }
})
</script>
