<script setup lang="ts">
  interface Props {
    text: string
    to: string
  }
  defineProps<Props>()
</script>

<template>
  <nuxt-link :to="to">{{ text }}</nuxt-link>
</template>
