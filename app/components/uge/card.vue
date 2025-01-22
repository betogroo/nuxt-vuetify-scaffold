<script setup lang="ts">
  interface Props {
    title: string
  }
  defineProps<Props>()
</script>

<template>
  <v-card
    :title
    variant="outlined"
    ><slot />
  </v-card>
</template>
