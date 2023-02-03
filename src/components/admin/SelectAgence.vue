<template>
  <ion-select-option :value="id_agence"> {{ville+' '+rue+' '+code_postal}}</ion-select-option>
</template>
<script>
import {  IonSelectOption } from '@ionic/vue';
import {defineComponent, ref} from "vue";
export default defineComponent({
  name: "CourseItem",
  components : {
    IonSelectOption
  },
  props: {
    agence: {
      type: Object,
      required: true
    }
  },
  setup(prop){

    const id_agence = ref(prop.agence.id);
    const ville = ref(prop.agence.ville);
    const rue = ref(prop.agence.rue);
    const code_postal = ref(prop.agence.codePostal);
    return {id_agence,ville,rue,code_postal};
  }
})
</script>
