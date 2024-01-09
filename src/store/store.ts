// store.ts
import { createStore } from "vuex";

interface Product {
  id: number;
  name: string;
  active: string;
}

interface RootState {
  products: Product[];
}

const store = createStore<RootState>({
  state: {
    products: [],
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
  },

});

export default store;
