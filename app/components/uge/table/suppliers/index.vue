<script setup lang="ts">
  import type { SupplierRow, TableColumn } from '~/types'

  defineProps<Props>()

  interface Props {
    title: string
    rows: SupplierRow[]
    isPending?: boolean
  }

  const tableColumns: TableColumn[] = [
    {
      key: 'name',
      title: 'Descrição',
    },
    {
      key: 'cnpj',
      title: 'CNPJ',
    },
    {
      key: 'representative',
      title: 'Representante',
    },
  ]
</script>

<template>
  <v-data-table
    density="compact"
    :headers="tableColumns"
    :items="rows"
    :loading="isPending"
  >
    <template #item.name="{ item }">
      <LinkProfileChip
        :name="item.name.toString()"
        :to="{ name: 'uge-supplier-id', params: { id: item.id } }"
      />
    </template>
    <template #loading>
      <v-skeleton-loader type="table-heading" />
      <v-skeleton-loader type="table-row@10" />
    </template>
  </v-data-table>
</template>
