<script setup lang="ts">
  import type { PendingState, TableColumn } from '~/types'
  import type { ElectionRow } from '~/types/election'

  defineProps<Props>()

  const $emit = defineEmits<{
    'delete-click': [id: string | number]
  }>()

  interface Props {
    items: ElectionRow[]
    isPending?: boolean
    deletePending?: PendingState
  }

  const headers: TableColumn[] = [
    {
      title: 'Identificador',
      key: 'id',
    },
    {
      title: 'Nome',
      key: 'name',
    },
    {
      title: 'Data',
      key: 'date',
    },
    {
      title: '#',
      key: 'actions',
    },
  ]
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
  >
    <template #item.actions="{ item }">
      <div>
        <app-icon-details
          :to="{ name: 'voting-id', params: { id: item.id } }"
          tooltip="Detalhes"
        />
        <app-icon-delete
          :is-pending="
            deletePending?.isLoading && deletePending.pendingItem === item.id
          "
          tooltip="Excluir"
          @open-modal="$emit('delete-click', item.id)"
        />
      </div>
    </template>
  </v-data-table>
</template>
