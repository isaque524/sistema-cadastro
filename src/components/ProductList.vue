<template>
  <div>
    <h2>Listagem de Produtos</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - {{ product.active }}
        <button @click="editProduct(product)">Editar</button>
        <button @click="toggleProductStatus(product)">Ativar/Inativar</button>
        <button @click="associateProduct(product)">Associar Cliente</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductList',
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  methods: {
    editProduct(product) {
      console.log('Editando produto:', product);
    },
    toggleProductStatus(product) {
      // Lógica para ativar/inativar o produto
      this.$store.commit('toggleProductStatus', product.id);
    },
    associateProduct(product) {
      this.$router.push({ name: 'AssociateProduct', params: { productId: product.id } });
    },
  },
});
</script>

<style scoped>
/* Adicione estilos conforme necessário */
</style>

