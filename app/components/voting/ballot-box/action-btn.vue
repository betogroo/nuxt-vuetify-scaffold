<script setup lang="ts">
  const $emit = defineEmits<{
    click: []
  }>()
</script>

<template>
  <v-btn
    color="success"
    @click="$emit('click')"
    >text</v-btn
  >
</template>
