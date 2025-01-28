<script setup lang="ts">
  import type { ProductRow, TableColumn } from '~/types'

  defineProps<Props>()

  interface Props {
    title: string
    columns: TableColumn[]
    rows: ProductRow[]
    isPending?: boolean
  }
</script>

<template>
  <v-data-table
    density="compact"
    :headers="columns"
    :items="rows"
    :loading="isPending"
  >
    <template #loading>
      <v-skeleton-loader type="table-heading" />
      <v-skeleton-loader type="table-row@10" />
    </template>
  </v-data-table>
</template>
