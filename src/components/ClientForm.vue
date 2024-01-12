<template>
  <div class="clientProdform">
    <h2>Cadastro de Clientes</h2>
    <form @submit.prevent="saveClient">
      <div class="form-row">
        <div class="form-group">
          <label for="clientName">Nome do Cliente:</label>
          <input type="text" id="clientName" v-model="client.name" required />
        </div>

        <div class="form-group">
          <label for="clientDocument">Documento:</label>
          <input type="text" id="clientDocument" v-model="client.document" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="clientPhone">Telefone/Celular:</label>
          <input
          placeholder="EX:21999999999"
            type="text"
            id="clientPhone"
            maxlength="11"
            v-model="client.phone"
            :class="{ valid: isValidPhoneNumber, invalid: !isValidPhoneNumber }"
            @keyup="validatePhoneNumber"
            required
          />
          <div class="text-danger mrgnbtn" v-if="!isValidPhoneNumber">
            Número de telefone inválido
          </div>
        </div>

        <div class="form-group">
          <label for="clientEmail">E-mail:</label>
          <input type="email" id="clientEmail" v-model="client.email" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="clientActive">Ativo:</label>
          <select id="clientActive" v-model="client.active" required>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </div>

        <div class="form-group">
          <label for="clientProducts">Produtos Associados:</label>
          <select id="clientProducts" v-model="client.product" required>
            <option v-for="product in availableProducts" :key="product.id" :value="product">
              {{ product.name }}
            </option>
          </select>
        </div>
      </div>

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
      isValidPhoneNumber: true,
    };
  },

  computed: {
    availableProducts() {
      return this.$store.state.products;
    },
  },

  methods: {
    validatePhoneNumber() {
      // Pode ajustar a expressão regular conforme necessário
         const validationRegex = /^[0-9]{8,11}$/;
      if (this.client.phone.match(validationRegex)) {
        this.isValidPhoneNumber = true;
      } else {
        this.isValidPhoneNumber = false;
      }
    },

    saveClient() {
      if (!this.isValidPhoneNumber) {
        // Faça algo aqui se o número de telefone for inválido
        return;
      }

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
      this.isValidPhoneNumber = true; // Reinicia o estado da validação após salvar
    },
  },
});
</script>
