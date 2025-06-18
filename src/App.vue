<template>
  <main>
    <employee-list />
  </main>
</template>

<script setup lang="ts">
import EmployeeList from './components/EmployeeList.vue'
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
</style>
