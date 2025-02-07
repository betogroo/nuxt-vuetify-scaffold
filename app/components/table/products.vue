<script setup lang="ts">
  import type { ProductRow, TableColumn } from '~/types'

  defineProps<Props>()

  interface Props {
    title: string

    rows: ProductRow[]
    isPending?: boolean
  }

  const tableColumns: TableColumn[] = [
    {
      key: 'cat_mat',
      title: 'Cat Mat',
    },
    {
      key: 'name',
      title: 'Descrição',
    },
    {
      key: 'bec_number',
      title: 'BEC',
    },
    {
      key: 'product_class_id',
      title: 'Classe',
    },
    {
      key: 'pdm_number',
      title: 'PDM',
    },
    {
      key: 'expense_category_id',
      title: 'Natureza',
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
    <template #item.cat_mat="{ item }">
      <v-btn
        density="compact"
        flat
        rounded
        slim
        :to="`/uge/products/${item.id}`"
        >{{ `${item.cat_mat.toString().padStart(8, '0')}` }}</v-btn
      >
    </template>
    <template #item.bec_number="{ value }">
      <LinkProfileChip
        :name="value"
        :to="`https://www.bec.sp.gov.br/BEC_Catalogo_ui/CatalogDetalheNovo.aspx?chave=&cod_id=${value}`"
      />
    </template>
    <template #loading>
      <v-skeleton-loader type="table-heading" />
      <v-skeleton-loader type="table-row@10" />
    </template>
  </v-data-table>
</template>
