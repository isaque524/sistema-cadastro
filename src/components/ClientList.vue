<template>
  <div>
    <h2>Listagem de Clientes</h2>
    <ul>
      <li v-for="client in clients" :key="client.id">
        {{ client.name }} - {{ client.document }} - {{ client.phone }} - {{ client.email }} - {{ client.active }}
        <button @click="editClient(client)">Editar</button>
        <button @click="toggleClientStatus(client)">Ativar/Inativar</button>
        <button @click="associateClient(client)">Associar Produto</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ClientList',
  computed: {
    clients() {
      return this.$store.state.clients;
    },
  },
  methods: {
    editClient(client) {
     this.$router.push({ name: 'EditClient', params: { clientId: client.id } });
    },
    toggleClientStatus(client) {
      this.$store.commit('toggleClientStatus', client.id);
    },
    associateClient(client) {
      this.$router.push({ name: 'AssociateClient', params: { clientId: client.id } });
    },
  },
});
</script>

<style scoped>
/* Adicione estilos conforme necessário */
</style>
