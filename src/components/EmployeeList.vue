<template>
  <div class="employee-list-wrapper">
    <h1 class="employee-list-wrapper__head">Employee List</h1>
    <div class="list-wrapper">
      <ul class="employee-list">
        <li v-for="employee in employeesData" class="employee-list__employee">
          <div>{{ employee.name }}</div>
          <div class="employee-list__button-container">
            <button>Edit</button>
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
import { useToast } from 'vue-toastification'
import axios from 'axios'

const employeesData = ref<Employees[]>([])
const toast = useToast()

const handleEmployeeList = async () => {
  try {
    const response = await axios.get('/employee.json')
    employeesData.value = response.data.employees
  } catch (error) {
    toast.error('Error loading in response')
  }
}

onMounted(handleEmployeeList)
</script>

<style lang="scss" scoped>
.employee-list-wrapper {
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

      button {
        padding: 10px;
        cursor: pointer;
      }
    }
    &__button-container {
      display: flex;
      gap: 5px;
    }
  }
}
</style>
