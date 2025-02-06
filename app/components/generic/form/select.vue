:
<script setup lang="ts">
  import type { SelectOption } from '~/types'

  interface Props {
    items: SelectOption[] | string[]
    errorMessages?: string | readonly string[] | null | undefined
    label: string
    compositeTitle?: boolean
  }

  withDefaults(defineProps<Props>(), {
    compositeTitle: false,
    errorMessages: null,
  })

  defineEmits<{
    'update:modelValue': []
  }>()

  const modelValue = defineModel<string | number>()

  const fetchItems = () => {
    console.log('use @update:menu="fetchItems()"')
    // será usado quando a lista de items for muito extensa
    // ainda não foi programado
    /* if (!props.items.length) console.log('update-menu') */
  }
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
    @update:menu="fetchItems()"
  >
    <template
      v-if="compositeTitle"
      #item="{ item, props }"
    >
      <v-list-item
        :subtitle="item.value"
        :title="item.title"
        v-bind="props" /></template
  ></v-select>
</template>
