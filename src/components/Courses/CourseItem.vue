<template>
  <div class="course">
    <div>
      <h2>{{ course.name }}</h2>
      <p>Nombre de produits: {{ course.produits.lenght }}</p>
    </div>
    <div class="actions">
      <router-link :to="'/produits/' + course.id">Produits</router-link>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "CourseItem",
  props: {
    course: {
      type: Object,
      required: true
    }
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
    margin-top: 20px;
  }
}
</style>