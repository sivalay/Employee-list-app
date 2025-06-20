<template>
  <main>
    <header-nav class="head" />
    <router-view />
  </main>
</template>

<script setup lang="ts">
import HeaderNav from './components/HeaderNav.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped>
main {
  min-height: 100vh;
  background-color: #7f5a83;
  background-image: linear-gradient(315deg, #7f5a83 0%, #0d324d 74%);
  background-repeat: no-repeat;
  color: #fff;
  font-size: 18px;
}
.head {
  text-align: center;
  color: yellow;
  padding: 40px 20px 30px;
}
</style>
