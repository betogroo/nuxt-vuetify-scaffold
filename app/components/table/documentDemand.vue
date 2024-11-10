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
  const { push } = useRouter()

  interface Props {
    title: string
    columns: TableColumn[]
    rows: DocumentDemandRow[]
    //rows: Array<Record<string, unknown>>
  }
  /* const handleModal = () => {
    console.log('open modal')
  } */

  const goToDemand = (id: number) => {
    push(`rg/${id}`)
  }

  const dropdownItems = (row: DocumentDemandRow) => [
    [
      {
        label: 'Detalhes',
        icon: iconOutline.details,
        action: () => goToDemand(row.id),
      },

      {
        label: 'Editar',
        icon: iconOutline.edit,
        action: () => console.log('Edit', row.id),
      },

      {
        label: 'Arquivar',
        icon: iconOutline.archive,
        action: () => console.log('Archive', row.id),
      },

      {
        label: 'Delete',
        icon: iconOutline.trash,
        action: () => console.log('Delete', row.id),
      },
    ],
  ]
</script>

<template>
  <AppCard :title="title">
    <div
      class="d-flex justify-end space-x-2"
      style="gap: 8px"
    >
      <div class="d-flex bg-red-darken-3">aqui vai o dropdown de filtro</div>
      <div class="d-flex bg-blue-darken-2">Aqui vai o dropdown do status</div>
    </div>
    <v-data-table
      :headers="columns"
      :items="rows"
    >
      <template #item.actions="{ item }: { item: DocumentDemandRow }">
        <app-dropdown
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
      </template></v-data-table
    >
  </AppCard>
</template>
