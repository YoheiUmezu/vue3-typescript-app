<template>
  <div>New Post</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from './Navbar.vue'

export default defineComponent({
  components: {
    Navbar
  },
  name: 'NewPost'
})
</script>
