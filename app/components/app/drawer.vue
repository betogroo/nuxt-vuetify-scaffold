<script setup lang="ts">
  const isActive = defineModel<boolean>()
</script>

<template>
  <v-navigation-drawer
    v-model="isActive"
    :location="$vuetify.display.mobile ? 'bottom' : 'right'"
    temporary
    width="500"
  >
    <slot />
  </v-navigation-drawer>
</template>
