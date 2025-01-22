<script setup lang="ts">
  import type { To } from '~/types'
  withDefaults(defineProps<Props>(), {
    deletable: false,
    isPending: false,
  })

  const $emit = defineEmits<{
    'on-delete': []
  }>()

  interface Props {
    name: string
    to: To
    deletable?: boolean
    isPending?: boolean
  }

  const onDelete = () => {
    $emit('on-delete')
  }
</script>

<template>
  <v-chip
    class="ma-2"
    color="indigo"
    :disabled="isPending"
    size="small"
  >
    <template #default>
      <NuxtLink
        class="text-decoration-none"
        role="button"
        :to="to"
        >{{ name }}</NuxtLink
      >
    </template>
    <template
      v-if="deletable"
      #append
    >
      <v-btn
        class="ml-1"
        density="compact"
        :icon="iconOutline.trash"
        :loading="isPending"
        size="small"
        variant="text"
        @click="onDelete"
    /></template>
  </v-chip>
</template>
