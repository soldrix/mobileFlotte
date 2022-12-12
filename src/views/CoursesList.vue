<template>
  <container title="Liste de courses">
    <div class="create">
      <form>
        <input type="text" placeholder="Nom de la liste" v-model="course.name">
        <button @click.prevent="addCourse">Ajouter</button>
      </form>
    </div>

    <div class="courses">
      <course-item v-for="(course, index) in courses" :key="index" :course="course"
                   @updateCourse="updateCourse" @deleteCourse="deleteCourse"/>
    </div>
  </container>
</template>

<script>
import {defineComponent, ref} from 'vue';
import Container from "@/components/Container";
import CourseItem from "@/components/Courses/CourseItem";
import axios from "axios";

export default defineComponent({
  name: 'CoursesList',
  components: {
    Container,
    CourseItem
  },
  setup() {
    const courses = ref([])
    const course = ref({})

    const getCourses = () => {
      axios.get('http://127.0.0.1/api/courses', {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        courses.value = response.data.courses
      }).catch(error => {
        console.log(error)
      })
    }

    getCourses()

    const addCourse = () => {
      axios.post('http://127.0.0.1/api/course', course.value, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getCourses()
        course.value = {}
      }).catch(error => {
        // TODO Manage error
        console.log(error)
      })
    }

    const updateCourse = (data) => {
      axios.put('http://127.0.0.1/api/course/' + data.courseId, {name: data.newName}, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getCourses()
      }).catch(error => {
        // TODO Manage error
        console.log(error)
      })
    }

    const deleteCourse = (courseId) => {
      axios.delete('http://127.0.0.1/api/course/' + courseId, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getCourses()
      }).catch(error => {
        // TODO Manage error
        console.log(error)
      })
    }

    return {courses, course, addCourse, updateCourse, deleteCourse}
  }
});
</script>

<style lang="scss" scoped>
.create {
  padding: 15px;
  background: #f3f3f3;
  border-radius: 8px;
  margin-bottom: 20px;

  form {
    display: flex;
    flex-direction: column;

    input {
      padding: 10px 10px;
      border-radius: 8px;
      border: 1px solid black;
    }

    button {
      padding: 10px 20px;
      background: #b3b3ff;
      border-radius: 8px;
      margin-top: 10px;
    }
  }
}

.courses {
  padding: 15px;
  background: #f3f3f3;
  border-radius: 8px;

  & > div:not(& > div:last-child) {
    border-bottom: 1px solid #d5d5d5;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
}
</style>
