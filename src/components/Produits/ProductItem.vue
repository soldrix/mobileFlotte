<template>
  <div>
    <h2>{{ productData.name }}</h2>
    <p>Statut: {{ productData.status == 0 ? "Non acheté" : "Acheté" }}</p>
    <ion-toggle :enable-on-off-labels="true" v-model="productData.status" @ion-change="updateStatus"/>
    <button @click="deleteProduct(productData.id)">Supprimer</button>
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

    // TODO Fix deletion
    const deleteProduct = (productId) => {
      emit('deleteProduct', productId)
    }

    return {productData, updateStatus, deleteProduct}
  }
})
</script>

<style lang="scss" scoped>
ion-toggle {
  --background: #eb445a;
  --background-checked: #2dd36f;
}
</style>