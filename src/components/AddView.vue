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
    <form @submit.prevent="handleSubmit" class="add-view-wrapper__form">
      <div class="add-view-wrapper__input-wrap">
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
      <div class="add-view-wrapper__button-container">
        <button>Add Employee</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

import MessageView from './MessageView.vue'

const form = reactive({
  id: crypto.randomUUID(),
  name: '',
  address: '',
  designation: '',
})

const message = ref<string>('')
const hasError = ref<boolean>(false)

const handleSubmit = async () => {
  const newForm = {
    id: form.id,
    name: form.name,
    address: form.address,
    designation: form.designation,
  }
  if (newForm.name === '' || newForm.designation === '' || newForm.address === '') {
    hasError.value = true
    message.value = `❕  Enter the fields correctly...`
  } else {
    hasError.value = false
    try {
      const response = await axios.post('/employee.json')
      response.data.employees.push(newForm)
      message.value = `✅ Successfully Added Employee ${newForm.name}...`
    } catch (error) {
      hasError.value = true
      message.value = `❕  Error in adding Employee ${newForm.name}...`
    }
    form.name = ''
    form.address = ''
    form.designation = ''
  }
}

function handleBackButtonClick() {
  message.value = ''
}
</script>

<style scoped lang="scss">
.add-view-wrapper {
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

  &__input-wrap {
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
