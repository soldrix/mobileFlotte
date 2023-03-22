<template>
  <div class="locations my-2">
    <img :src="apiUrl+'/image/'+voiture.image" alt="">
    <h2>Numéro de comandes : <span>{{ location.commandeNumber }}</span></h2>
    <p>Date de debut : {{reverseDate(location.DateDebut)}}</p>
    <p>Date de fin : {{reverseDate(location.DateFin)}}</p>
    <p>Montant de la location : {{location.montant}}€</p>
    <a class="text-primary" @click="goVoiture(location.id_voiture)">Voiture : {{location.marque+' '+location.model}}</a>
  </div>
</template>
<script>
import {defineComponent} from "vue";
import router from "../router";
import {api} from "@/main";
export default defineComponent({
  name:'locationItem',
  props:{
    location:{
      type:Object,
      require:true
    }
  },setup(){
    const apiUrl = api();

    const reverseDate =  (d) => {
      if(d.match('-')){
        d = d.split('-');
        return d[2] + '/' + d[1] + '/' + d[0]
      }else {
        d = d.split('/');
        return d[2] + '-' + d[1] + '-' + d[0]
      }
    };

    const goVoiture = (id)=>{
      localStorage.setItem('voitureId',id)
      router.replace('/voiture/location')
    }
    return {goVoiture,reverseDate,apiUrl}
  }
})
</script>
<style>
.locations {
  padding: 15px;
  background: #232121;
  border-radius: 8px;
}
</style>