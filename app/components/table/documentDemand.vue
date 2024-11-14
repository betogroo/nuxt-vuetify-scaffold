<script setup lang="ts">
  //<script setup lang="ts">
  import type {
    TableColumn,
    DemandStatus,
    DemandSite,
    DemandType,
    DocumentDemandRow,
  } from '~/types'

  defineProps<Props>()

  const { getOptionName } = useHelpers()
  const { dropdownItems } = useDocumentDemand()

  interface Props {
    title: string
    columns: TableColumn[]
    rows: DocumentDemandRow[]
    //rows: Array<Record<string, unknown>>
  }
  /* const handleModal = () => {
    console.log('open modal')
  } */
</script>

<template>
  <AppCard :title="title">
    <div
      class="d-flex justify-end"
      style="gap: 8px"
    >
      <div class="d-flex bg-red-darken-3">aqui vai o dropdown de filtro</div>
      <div class="d-flex bg-blue-darken-2">Aqui vai o dropdown do status</div>
    </div>
    <v-data-table
      density="compact"
      :headers="columns"
      :items="rows"
    >
      <template #item.actions="{ item }: { item: DocumentDemandRow }">
        <AppDropdown
          :activator="{ type: 'icon', value: iconOutline['dots-horizontal'] }"
          :items="dropdownItems(item)"
        />
      </template>
      <template #item.status="{ value }">
        {{ getOptionName(value as DemandStatus, demandStatus) }}
      </template>
      <template #item.site="{ value }">
        {{ getOptionName(value as DemandSite, demandSites) }}
      </template>
      <template #item.type="{ value }">
        {{ getOptionName(value as DemandType, demandTypes) }}
      </template>
    </v-data-table></AppCard
  >
</template>
