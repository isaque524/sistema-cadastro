
<template>
  <div>
    <h2>Cadastro de Clientes</h2>
    <form @submit.prevent="saveClient">
      <label for="clientName">Nome do Cliente:</label>
      <input type="text" id="clientName" v-model="client.name" required />

      <label for="clientDocument">Documento:</label>
      <input
        type="text"
        id="clientDocument"
        v-model="client.document"
        required
      />

      <label for="clientPhone">Telefone:</label>
      <input type="text" id="clientPhone" v-model="client.phone" required />

      <label for="clientEmail">E-mail:</label>
      <input type="email" id="clientEmail" v-model="client.email" required />

      <label for="clientActive">Ativo:</label>
      <select id="clientActive" v-model="client.active" required>
        <option value="Sim">Sim</option>
        <option value="Não">Não</option>
      </select>

       <label for="clientProducts">Produtos Associados:</label>
    <select
      id="clientProducts"
      v-model="client.product" 
      required
    >
      <option
        v-for="product in availableProducts"
        :key="product.id"
        :value="product"
      >
        {{ product.name }}
      </option>
    </select>

      <button type="submit">Salvar</button>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ClientForm",
  data() {
    return {
      client: {
        name: "",
        document: "",
        phone: "",
        email: "",
        active: "",
        product: "",
      },
    };
  },

  computed: {
  availableProducts() {
 
    return this.$store.state.products;
  },
},


  methods: {
    saveClient() {
      const newClient = { ...this.client, id: Date.now() };
      this.$store.commit("addClient", newClient);
      this.client = {
        name: "",
        document: "",
        phone: "",
        email: "",
        active: "",
        product: "",
      };
    },

  },
});
</script>
