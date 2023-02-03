<template>
  <div class="course">
    <div>
      <h2>Ville : {{ agence.ville }}</h2>
      <h2>Rue : {{ agence.rue }}</h2>
      <h2>Code postal : {{ agence.codePostal }}</h2>

    </div>
    <div class="actions">
      <button class="update" @click="VoituresAgence(agence.id)">Continuer</button>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "AgenceItem",
  props: {
    agence: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
    const agences =ref({
      'id' : props.agence.id
    })

    const VoituresAgence = (id) => {
        emit('VoituresAgence',id)
    }


    return {VoituresAgence, agences}
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