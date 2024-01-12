import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/ClientView.vue";
import About from "../views/ProductView.vue";
import EditClient from "../components/EditClient.vue";
import EditProduct from "../components/EditProduct.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Produto",
    component: About,
  },
  {
    path: "/cliente",
    name: "Cliente",
    component: Home,
  },

  {
    path: "/edit-client/:clientId",
    name: "EditClient",
    component: EditClient,
    props: true,
  },

  {
    path: "/edit-product/:productId",
    name: "EditProduct",
    component: EditProduct,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
