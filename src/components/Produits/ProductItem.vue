<template>
  <div>
    <h2 v-if="!toggleUpdate">{{ productData.name }}</h2>
    <input v-else type="text" v-model="newName">
    <p>Statut: {{ productData.status == 0 ? "Non acheté" : "Acheté" }}</p>
    <div class="actions">
      <ion-toggle :enable-on-off-labels="true" v-model="productData.status" @ion-change="updateStatus"/>
      <button class="update" @click="updateProduct(productData.id)">Modifier</button>
      <button class="delete" @click="deleteProduct(productData.id)">Supprimer</button>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import {IonToggle} from '@ionic/vue'
import axios from "axios";

export default defineComponent({
  name: "ProductItem",
  components: {
    IonToggle
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props, {emit}) {
    const productData = ref(props.product)
    const toggleUpdate = ref(false)
    const newName = ref(props.product.name)

    const updateStatus = () => {
      axios.put('http://127.0.0.1/api/produit/' + productData.value.id, {
        status: productData.value.status
      }, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {

      }).catch(error => {
        console.log(error)
      })
    }

    const updateProduct = (productId) => {
      if (toggleUpdate.value) {
        emit('updateProduct', {productId: productId, newName: newName.value, status: productData.value.status})
        toggleUpdate.value = false
      } else {
        toggleUpdate.value = true
      }
    }

    const deleteProduct = (productId) => {
      emit('deleteProduct', productId)
    }

    return {productData, updateStatus, deleteProduct, toggleUpdate, newName, updateProduct}
  }
})
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;

  ion-toggle {
    --background: #eb445a;
    --background-checked: #2dd36f;
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
</style>