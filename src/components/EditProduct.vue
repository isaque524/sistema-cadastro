<template>
  <div class="clientProdform" >
    <h2>Editar Produto</h2>
    <form @submit.prevent="saveChanges">

      <div class="input-group mb-3">
         <span class="input-group-text" for="productName">Nome do Produto:</span>
  <input type="text" class="form-control" v-model="editedProduct.name" required >
  <button  type="submit" >Salvar Alteração</button>
</div>
    
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
