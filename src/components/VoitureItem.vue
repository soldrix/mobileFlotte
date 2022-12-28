<template>

    <div class="course">
      <div>
        <img v-if="!toggleUpdate" :src="'http://localhost:8000/api/image/'+voiture.image" alt="">
        <div v-else class="div-modif">
          <label for="file">Image : </label>
          <input id="file" type="file" @change="getFile">
        </div>
        <h2 v-if="!toggleUpdate">{{voiture.marque}}</h2>
        <div v-else class="div-modif">
          <label for="marque">Marque : </label>
          <input id="marque" type="text" v-model="voitureData.marque">
        </div>

      </div>
      <div class="actions">
        <button class="update" @click="updateVoiture(voiture.id)">Modifier</button>
        <button class="delete" @click="deleteVoiture(voiture.id)">Supprimer</button>
      </div>
    </div>

</template>

<script>
import {defineComponent, ref} from "vue";
import axios from "axios";
export default defineComponent({
  name: "VoitureItem",
  props: {
    voiture: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
    const toggleUpdate = ref(false);
    const voitureData = ref(props.voiture);
    const getFile = (event) => {
     voitureData.value.image =event.target.files[0];
    };
    const updateVoiture = (id) => {
      if (toggleUpdate.value) {
        voitureData.value.id = id;
        axios.post('http://localhost:8000/api/voiture/update/', voitureData.value, {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
            "Content-type": 'multipart/form-data'
          }
        }).then(() => {
          window.location.reload();
        }).catch(error => {
          // TODO Manage error
          console.log(error)
        })
        toggleUpdate.value = false
      } else {
        toggleUpdate.value = true
      }
    }

    const deleteVoiture = (courseId) => {
      console.log(courseId)
      emit('deleteVoiture', courseId)
    }

    return {updateVoiture, deleteVoiture, toggleUpdate,getFile,voitureData}
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