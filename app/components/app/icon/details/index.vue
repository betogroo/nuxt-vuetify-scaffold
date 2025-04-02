<script setup lang="ts">
  import type { To } from '~/types'

  interface Props {
    to: To
    tooltip: string
  }

  withDefaults(defineProps<Props>(), {
    tooltip: '',
  })
</script>

<template>
  <v-tooltip
    location="bottom"
    :text="tooltip || ''"
  >
    <template #activator="{ props }">
      <v-btn
        density="compact"
        :icon="iconOutline.details"
        :ripple="false"
        size="24"
        :to="to"
        v-bind="tooltip ? props : ''"
        variant="text"
      />
    </template>
  </v-tooltip>
</template>
