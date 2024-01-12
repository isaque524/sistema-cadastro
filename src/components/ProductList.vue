<template>
  <div class="product-list">
    <h2>Listagem de Produtos</h2>

    <div class="table-responsive">
      <table class="table table-bordered mx-auto" style="max-width: 600px;">
        <thead class="table-dark">
          <tr>
            <th style="width: 60%;">Nome</th>
            <th style="width: 20%;">Ativo</th>
            <th style="width: 20%;">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.active }}</td>
            <td>
              <div class="btn-group" role="group" aria-label="Ações">
                <button type="button" class="btn btn-dark" @click="editProduct(product)">Editar</button>
                <button type="button" class="btn btn-primary" @click="toggleProductStatus(product)">
                  Ativar/Inativar
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductList",
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  methods: {
    editProduct(product) {
      console.log("Editando produto:", product);
      this.$router.push({
        name: "EditProduct",
        params: { productId: product.id },
      });
    },
    toggleProductStatus(product) {
      this.$store.commit("toggleProductStatus", product.id);
    },
    associateProduct() {
      this.$router.push({ name: "AssociarClientProduct" });
    },
  },
});
</script>




