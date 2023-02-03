<template>
  <ion-select-option :value="id_voiture"> {{immatriculation}}</ion-select-option>
</template>
<script>
import {  IonSelectOption } from '@ionic/vue';
import {defineComponent, ref} from "vue";
export default defineComponent({
  name: "SelectVoiture",
  components : {
    IonSelectOption
  },
  props: {
    voiture: {
      type: Object,
      required: true
    }
  },
  setup(prop){
    const id_voiture = ref(prop.voiture.id);
    const  immatriculation = ref(prop.voiture.immatriculation);
    return {id_voiture,immatriculation};
  }
})
</script>
