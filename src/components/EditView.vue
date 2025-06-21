<template>
  <div class="home-button">
    <RouterLink to="/"><button>Home</button></RouterLink>
  </div>
  <message-view
    v-if="message"
    :text="message"
    class="message-wrapper"
    icon="pi pi-times"
    @click="handleBackButtonClick"
  />
  <div class="edit-view-wrapper">
    <form @submit.prevent="handleSubmit" class="edit-view-wrapper__form">
      <div class="edit-view-wrapper__heading">Edit Employee</div>
      <div class="edit-view-wrapper__input-wrapper">
        <label for="name">
          Name :
          <input
            v-model="form.name"
            type="text"
            id="name"
            name="name"
            placeholder="Enter your Name"
          />
        </label>
        <label for="address">
          Address :
          <input
            v-model="form.address"
            type="text"
            id="address"
            name="address"
            placeholder="Enter your Address"
          />
        </label>
        <label for="designation">
          Designation :
          <input
            v-model="form.designation"
            type="text"
            id="designation"
            name="designation"
            placeholder="Enter Designation"
          />
        </label>
      </div>
      <div class="edit-view-wrapper__button-container">
        <button>Edit Employee</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import type { Employee } from "@/types";

import MessageView from "./MessageView.vue";

const form = reactive<Omit<Employee, "id">>({
  name: "",
  address: "",
  designation: "",
});

const state = reactive<EmployeeData>({
  job: {
    name: "",
    address: "",
    designation: "",
  },
});

type EmployeeData = {
  job: Omit<Employee, "id">;
};

const message = ref<string>("");
const route = useRoute();
const employeeId = route.params.id;

const handleSubmit = async () => {
  const updatedForm = {
    name: form.name,
    address: form.address,
    designation: form.designation,
  };
  try {
    const response = await axios.put(
      `http://localhost:3000/employees/${employeeId}`,
      updatedForm,
    );
    message.value = `✅ Successfully Edited Employee ${updatedForm.name}...`;
  } catch (error) {
    message.value = `❕  Error in editing Employee ${updatedForm.name}...`;
  }
};

function handleBackButtonClick() {
  message.value = "";
}

const getEmployeeData = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/employees/${employeeId}`,
    );
    state.job = response.data;
    form.name = state.job.name;
    form.address = state.job.address;
    form.designation = state.job.designation;
  } catch (error) {
    message.value = `❕  Error in editing Employee...`;
  }
}

onMounted(getEmployeeData);
</script>

<style scoped lang="scss">
.edit-view-wrapper {
  max-width: 600px;
  background-color: #a878ad;
  border: 2px solid yellow;
  border-radius: 10px;
  padding: 20px 40px;
  margin: 0px auto;

  &__form {
    display: flex;
    flex-flow: column;
  }

  &__input-wrapper {
    display: flex;
    flex-flow: column;
    gap: 20px;
    align-items: left;
    justify-content: center;
    padding: 20px 0 40px;
  }

  &__button-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__heading {
    display: block;
    color: #196397;
    font-weight: 600;
    text-align: center;
    padding: 10px;
  }
}

.message-wrapper {
  width: 600px;
  display: block;
  background-color: green;
  border: 2px solid yellow;
  border-radius: 10px;
  padding: 10px 40px;
  margin: 20px auto;
  text-align: center;

  &--error-text {
    background-color: rgb(250, 100, 100);
  }
}

button {
  border: none;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
}

.home-button {
  width: 800px;
  margin: 30px auto;
}
</style>
