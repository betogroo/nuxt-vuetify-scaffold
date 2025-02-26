<script setup lang="ts">
  import { VNumberInput } from 'vuetify/labs/VNumberInput'

  definePageMeta({
    showInNavBar: true,
    requiresAuth: false,
    title: 'Labs',
    order: 1,
  })
</script>

<template>
  <AppCard title="VNumberInput">
    <VNumberInput variant="outlined" />
  </AppCard>
</template>
