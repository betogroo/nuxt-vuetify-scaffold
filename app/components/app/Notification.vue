<script setup lang="ts">
  const { notification } = useNotificationStore()
</script>

<template>
  <v-snackbar
    v-model="notification.isActive"
    :color="notification.type"
    location="bottom right"
    :timeout="notification.timeout"
  >
    <template #actions
      ><v-btn
        :icon="iconOutline.close"
        @click="notification.isActive = false"
    /></template>
    <v-icon size="x-large">{{
      notification.type === 'success'
        ? iconOutline.checkCircle
        : iconOutline.exclamation
    }}</v-icon>
    {{ notification.message }}</v-snackbar
  >
</template>
