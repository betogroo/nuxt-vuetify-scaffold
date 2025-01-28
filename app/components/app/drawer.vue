<script setup lang="ts">
  const { smAndDown } = useDisplay()
  const isActive = defineModel<boolean>()
</script>

<template>
  <v-navigation-drawer
    v-model="isActive"
    :location="smAndDown ? 'bottom' : 'right'"
    :style="{ zIndex: 1004 }"
    temporary
    width="500"
  >
    <slot />
  </v-navigation-drawer>
</template>
