<template>
  <form @submit.prevent="handleSubmit" class="form-wrapper">
    <div class="form-wrapper__heading">{{ text }}</div>
    <div class="form-wrapper__input-wrapper">
      <label for="name">
        Name :
        <input
          v-model="form.name"
          type="text"
          id="name"
          name="name"
          placeholder="Enter your Name"
        />
        <div v-if="hasErrorName" class="form-wrapper__error-message">
          {{ hasErrorName }}
        </div>
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
    <div class="form-wrapper__button-container">
      <button>{{ text }}</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { Employee } from '@/types';

defineProps<{
  text: string;
  form: Omit<Employee, 'id'>;
  hasErrorName?: string;
}>();

const emits = defineEmits<{
  (event: 'submit'): void;
}>();

function handleSubmit() {
  emits('submit');
}
</script>

<style lang="scss">
.form-wrapper {
  display: flex;
  position: relative;
  flex-flow: column;

  &__input-wrapper {
    display: flex;
    flex-flow: column;
    gap: 40px;
    align-items: left;
    justify-content: center;
    padding: 20px 0 40px;

    input:focus {
      outline: none;
    }
  }

  &__button-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    button {
      border: none;
      border-radius: 10px;
      padding: 10px;
      cursor: pointer;
    }
  }

  &__heading {
    display: block;
    font-weight: 600;
    text-align: center;
    padding: 10px;
  }

  &__error-message {
    top: 90px;
    left: 46px;
    width: 100%;
    display: block;
    position: absolute;
    font-size: 15px;
    font-weight: 600;
    padding: 0 10px;
    color: red;
  }
}
</style>
