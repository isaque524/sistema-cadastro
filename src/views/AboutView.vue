<template>
  <div class="about">
    <ProductListVue/>
  </div>
</template>

<script>

// @ is an alias to /src
import ProductListVue from '@/components/ProductList.vue'

export default {
  name: 'ListView',
  components: {
    ProductListVue
  }
}
</script>
