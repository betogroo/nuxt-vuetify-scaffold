<script setup lang="ts">
  import type { FormActionButton } from '~/types'

  defineProps<Props>()

  interface Props {
    submitButton: FormActionButton
    cancelButton?: FormActionButton
  }
</script>

<template>
  <div class="d-flex justify-space-around">
    <div>
      <v-btn
        color="success"
        :disabled="submitButton.disabled"
        :loading="submitButton.isPending"
        type="submit"
      >
        {{ submitButton.label }}
      </v-btn>
    </div>
    <div>
      <v-btn
        v-if="cancelButton"
        color="error"
        :disabled="cancelButton.disabled"
        :loading="cancelButton.isPending"
        @click="cancelButton.action"
      >
        {{ cancelButton.label }}
      </v-btn>
    </div>
  </div>
</template>
