<template>
  <div class="home">
    <ProductFormVue/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductFormVue from '@/components/ProductForm.vue'

export default {
  name: 'HomeView',
  components: {
    ProductFormVue
  }
}
</script>
