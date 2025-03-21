<script setup lang="ts">
  import type { FormActionButton } from '~/types'

  defineProps<Props>()

  interface Props {
    submitButton: FormActionButton
    cancelButton?: FormActionButton
  }
</script>

<template>
  <div class="d-flex justify-end gap-4">
    <v-btn
      class="me-2"
      color="success"
      :disabled="submitButton.disabled"
      :loading="submitButton.isPending"
      min-width="120"
      type="submit"
    >
      {{ submitButton.label }}
    </v-btn>

    <v-btn
      v-if="cancelButton"
      color="error"
      :disabled="cancelButton.disabled"
      :loading="cancelButton.isPending"
      min-width="120"
      @click="cancelButton.action"
    >
      {{ cancelButton.label }}
    </v-btn>
  </div>
</template>
