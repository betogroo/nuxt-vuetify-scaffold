<script setup lang="ts">
  import type { TableColumn, UnitRow } from '~/types'

  interface Props {
    rows: UnitRow[]
  }
  defineProps<Props>()

  const tableColumns: TableColumn[] = [
    {
      key: 'unit_id',
      title: 'Código',
    },
    {
      key: 'name',
      title: 'Compras',
    },
    {
      key: 'name_bec',
      title: 'BEC',
    },
  ]
</script>

<template>
  <v-data-table
    density="compact"
    disable-sort
    :headers="tableColumns"
    hide-default-footer
    :items="rows"
  />
</template>
