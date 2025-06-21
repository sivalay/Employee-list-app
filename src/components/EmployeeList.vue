<template>
  <div class="employee-list-wrapper">
    <div class="list-wrapper">
      <ul class="employee-list">
        <message-view
          v-if="message"
          :text="message"
          :class="'employee-list--error-text'"
          icon="pi pi-times"
          @click="handleBackButtonClick"
        />
        <div>
          <RouterLink to="/add"><button>Add</button></RouterLink>
        </div>
        <li
          v-for="employee in employeesData"
          :key="employee.id"
          class="employee-list__employee"
        >
          <div>{{ employee.name }}</div>
          <div class="employee-list__button-container">
            <RouterLink :to="'/edit/' + employee.id"
              ><button>Edit</button></RouterLink
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";

import type { Employee } from "@/types";

import MessageView from "./MessageView.vue";

const employeesData = ref<Employee[]>([]);
const message = ref<string>("");

function handleBackButtonClick() {
  message.value = "";
}

const getEmployeeList = async () => {
  try {
    const response = await axios.get("http://localhost:3000/employees");
    employeesData.value = response.data;
  } catch (error) {
    message.value = "❕  Error loading in response";
  }
};

onMounted(getEmployeeList);
</script>

<style lang="scss" scoped>
.employee-list-wrapper {
  max-width: 800px;
  margin: 0px auto;

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
    }

    &--error-text {
      background-color: rgb(250, 100, 100);
    }
  }

  button {
    padding: 10px;
    cursor: pointer;
  }
}
</style>
