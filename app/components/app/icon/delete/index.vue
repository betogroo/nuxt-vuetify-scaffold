<script setup lang="ts">
  interface Props {
    isPending?: boolean
  }
  withDefaults(defineProps<Props>(), {
    isPending: false,
  })

  const $emit = defineEmits<{
    'open-modal': []
  }>()
</script>

<template>
  <v-btn
    color="error"
    density="compact"
    :icon="iconOutline.trash"
    :loading="isPending"
    :ripple="false"
    size="24"
    variant="text"
    @click="$emit('open-modal')"
  />
</template>
