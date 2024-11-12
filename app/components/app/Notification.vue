<script setup lang="ts">
  const { notification } = useNotificationStore()
  const { isActive, message, timeout, type } = toRefs(notification)
  const { checkCircle, exclamation, close } = iconOutline

  const feedbackIcon = computed(() =>
    type.value === 'success' ? checkCircle : exclamation,
  )
</script>

<template>
  <v-snackbar
    v-model="isActive"
    color="white"
    location="bottom right"
    :timeout="timeout"
    :timer="type"
    variant="flat"
  >
    <template #actions
      ><v-btn
        :color="type"
        flat
        :icon="close"
        @click="isActive = false"
    /></template>
    <template #text
      ><div
        class="d-flex align-center"
        :class="`text-${type}`"
      >
        <v-icon
          class="mr-3"
          size="x-large"
          >{{ feedbackIcon }}</v-icon
        >
        <span
          class="text-body-1 font-weight-medium"
          :class="type"
          >{{ message }}</span
        >
      </div>
    </template>
  </v-snackbar>
</template>
