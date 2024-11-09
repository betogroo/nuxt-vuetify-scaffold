<script setup lang="ts">
  interface Props {
    title: string
    subtitle?: string
    ring?: string
    loading?: boolean
  }
  withDefaults(defineProps<Props>(), {
    ring: 'green',
    subtitle: '',
    loading: false,
  })
</script>

<template>
  <v-card variant="outlined">
    <v-card-title class="text-h5">{{ title }}</v-card-title>
    <slot />
  </v-card>
</template>
