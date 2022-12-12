<template>
  <div class="course">
    <div>
      <h2 v-if="!toggleUpdate">{{ course.name }}</h2>
      <input v-else type="text" v-model="newName">
      <p>Nombre de produits: {{ course.produits.length }}</p>
    </div>
    <div class="actions">
      <router-link :to="'/produits/' + course.id">Produits</router-link>
      <button class="update" @click="updateCourse(course.id)">Modifier</button>
      <button class="delete" @click="deleteCourse(course.id)">Supprimer</button>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "CourseItem",
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
    const toggleUpdate = ref(false)
    const newName = ref(props.course.name)

    const updateCourse = (courseId) => {
      if (toggleUpdate.value) {
        emit('updateCourse', {courseId: courseId, newName: newName.value})
        toggleUpdate.value = false
      } else {
        toggleUpdate.value = true
      }
    }

    const deleteCourse = (courseId) => {
      emit('deleteCourse', courseId)
    }

    return {updateCourse, deleteCourse, newName, toggleUpdate}
  }
})
</script>

<style lang="scss" scoped>
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