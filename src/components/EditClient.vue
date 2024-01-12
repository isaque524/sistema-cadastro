<template>
  <div class="clientProdform">
    <h2>Editar Cliente</h2>
    <form @submit.prevent="saveChanges">
      <div class="form-row">
        <div class="form-group">
          <label for="clientName">Nome do Cliente:</label>
          <input
            type="text"
            id="clientName"
            v-model="editedClient.name"
            required
          />
        </div>

        <div class="form-group">
          <label for="clientDocument">Documento:</label>
          <input
            type="text"
            id="clientDocument"
            v-model="editedClient.document"
            required
          />
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
            v-model="editedClient.phone"
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
          <input
            type="email"
            id="clientEmail"
            v-model="editedClient.email"
            required
          />
        </div>
      </div>
      <button type="submit">Salvar Alterações</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["clientId"],
  data() {
    return {
      editedClient: {
        name: "",
        document: "",
        phone: "",
        email: "",
      },
      isValidPhoneNumber: true,
    };
  },
  created() {
    this.fetchClientData();
  },
  methods: {
    async fetchClientData() {
      try {
        const clientId = Number(this.clientId);
        const client = this.$store.state.clients.find((c) => c.id === clientId);

        if (client) {
          this.editedClient.name = client.name;
          this.editedClient.document = client.document;
          this.editedClient.phone = client.phone;
          this.editedClient.email = client.email;
        } else {
          alert(`Cliente não encontrado.`);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do cliente:", error);
      }
    },

    validatePhoneNumber() {
      const validationRegex = /^[0-9]{8,11}$/;
      if (this.editedClient.phone.match(validationRegex)) {
        this.isValidPhoneNumber = true;
      } else {
        this.isValidPhoneNumber = false;
      }
    },

    async saveChanges() {
      try {
        if (!this.isValidPhoneNumber) {
          // Faça algo aqui se o número de telefone for inválido
          return;
        }

        const clientId = parseInt(this.clientId, 10);

        this.$store.commit("updateClient", {
          clientId: clientId,
          updatedClient: this.editedClient,
        });

        this.$router.push({ name: "Cliente" });
        alert("Alterações salvas com sucesso.");
      } catch (error) {
        console.error("Erro ao salvar as alterações:", error);
        alert("Erro ao salvar as alterações");
      }
    },
  },
};
</script>

<style scoped>
/* Adicione estilos conforme necessário */
</style>
