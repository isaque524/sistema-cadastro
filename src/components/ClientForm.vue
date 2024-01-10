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

      <button type="submit">Salvar</button>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import emitter from "@/eventBus";

export default defineComponent({
  name: "ClientForm",
  data() {
    return {
      client: {
        name: "",
        document: "",
        phone: "",
        email: "",
        active: "Sim",
      },
    };
  },

  created() {
    emitter.on("client-updated", this.handleClientUpdated);
  },

  beforeUnmount() {
    emitter.off("client-updated", this.handleClientUpdated);
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
        active: "Sim",
      };
    },

    handleClientUpdated(updatedClient) {
      alert("Cliente atualizado:", updatedClient);
    },
    async saveChanges() {
      try {
        const clientId = this.$route.params.clientId;
        this.$store.commit("updateClient", {
          clientId: clientId,
          updatedClient: this.editedClient,
        });

        emitter.emit("client-updated", {
          clientId: clientId,
          updatedClient: this.editedClient,
        });
        alert("Alterações salvas com sucesso.");
      } catch (error) {
        console.error("Erro ao salvar as alterações:", error);
        alert("Erro ao salvar as alterações:");
      }
    },
  },
});
</script>
