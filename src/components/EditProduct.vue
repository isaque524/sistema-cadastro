<template>
  <div>
    <h2>Editar Produto</h2>
    <form @submit.prevent="saveChanges">
      <label for="productName">Nome do Produto:</label>
      <input type="text" id="productName" v-model="editedProduct.name" required>

      <button type="submit">Salvar Alterações</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['productId'],
  data() {
    return {
      editedProduct: {
        name: '',
      },
    };
  },
  created() {
    this.fetchProductData();
  },
  methods: {
    async fetchProductData() {
      try {
        const productId = Number(this.productId);
        const product = this.$store.state.products.find(p => p.id === productId);

        if (product) {
          this.editedProduct.name = product.name;
        } else {
          alert(`Produto não encontrado.`);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do produto:', error);
      }
    },

    async saveChanges() {
      try {
   
        this.$store.commit('updateProduct', {
          productId: parseInt(this.productId, 10),
          updatedProduct: this.editedProduct,
        });
        this.$router.push({ name: 'Produto' });
        alert('Alterações salvas com sucesso.');
      } catch (error) {
        console.error('Erro ao salvar as alterações:', error);
        alert('Erro ao salvar as alterações');
      }
    },
  },
};
</script>
