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
  const handleDelete = (id: string) => {
    $emit('handle-delete', id)
  }
</script>

<template>
  <v-list-item
    :subtitle="item.email"
    :title="item.name"
  >
    <template #append
      ><v-btn
        color="red"
        :icon="iconOutline.trash"
        :loading="isPending"
        variant="text"
        @click="handleDelete"
    /></template>
  </v-list-item>
</template>
