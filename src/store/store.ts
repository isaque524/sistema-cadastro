import { createStore } from "vuex";

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
      client.associatedProducts = [];
      state.clients.push(client);
    },
    toggleClientStatus(state, clientId: number) {
      const client = state.clients.find((c) => c.id === clientId);
      if (client) {
        client.active = client.active === "Sim" ? "Não" : "Sim";
      }
    },
    associateProductToClient(state, { clientId, productId }) {
      const client = state.clients.find((c) => c.id === clientId);
      const product = state.products.find((p) => p.id === productId);

      if (client && product) {
        if (!client.associatedProducts.some((p) => p.id === productId)) {
          client.associatedProducts.push(product);
        }
      }
    },
    updateClient(state, { clientId, updatedClient }) {
      const clientIndex = state.clients.findIndex((c) => c.id === clientId);

      if (clientIndex !== -1) {
        state.clients[clientIndex].name = updatedClient.name;
        state.clients[clientIndex].document = updatedClient.document;
        state.clients[clientIndex].phone = updatedClient.phone;
        state.clients[clientIndex].email = updatedClient.email;
      } else {
        console.error(
          `Cliente com ID ${clientId} não encontrado para atualização.`
        );
      }
    },

    updateProduct(state, { productId, updatedProduct }) {
      const productIndex = state.products.findIndex((p) => p.id === productId);

      if (productIndex !== -1) {
        state.products[productIndex].name = updatedProduct.name;
      } else {
        console.error(
          `Produto com ID ${productId} não encontrado para atualização.`
        );
      }
    },
  },
});

export default store;
