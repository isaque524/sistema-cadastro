import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import { BootstrapVueIcons } from "bootstrap-vue";

createApp(App).use(router).use(store).mount("#app");

App.use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions);
