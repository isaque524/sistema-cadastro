<template>
  <div>
    <h2>Cadastro de Produtos</h2>
    <form @submit.prevent="saveProduct">
      <label for="productName">Nome do Produto:</label>
      <input type="text" id="productName" v-model="product.name" required>

      <label for="productActive">Ativo:</label>
      <select id="productActive" v-model="product.active" required>
        <option value="Sim">Sim</option>
        <option value="Não">Não</option>
      </select>

      <button type="submit">Salvar</button>
    </form>
  </div>
</template>

<script>
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'ProductForm',
  data() {
    return {
      product: {
        name: '',
        active: 'Sim',
      },
    };
  },
  methods: {
    saveProduct() {
      const newProduct = { ...this.product, id: Date.now() };
      this.$store.commit('addProduct', newProduct);

      this.product = { name: '', active: 'Sim' };
    },

  
  },
});
</script>

<style scoped>

</style>

