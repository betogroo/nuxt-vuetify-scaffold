<script setup lang="ts">
  import type { TableColumn, ProductOnDemandRow } from '~/types'

  interface Props {
    productsOnDemand: ProductOnDemandRow[]
    tableHeader: TableColumn[]
  }
  defineProps<Props>()

  const $emit = defineEmits<{
    'add-offer': [id: string]
    'expand-row': [id: string]
  }>()
</script>

<template>
  <v-data-table
    :headers="tableHeader"
    :items="productsOnDemand"
    show-expand
  >
    <template #item.price="{ value }">
      {{ formatCurrency(value, 4) }}
    </template>
    <template #item.total_price="{ value }">
      {{ formatCurrency(value) }}
    </template>

    <template #item.actions="{ item, isExpanded, internalItem, toggleExpand }">
      <div class="d-flex align-center">
        <v-btn
          color="red"
          density="compact"
          :icon="iconOutline.plus"
          variant="text"
          @click="$emit('add-offer', item.id)"
        />
        <v-btn
          :append-icon="
            isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'
          "
          density="compact"
          size="small"
          variant="outlined"
          @click="
            toggleExpand(internalItem),
              $nextTick(() => $emit('expand-row', item.id))
          "
          >Ofertas</v-btn
        >
      </div>
    </template>
    <template #item.offer_total_value> offer total </template>
    <template #item.data-table-expand />
    <template #expanded-row="{ columns }">
      <tr>
        <td
          class="py-2"
          :colspan="columns.length"
        >
          <slot name="offers-table" />
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
