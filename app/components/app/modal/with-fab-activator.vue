<script setup lang="ts">
  interface Props {
    title: string
  }
  defineProps<Props>()

  const $emit = defineEmits<{
    'open-modal': []
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
    >
      <slot />
    </AppModal>
    <AppFab
      :is-active="isActive"
      @handle-click="openModal"
    />
  </div>
</template>
