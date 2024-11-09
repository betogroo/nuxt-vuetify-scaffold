<script setup lang="ts">
  const { notification } = useNotificationStore()
</script>

<template>
  <v-snackbar
    v-model="notification.isActive"
    :color="notification.type"
    location="bottom right"
    :timeout="2000"
  >
    <v-icon>{{
      notification.type === 'success'
        ? iconOutline.checkCircle
        : iconOutline.exclamation
    }}</v-icon>
    {{ notification.message }}</v-snackbar
  >
</template>
