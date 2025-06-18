<template>
  <div class="addview-wrap">
    <form @submit.prevent="handleSubmit" action="" class="addview-wrap__form">
      <div class="addview-wrap__input-wrap">
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
      <div class="addview-wrap__button-container">
        <button>Add Employee</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
// import router from '@router'

const form = reactive({
  id: crypto.randomUUID(),
  name: '',
  address: '',
  designation: '',
})

const router = useRouter()

const handleSubmit = async () => {
  console.log(form, 'form')
  const newForm = {
    id: form.id,
    name: form.name,
    address: form.address,
    designation: form.designation,
  }
  try {
    const response = await axios.post('/employee.json', newForm)
    console.log(response, 'response')
    response.data.employees.push(newForm)
    console.log(response.data.employee)
    router.push(`/`)
  } catch (error) {
    console.log('Error loading in response', error)
  }
}
</script>

<style scoped lang="scss">
.addview-wrap {
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
</style>
