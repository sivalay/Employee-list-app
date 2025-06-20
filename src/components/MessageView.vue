<template>
  <div class="message-wrapper">
    <div class="message-wrapper__message" :class="className">
      {{ text }}
    </div>
    <button @click="handleButtonClick" class="message-wrapper__icon">
      <i v-if="icon" :class="icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text?: string
  icon?: string
  className?: string
}>()

const emits = defineEmits<{
  (event: 'click'): void
}>()

function handleButtonClick() {
  emits('click')
}
</script>

<style scoped lang="scss">
.message-wrapper {
  display: flex;
  position: relative;
  flex-flow: row;
  color: #196397;
  font-weight: 600;
  justify-content: center;
  background-color: green;
  border: 2px solid yellow;
  border-radius: 10px;
  padding: 10px 10px;
  margin: 20px 0;

  &__icon {
    right: 10px;
    top: 4px;
    display: flex;
    position: absolute;
    background: transparent;
    padding: 10px;
    cursor: pointer;
    border: none;

    i {
      color: yellow;
    }
  }
}
</style>
