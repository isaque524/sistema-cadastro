// store.js (ou store.ts)
import { createStore } from "vuex";
import emitter from "@/eventBus";

interface Product {
  id: number;
  name: string;
  active: string;
}

interface Client {
  id: number;
  name: string;
  document: string;
  phone: string;
  email: string;
  active: string;
  associatedProducts: Product[];
}

interface RootState {
  products: Product[];
  clients: Client[];
}

const store = createStore<RootState>({
  state: {
    products: [],
    clients: [],
  },
  mutations: {
    addProduct(state, product: Product) {
      state.products.push(product);
    },
    toggleProductStatus(state, productId: number) {
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.active = product.active === "Sim" ? "Não" : "Sim";
      }
    },
    addClient(state, client: Client) {
      // Adicionando a propriedade associatedProducts ao cliente
      client.associatedProducts = [];
      state.clients.push(client);
    },
    toggleClientStatus(state, clientId: number) {
      const client = state.clients.find((c) => c.id === clientId);
      if (client) {
        client.active = client.active === "Sim" ? "Não" : "Sim";
      }
    },
    associateProductToClient(
      state,
      { clientId, productId }: { clientId: number; productId: number }
    ) {
      const client = state.clients.find((c) => c.id === clientId);
      const product = state.products.find((p) => p.id === productId);

      if (client && product) {
        // Adicionando o produto aos produtos associados do cliente
        client.associatedProducts.push(product);
      }
    },

    updateClient(state, { clientId, updatedClient }) {
      const clientIndex = state.clients.findIndex((c) => c.id === clientId);

      if (clientIndex !== -1) {
        // Atualize as propriedades individuais do cliente para garantir a reatividade
        state.clients[clientIndex].name = updatedClient.name;
        state.clients[clientIndex].document = updatedClient.document;
        state.clients[clientIndex].phone = updatedClient.phone;
        state.clients[clientIndex].email = updatedClient.email;

        // Emita um evento diretamente nos componentes ClientForm e ClientList
        emitter.emit("client-updated", { clientId, updatedClient });
      } else {
        console.log(`Cliente com ID ${clientIndex}.`);
        console.error(
          `Cliente com ID ${clientId} não encontrado para atualização.`
        );
      }
    },

    updateClientInList(state, updatedClient) {
      const clientIndex = state.clients.findIndex(
        (c) => c.id === updatedClient.id
      );

      if (clientIndex !== -1) {
        // Atualize o cliente na lista
        state.clients.splice(clientIndex, 1, updatedClient);
      }
    },

    emitClientUpdated(state, updatedClient) {
      // Emita o evento 'client-updated' com o cliente atualizado
      store.commit("client-updated", updatedClient);
    },
  },
});

export default store;
