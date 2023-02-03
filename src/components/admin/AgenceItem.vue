<template>
  <div class="course">
    <div>
      <h2 v-if="!toggleUpdate">Ville : {{ agence.ville }}</h2>
      <div v-else class="div-modif">
        <label for="ville">Ville : </label>
        <input id="ville" type="text" :placeholder="agence.ville" v-model="agences.ville">
      </div>
      <h2 v-if="!toggleUpdate">Rue : {{ agence.rue }}</h2>
      <div v-else class="div-modif">
        <label for="rue">Rue : </label>
        <input id="rue" type="text" :placeholder="agence.rue" v-model="agences.rue">
      </div>
      <h2 v-if="!toggleUpdate">Code postal : {{ agence.codePostal }}</h2>
      <div v-else class="div-modif">
        <label for="codepostal">Code postal : </label>
        <input id="codepostal" type="text" :placeholder="agence.codePostal" v-model="agences.codePostal">
      </div>

    </div>
    <div class="actions">
      <button class="update" @click="updateAgence(agence.id)">Modifier</button>
      <button class="delete" @click="deleteAgence(agence.id)">Supprimer</button>
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
    const toggleUpdate = ref(false)
    const agences =ref({
      'id' : props.agence.id
    })

    const updateAgence = () => {
      if (toggleUpdate.value) {
        emit('updateAgence',agences.value)
        toggleUpdate.value = false
      } else {
        toggleUpdate.value = true
      }
    }

    const deleteAgence = (courseId) => {
      emit('deleteAgence', courseId)
    }

    return {updateAgence, deleteAgence, agences, toggleUpdate}
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