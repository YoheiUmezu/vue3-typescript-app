<template>
  <section class="section">
    <div class="container">
     <Navbar />
     <router-view />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from './Navbar.vue'

export default defineComponent({
  components: {
    Navbar
  },
  name: 'App'
})
</script>
