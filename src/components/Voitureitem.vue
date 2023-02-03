<template>

  <div class="course">
    <div>
      <img :src="'http://localhost:8000/api/image/'+voiture.image" alt="">
      <h2>Marque : {{voiture.marque}}</h2>
      <h2>Model : {{voiture.model}}</h2>
      <h2>Type : {{voiture.type}}</h2>
      <h2 >Puissance : {{voiture.puissance}}</h2>
      <h2>Carburant : {{voiture.carburant}}</h2>
      <h2>Nombre de porte : {{voiture.nbPorte}}</h2>
      <h2>Nombre de place : {{voiture.nbPlace}}</h2>
      <h2>Prix par jour : {{voiture.prix}}€</h2>
    </div>
    <div class="actions">
      <button class="update" @click="voitureLocation(voiture.id)">Continuer</button>
    </div>
  </div>

</template>

<script>
import {defineComponent, ref} from "vue";
export default defineComponent({
  name: "VoitureItem",
  props: {
    voiture: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
    const voitureData = ref({
      'id' : props.voiture.id
    });

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


    return {voitureLocation,voitureData,reverseDate}
  },methods:{


  }
})
</script>

<style lang="scss" scoped>
.div-modif{
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  align-items: center;
}
.course {
  h2 {
    margin: 0;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    a {
      padding: 10px 20px;
      border-radius: 8px;
      color: #000;
      background: lightgray;
      text-decoration: none;
    }

    button {
      padding: 10px 20px;
      border-radius: 8px;
      color: #fff;

      &.update {
        background: #54a5ff;
      }
      &.delete {
        background: #ff6969;
      }
    }
  }
}
</style>