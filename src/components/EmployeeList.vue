<template>
  <div class="employee-list-wrap">
    <button><RouterLink to="/add">Add</RouterLink></button>
    <div class="list-wrapper">
      <ul class="employee-list">
        <li v-for="emp in employeesData" class="employee-list__employee">
          <div>{{ emp.name }}</div>
          <div class="employee-list__button-container">
            <button><RouterLink :to="`#${emp.id}`">Edit</RouterLink></button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Employees } from '@/types'
import { RouterLink } from 'vue-router'
import axios from 'axios'

const employeesData = ref<Employees[]>([])

onMounted(async () => {
  try {
    const response = await axios.get('/employee.json')
    console.log(response, 'response')
    employeesData.value = response.data.employees
    console.log(employeesData.value, 'value')
  } catch (error) {
    console.log('Error loading in response', error)
  }
})
</script>

<style lang="scss" scoped>
.employee-list-wrap {
  max-width: 800px;
  margin: 0px auto;

  // &__head {
  //   text-align: center;
  //   color: yellow;
  //   padding: 20px;
  // }

  .employee-list {
    display: flex;
    flex-flow: column;
    gap: 5px;
    padding: 10px 10px;

    &__employee {
      display: flex;
      justify-content: space-between;
      align-items: center;
      list-style-type: none;
      background-color: #a878ad;
      border: 1px solid yellow;
      border-radius: 5px;
      padding: 10px;

      &--green-bg {
        background-color: green;
      }

      button {
        padding: 10px;
      }
    }
    &__button-container {
      display: flex;
      gap: 5px;
    }
  }
}
</style>
