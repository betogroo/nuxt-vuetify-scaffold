<script setup lang="ts">
  interface Props {
    title: string
  }
  defineProps<Props>()

  const $emit = defineEmits<{
    'open-modal': []
    'close-modal': []
  }>()
  const openModal = () => {
    $emit('open-modal')
  }
  const isActive = defineModel<boolean>()
</script>

<template>
  <div>
    <AppModal
      v-model="isActive"
      :title="title"
      @on-close="$emit('close-modal')"
    >
      <slot />
    </AppModal>
    <AppFab
      :is-active="isActive"
      @handle-click="openModal"
    />
  </div>
</template>
