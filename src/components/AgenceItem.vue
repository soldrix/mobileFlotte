<template>
  <div class="course">
    <div>
      <h2>Ville : {{ agence.ville }}</h2>
      <h2>Rue : {{ agence.rue }}</h2>
      <h2>Code postal : {{ agence.codePostal }}</h2>

    </div>
      <button class="btn btn-primary" @click="VoituresAgence(agence.id)">Continuer</button>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "AgenceItem",
  props: {
    agence: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
      const VoituresAgence = (id) => {
        emit('VoituresAgence',id)
    }
    return {VoituresAgence}
  }
})
</script>
