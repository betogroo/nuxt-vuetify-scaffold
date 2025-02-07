:
<script setup lang="ts">
  import type { SelectOption } from '~/types'

  interface Props {
    items: SelectOption[] | string[]
    errorMessages?: string | readonly string[] | null | undefined
    label: string
    compositeTitle?: boolean
    showId?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    compositeTitle: false,
    errorMessages: null,
    showId: false,
  })

  defineEmits<{
    'update:modelValue': []
  }>()

  const modelValue = defineModel<string | number>()

  const formattedItems = computed(() =>
    props.items.map((item) =>
      typeof item === 'string' ? { name: item, value: item } : item,
    ),
  )

  const fetchItems = () => {
    // será usado quando a lista de items for muito extensa
    // ainda não foi programado
    if (!props.items.length) console.log('update-menu')
  }
</script>

<template>
  <v-autocomplete
    v-model="modelValue"
    clearable
    density="compact"
    :error-messages="errorMessages"
    :item-title="showId ? 'value' : 'name'"
    :items="formattedItems"
    :label="label"
    variant="outlined"
    @update:menu="fetchItems()"
  >
    <template
      v-if="compositeTitle"
      #item="{ item, props: itemProps }"
    >
      <v-list-item v-bind="itemProps">
        <template #append>{{ item.raw.name }}</template>
      </v-list-item>
    </template></v-autocomplete
  >
</template>
