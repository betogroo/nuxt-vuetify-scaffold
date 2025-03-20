<script setup lang="ts">
  import type { OfferOnProductDemandRow, TableColumn } from '~/types'

  interface Props {
    offers: OfferOnProductDemandRow[] | null
    tableHeader: TableColumn[]
  }
  defineProps<Props>()
</script>

<template>
  <v-data-table
    v-if="offers"
    density="compact"
    disable-sort
    :headers="tableHeader"
    hide-default-footer
    :items="offers"
  />
</template>
