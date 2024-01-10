<template>
  <div class="about">
    <ProductFormVue/>
    <ProductListVue/>
  </div>
</template>

<script>

// @ is an alias to /src
import ProductListVue from '@/components/ProductList.vue'
import ProductFormVue from '@/components/ProductForm.vue'


export default {
  name: 'ListView',
  components: {
    ProductListVue,
    ProductFormVue
  }
}
</script>
