<template>
  <div>
    <h2>Listagem de Clientes</h2>

<table>
  <tr>
    <th>Nome</th>
    <th>Documento</th>
    <th>Telefone</th>
    <th>Email</th>
    <th>Produto associado</th>
    <th>Ativo</th>
  </tr>
  <tr v-for="client in clients" :key="client.id" >
    <td>{{ client.name }}</td>
    <td>{{ client.document }}</td>
    <td>{{ client.phone }}</td>
    <td>{{ client.email }}</td>
    <td>{{client.product.name}}</td>
    <td>{{ client.active }} </td>
    <button @click="editClient(client)">Editar</button>
     <button @click="toggleClientStatus(client)">Ativar/Inativar</button>
      <button @click="associateClient(client)">Associar Produto</button>
  </tr>
 
</table>
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
    associateClient() {
      this.$router.push({ name: 'AssociarClientProduct' });
    },
  },
});
</script>

<style scoped>

</style>