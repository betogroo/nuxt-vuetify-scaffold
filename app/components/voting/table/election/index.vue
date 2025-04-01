<script setup lang="ts">
  import type { TableColumn } from '~/types'
  import type { Election } from '~/types/voting'

  defineProps<Props>()

  const $emit = defineEmits<{
    'delete-click': [id: string | number]
  }>()

  interface Props {
    items: Election[]
  }

  const headers: TableColumn[] = [
    {
      title: 'Número',
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
        />
        <app-icon-delete @open-modal="$emit('delete-click', item.id)" />
      </div>
    </template>
  </v-data-table>
</template>
