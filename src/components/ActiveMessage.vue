<template>
  <div v-if="text" class="message-wrapper">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps<{
  //   className?: string
  text?: string
}>()
</script>

<style scoped lang="scss"></style>
