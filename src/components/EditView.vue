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
    <employee-form
      headerText="Edit Employee"
      buttonText="Edit"
      @submit="handleSubmit"
      v-model:form="form"
      :errorMessage="errorMessage"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import type { Employee, EmployeeData } from '@/types';

import EmployeeForm from './EmployeeForm.vue';
import MessageView from './MessageView.vue';

const form = reactive<Omit<Employee, 'id'>>({
  name: '',
  address: '',
  designation: '',
});

const state = reactive<EmployeeData>({
  job: {
    name: '',
    address: '',
    designation: '',
  },
});

const message = ref<string>('');
const errorMessage = ref<string>('');
const route = useRoute();
const employeeId = route.params.id;

const handleSubmit = () => {
  const updatedForm = {
    name: form.name,
    address: form.address,
    designation: form.designation,
  };
  if (updatedForm.name === '') {
    errorMessage.value = 'Name field must be filled!';
  } else {
    editEmployeeData(updatedForm);
  }
};

function handleBackButtonClick() {
  message.value = '';
}

const editEmployeeData = async (updatedForm: Omit<Employee, 'id'>) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/employees/${employeeId}`,
      updatedForm,
    );
    errorMessage.value = '';
    message.value = `✅ Successfully Edited Employee ${updatedForm.name}...`;
  } catch (error) {
    message.value = `❕  Error in editing Employee ${updatedForm.name}...`;
  }
};

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
};

onMounted(getEmployeeData);
</script>

<style scoped lang="scss">
.edit-view-wrapper {
  max-width: 600px;
  background-color: #44034b;
  border: 2px solid yellow;
  border-radius: 10px;
  padding: 20px 40px;
  margin: 0px auto;
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
