<template>
  <div class="home">
    <ClientFormVue/>
    <ClientListVue/>
  </div>
</template>

<script>
import ClientFormVue from '@/components/ClientForm.vue'
import ClientListVue from '@/components/ClientList.vue'



export default {
  name: 'HomeView',
  components: {
    ClientFormVue,
    ClientListVue
  }
}




</script>
