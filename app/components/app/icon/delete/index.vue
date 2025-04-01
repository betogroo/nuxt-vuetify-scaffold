<script setup lang="ts">
  interface Props {
    isPending?: boolean
    tooltip?: string
  }
  withDefaults(defineProps<Props>(), {
    isPending: false,
    tooltip: '',
  })

  const $emit = defineEmits<{
    'open-modal': []
  }>()
</script>

<template>
  <v-tooltip
    location="bottom"
    :text="tooltip || ''"
  >
    <template #activator="{ props }">
      <v-btn
        color="error"
        density="compact"
        :icon="iconOutline.trash"
        :loading="isPending"
        v-bind="tooltip ? props : false"
        :ripple="false"
        size="24"
        variant="text"
        @click="$emit('open-modal')"
      />
    </template>
  </v-tooltip>
</template>
