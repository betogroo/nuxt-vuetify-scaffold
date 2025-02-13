:
<script setup lang="ts">
  interface Props {
    items: Record<string, unknown>[] | string[]
    errorMessages?: string | readonly string[] | null | undefined
    label: string
    valueKey?: string
    titleKey?: string
    compositeTitle?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    compositeTitle: false,
    errorMessages: null,
    showId: false,
    valueKey: 'id',
    titleKey: 'name',
  })
  defineEmits<{
    'update:modelValue': []
  }>()

  const modelValue = defineModel<string | number>()

  const formattedItems = computed(() => {
    if (Array.isArray(props.items)) {
      return props.items.map((item) => {
        if (typeof item === 'object' && item !== null) {
          return {
            value: item[props.valueKey] as string | number,
            title: item[props.titleKey] as string,
          }
        } else if (typeof item === 'string') {
          return {
            value: item,
            title: item,
          }
        }
      })
    }
    return []
  })

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
        <template #append>{{ item.raw?.value }}</template>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>
