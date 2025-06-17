<template>
  <div class="employee-list-wrap">
    <h1 class="employee-list-wrap__head">Employee List App</h1>
    <div class="list-wrapper">
      <ul class="employee-list">
        <li class="employee-list__employee">
          <div>Employee 1</div>
          <a href="#"><button>Edit</button></a>
        </li>
        <li class="employee-list__employee employee-list__employee--green-bg">
          <div>Employee 2</div>
          <a href="#"><button>Edit</button></a>
        </li>
        <li class="employee-list__employee">
          <div>Employee 3</div>
          <a href="#"><button>Edit</button></a>
        </li>
        <li class="employee-list__employee">
          <div>Employee 4</div>
          <a href="#"><button>Edit</button></a>
        </li>
        <li class="employee-list__employee">
          <div>Employee 5</div>
          <a href="#"><button>Edit</button></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// import EmployeeData from '../employee.json'
import { onMounted, ref } from 'vue'
import type { Employees } from '@/types'
import axios from 'axios'

const employeesData = ref<Employees[]>([])
// console.log(EmployeeData.employees, 'Here it is')

onMounted(async () => {
  axios.get('/employee.json').then((response) => {
    console.log(response.headers['content-type']) // should be application/json
    console.log(response.data)
  })
  // try {
  //   // const response = await fetch('../public/employee.json')
  //   const response = await axios.get('/employee.json')
  //   // const data = await response
  //   console.log(response, 'response')
  //   employeesData.value = response.data
  //   console.log(employeesData.value, 'value')
  // } catch (error) {
  //   console.log('Error loading in response', error)
  // }
})
</script>

<style lang="scss" scoped>
.employee-list-wrap {
  max-width: 800px;
  margin: 0px auto;

  &__head {
    text-align: center;
    color: yellow;
  }

  .employee-list {
    display: flex;
    flex-flow: column;
    gap: 5px;
    padding: 10px 10px;

    &__employee {
      display: flex;
      justify-content: space-between;
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
  }
}
</style>
