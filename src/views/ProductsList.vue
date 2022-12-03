<template>
  <container title="Produits">
    <div class="create">
      <form>
        <input type="text" placeholder="Nom du produit" v-model="product.name">
        <button @click.prevent="addProduct">Ajouter</button>
      </form>
    </div>

    <lazy-load v-if="loading"></lazy-load>
    <div v-else>
      <div v-if="products.length > 0">
        <product-item v-for="(product, index) in products" :key="index" :product="product" @deleteProduct="deleteProduct"/>
      </div>
      <p v-else>Aucun produits</p>
    </div>
  </container>
</template>

<script>
import {defineComponent, ref} from "vue";
import {useRoute} from "vue-router"
import Container from "@/components/Container";
import ProductItem from "@/components/Produits/ProductItem";
import LazyLoad from "@/components/LazyLoad";
import axios from "axios";

export default defineComponent({
  name: "ProductsList",
  components: {
    Container,
    ProductItem,
    LazyLoad
  },
  setup() {
    const route = useRoute()
    const products = ref([])
    const product = ref({
      course_id: route.params.courseId
    })
    const loading = ref(true)

    const lazyload = () => {
      setTimeout(() => {
        loading.value = false
      }, 2000)
    }

    const getProducts = () => {
      loading.value = true
      products.value = []
      axios.get('http://127.0.0.1/api/produits/' + route.params.courseId, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        products.value = response.data.produits
        lazyload()
      }).catch(error => {
        // TODO Manage errors
        console.log(error)
      })
    }

    getProducts()

    const addProduct = () => {
      loading.value = true
      axios.post('http://127.0.0.1/api/produit', product.value, {
        headers: {
          "Authorization": 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getProducts()
        product.value.name = ""
      }).catch(error => {
        console.log(error)
      })
    }

    const deleteProduct = (productId) => {
      loading.value = true
      axios.delete('http://127.0.0.1/api/produit/' + productId, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(() => {
        getProducts()
      }).catch(error => {
        console.log(error)
      })
    }

    return {products, product, loading, addProduct, getProducts, deleteProduct}
  }
})
</script>

<style lang="scss" scoped>
p {
  text-align: center;
}

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
</style>