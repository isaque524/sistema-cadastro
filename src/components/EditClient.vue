<!-- EditClient.vue -->

<template>
  <div>
    <h2>Editar Cliente</h2>
    <form @submit.prevent="saveChanges">
      <label for="clientName">Nome do Cliente:</label>
      <input type="text" id="clientName" v-model="editedClient.name" required>

      <label for="clientDocument">Documento:</label>
      <input type="text" id="clientDocument" v-model="editedClient.document" required>

      <label for="clientPhone">Telefone:</label>
      <input type="text" id="clientPhone" v-model="editedClient.phone" required>

      <label for="clientEmail">E-mail:</label>
      <input type="email" id="clientEmail" v-model="editedClient.email" required>
      <!-- Adicione outros campos do cliente aqui -->
      <button type="submit">Salvar Alterações</button>
    </form>
  </div>
</template>

<script>

export default {
  props: ['clientId'],
  data() {
    return {
      editedClient: {
        name: '',
        document: '',
        phone: '',
        email: '',
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
          const client = this.$store.state.clients.find(c => c.id === clientId);

        if (client) {
          this.editedClient.name = client.name;
          this.editedClient.document = client.document;
          this.editedClient.phone = client.phone;
          this.editedClient.email = client.email;
        } else {
          alert(`Cliente com ID ${this.clientId} não encontrado.`);
        }
      } catch (error) {
    console.error('Erro ao buscar dados do cliente:', error);
  }
    },

async saveChanges() {
  try {
    // Atualize o cliente no store com as alterações
    this.$store.commit('updateClient', {
      clientId: parseInt(this.clientId, 10),
      updatedClient: this.editedClient,
    });
    this.$router.push({ name: 'Home'});
   alert('Alterações salvas com sucesso.');
  } catch (error) {
    console.error('Erro ao salvar as alterações:', error);
    alert("Erro ao salvar as alterações")
  }
},
  },
};
</script>

<style scoped>
  /* Adicione estilos conforme necessário */
</style>
