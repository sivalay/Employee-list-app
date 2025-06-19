<template>
  <div class="employee-list-wrapper">
    <h1 class="employee-list-wrapper__head">Employee List</h1>
    <div class="list-wrapper">
      <ul class="employee-list">
        <div
          v-if="message"
          class="employee-list__message-wrapper"
          :class="{ 'employee-list--error-text': isMessage }"
        >
          {{ message }}
        </div>
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
import type { Employee } from '@/types'
import axios from 'axios'

const employeesData = ref<Employee[]>([])
const message = ref<string>('')
const isMessage = ref<boolean>(false)

const getEmployeeList = async () => {
  try {
    const response = await axios.get('/employee.json')
    employeesData.value = response.data.employees
    message.value = '✅ Successfully Rendered...'
  } catch (error) {
    isMessage.value = true
    message.value = '❕  Error loading in response'
  }
}

onMounted(getEmployeeList)
</script>

<style lang="scss" scoped>
.employee-list-wrapper {
  max-width: 800px;
  margin: 0px auto;

  &__head {
    text-align: center;
    color: yellow;
    padding: 20px;
  }

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

    &__message-wrapper {
      padding: 10px 10px;
      color: #196397;
      font-weight: 600;
      background-color: green;
      text-align: center;
      border: 2px solid yellow;
      border-radius: 10px;
      margin: 20px 0;
    }

    &--error-text {
      background-color: rgb(250, 100, 100);
    }

    &__button-container {
      display: flex;
      gap: 5px;
    }
  }
}
</style>
