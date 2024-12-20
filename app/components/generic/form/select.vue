<script setup lang="ts">
  import type { SelectOption } from '~/types'

  interface Props {
    items: SelectOption[]
    errorMessages?: string | readonly string[] | null | undefined
    label: string
  }

  defineProps<Props>()

  defineEmits<{
    'update:modelValue': []
  }>()

  const modelValue = defineModel<string>()
</script>

<template>
  <v-select
    v-model="modelValue"
    density="compact"
    :error-messages="errorMessages"
    item-title="name"
    :items="items"
    :label="label"
    variant="outlined"
  />
</template>
