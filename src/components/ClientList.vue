<template>
  <div class="client-prod-list">
    <h2>Listagem de Clientes</h2>

 <div class="table-responsive">
    <table class="table table-bordered">
       <thead class="table-dark">
      <tr>
        <th>Nome</th>
        <th>Documento</th>
        <th>Telefone</th>
        <th>Email</th>
        <th>Produto associado</th>
        <th>Ativo</th>
        <th>Ações</th>
      </tr>
        </thead>
         <tbody>
      <tr v-for="client in clients" :key="client.id">
        <td>{{ client.name }}</td>
        <td>{{ client.document }}</td>
        <td>{{ client.phone }}</td>
        <td>{{ client.email }}</td>
        <td>{{ client.product.name }}</td>
        <td>{{ client.active }} </td>
        <td>
          <div class="btn-group" role="group" aria-label="Ações">
              <button type="button" class="btn btn-dark" @click="editClient(client)">Editar</button>
              <button type="button" class="btn btn-primary" @click="toggleClientStatus(client)">Ativar/Inativar</button>
            </div>
        </td>
      </tr>
         </tbody>
    </table>
 </div>
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
      this.$router.push({ name: 'AssociarClientProduct', params: { clientId: client.id } });
    },
  },
});
</script>

<style scoped>




</style>
