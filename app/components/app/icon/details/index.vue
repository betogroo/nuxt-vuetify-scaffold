<script setup lang="ts">
  import type { To } from '~/types'

  interface Props {
    to: To
  }
  defineProps<Props>()
</script>

<template>
  <v-btn
    density="compact"
    :icon="iconOutline.details"
    :ripple="false"
    size="24"
    :to="to"
    variant="text"
  />
</template>
