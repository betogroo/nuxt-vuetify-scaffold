<script setup lang="ts">
  withDefaults(defineProps<Props>(), {
    isActive: true,
  })

  const $emit = defineEmits<{
    'handle-click': []
  }>()

  const handleClick = () => {
    $emit('handle-click')
  }

  interface Props {
    isActive: boolean
  }
</script>

<template>
  <v-fab
    app
    class="mr-4"
    color="green"
    :disabled="isActive"
    :icon="iconOutline.plus"
    location="right bottom"
    :style="{ zIndex: 1004 }"
    @click="handleClick"
  />
</template>
