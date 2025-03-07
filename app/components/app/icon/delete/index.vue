<script setup lang="ts">
  const $emit = defineEmits<{
    'open-modal': []
  }>()
</script>

<template>
  <v-btn
    color="error"
    density="compact"
    :icon="iconOutline.trash"
    size="24"
    variant="text"
    @click="$emit('open-modal')"
  />
</template>
