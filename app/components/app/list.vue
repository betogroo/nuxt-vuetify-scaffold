<script setup lang="ts">
  import type { ViewUser } from '~/types'

  interface Props {
    item: ViewUser
    isPending: boolean
  }

  defineProps<Props>()
  const $emit = defineEmits<{
    'handle-delete': [id: string]
  }>()
</script>

<template>
  <v-list-item
    :subtitle="item.email"
    :title="item.name"
  >
    <template #append>
      <AppIconDelete
        :is-pending="isPending"
        @open-modal="$emit('handle-delete', item.id!)"
      />
    </template>
  </v-list-item>
</template>
