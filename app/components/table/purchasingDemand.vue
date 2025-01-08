<script setup lang="ts">
  //<script setup lang="ts">
  import type { PurchasingDemand, TableColumn } from '~/types'

  defineProps<Props>()

  //const { getOptionName } = useHelpers()
  //const { dropdownItems } = useDocumentDemand()

  interface Props {
    title: string
    columns: TableColumn[]
    rows: PurchasingDemand[]
  }
</script>

<template>
  <v-data-table
    density="compact"
    :headers="columns"
    :items="rows"
  >
    <template #item.id="{ value }">
      <v-btn
        density="compact"
        flat
        rounded
        slim
        :to="`/uge/demand/${value}`"
        >{{ value }}</v-btn
      >
    </template>
  </v-data-table>
</template>
