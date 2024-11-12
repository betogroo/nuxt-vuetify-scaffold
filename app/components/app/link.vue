<script setup lang="ts">
  interface Props {
    label?: string
    to: string
  }
  defineProps<Props>()
</script>

<template>
  <v-btn
    class="text-none"
    :ripple="false"
    slim
    :to="to"
    variant="plain"
    ><slot>{{ label }}</slot></v-btn
  >
</template>
