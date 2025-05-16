<script setup lang="ts">
  interface Props {
    title: string
    subtitle?: string
    loading?: boolean
  }
  const { loading = false, subtitle = '' } = defineProps<Props>()
</script>

<template>
  <v-card
    class="pa-2 ma-2"
    :loading="loading"
    variant="outlined"
  >
    <v-card-title class="text-h6">{{ title }}</v-card-title>
    <v-card-subtitle class="text-h6">{{ subtitle }}</v-card-subtitle>
    <slot />
  </v-card>
</template>
