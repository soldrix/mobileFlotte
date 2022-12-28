<template>
  <div class="course">
    <div>
      <h2 v-if="!toggleUpdate">Ville : {{ agence.ville }}</h2>
      <div v-else class="div-modif">
        <label for="ville">Ville : </label>
        <input id="ville" type="text" v-model="villeAgence">
      </div>
      <h2 v-if="!toggleUpdate">Rue : {{ agence.rue }}</h2>
      <div v-else class="div-modif">
        <label for="rue">Rue : </label>
        <input id="rue" type="text" v-model="rueAgence">
      </div>
      <h2 v-if="!toggleUpdate">Code postal : {{ agence.codePostal }}</h2>
      <div v-else class="div-modif">
        <label for="codepostal">Code postal : </label>
        <input id="codepostal" type="text" v-model="codePostal">
      </div>

    </div>
    <div class="actions">
      <button class="update" @click="updateCourse(agence.id)">Modifier</button>
      <button class="delete" @click="deleteCourse(agence.id)">Supprimer</button>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "CourseItem",
  props: {
    agence: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
    const toggleUpdate = ref(false)
    const villeAgence = ref(props.agence.ville)
    const rueAgence = ref(props.agence.rue)
    const codePostal = ref(props.agence.codePostal)


    const updateCourse = (courseId) => {
      if (toggleUpdate.value) {
        emit('updateCourse', {id: courseId, ville: villeAgence.value,rue:rueAgence.value,codePostal:codePostal.value})
        toggleUpdate.value = false
      } else {
        toggleUpdate.value = true
      }
    }

    const deleteCourse = (courseId) => {
      emit('deleteCourse', courseId)
    }

    return {updateCourse, deleteCourse, villeAgence, toggleUpdate,rueAgence,codePostal}
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