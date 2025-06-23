<template>
  <div class="home-button">
    <RouterLink to="/"><button>Home</button></RouterLink>
  </div>
  <message-view
    v-if="message"
    :text="message"
    class="message-wrapper"
    :class="{ 'message-wrapper--error-text': hasError }"
    icon="pi pi-times"
    @click="handleBackButtonClick"
  />
  <div class="add-view-wrapper">
    <employee-form
      headerText="Add Employee"
      buttonText="Add"
      @submit="handleSubmit"
      v-model:form="form"
      :errorMessage="errorMessage"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';

import type { Employee } from '@/types';

import EmployeeForm from './EmployeeForm.vue';
import MessageView from './MessageView.vue';

const form = reactive({
  id: crypto.randomUUID(),
  name: '',
  address: '',
  designation: '',
});

const message = ref<string>('');
const errorMessage = ref<string>('');
const hasError = ref<boolean>(false);

const handleSubmit = () => {
  const newForm = {
    id: form.id,
    name: form.name,
    address: form.address,
    designation: form.designation,
  };
  if (newForm.designation === '' || newForm.address === '') {
    hasError.value = true;
    message.value = `❕  Enter the fields correctly...`;
  } else {
    if (newForm.name === '') {
      errorMessage.value = 'Name field must be filled!';
    } else {
      hasError.value = false;
      errorMessage.value = '';
      addEmployeeData(newForm);
      form.name = '';
      form.address = '';
      form.designation = '';
    }
  }
};

const addEmployeeData = async (newForm: Employee) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/employees',
      newForm,
    );
    message.value = `✅ Successfully Added Employee ${newForm.name}...`;
  } catch (error) {
    hasError.value = true;
    message.value = `❕  Error in adding Employee ${newForm.name}...`;
  }
};

function handleBackButtonClick() {
  message.value = '';
}
</script>

<style scoped lang="scss">
.add-view-wrapper {
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
