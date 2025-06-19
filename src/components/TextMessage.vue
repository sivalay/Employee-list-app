<template>
  <div v-if="text" class="message-wrapper">
    <div class="message-wrapper__message" :class="className">
      {{ text }}
    </div>
    <i class="message-wrapper__icon">icon</i>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps<{
  text?: string
  isMessage?: boolean
  className?: String
}>()
</script>

<style scoped lang="scss">
.message-wrapper {
  max-width: 600px;
  display: flex;
  flex-flow: row;
  margin: 20px auto;

  &__icon {
    width: fit-content;
  }
}
</style>
