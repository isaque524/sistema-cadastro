<!-- EditClient.vue -->

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
          <label for="clientPhone">Telefone:</label>
          <input
            type="text"
            id="clientPhone"
            v-model="editedClient.phone"
            required
          />
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

    async saveChanges() {
      try {
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
