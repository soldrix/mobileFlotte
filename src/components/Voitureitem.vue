<template>

  <div class="course">
    <div class="col-auto d-flex flex-column justify-content-center">
      <img :src="'https://gestion-flotte.project-soldrix.fr/api/image/'+voiture.image" alt="">
      <h2>Marque : {{voiture.marque}}</h2>
      <h2>Model : {{voiture.model}}</h2>
      <h2>Type : {{voiture.type}}</h2>
      <h2>Nombre de porte : {{voiture.nbPorte}}</h2>
      <h2>Prix par jour : {{voiture.prix}}€</h2>
    </div>
      <button class="btn btn-primary" @click="voitureLocation(voiture.id)">Continuer</button>
  </div>

</template>

<script>
import {defineComponent} from "vue";
export default defineComponent({
  name: "VoitureItem",
  props: {
    voiture: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
    const reverseDate =  (d) => {
      if(d.match('-')){
        d = d.split('-');
        return d[2] + '/' + d[1] + '/' + d[0]
      }else {
        d = d.split('/');
        return d[2] + '-' + d[1] + '-' + d[0]
      }
    };

    const voitureLocation = (id) => {
        emit('voitureLocation', id)
    }


    return {voitureLocation,reverseDate}
  }
})
</script>
