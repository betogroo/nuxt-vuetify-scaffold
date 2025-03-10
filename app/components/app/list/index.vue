<script setup lang="ts">
  import type { PendingState } from '~/types'

  type ListItem = {
    id: string | number
    [key: string]: unknown
  }

  interface Props {
    items: ListItem[]
    titleKey?: string
    subtitleKey?: string
    isListPending?: boolean
    isItemPending?: PendingState
  }
  withDefaults(defineProps<Props>(), {
    titleKey: 'title',
    subtitleKey: 'title',
    isListPending: false,
    isItemPending: undefined,
  })

  const $emit = defineEmits<{
    'on-delete-click': [id: string | number]
  }>()
</script>

<template>
  <v-list
    dense
    density="compact"
    lines="one"
    :loading="true"
    nav
  >
    <div v-if="isListPending">
      <v-skeleton-loader type="list-item-two-line@6" />
    </div>

    <TransitionGroup
      name="fade-red"
      tag="div"
    >
      <v-list-item
        v-for="item in items"
        :key="item.id"
        density="compact"
        nav
      >
        <template #subtitle>{{ item[subtitleKey] }}</template>
        <template #title>{{ item[titleKey] }}</template>
        <template #append>
          <AppIconDelete
            :is-pending="
              isItemPending &&
              isItemPending.isLoading &&
              isItemPending.pendingItem === item.id
            "
            @open-modal="$emit('on-delete-click', item.id)"
          />
        </template>
      </v-list-item>
    </TransitionGroup>
  </v-list>
</template>

<style type="css" scoped>
  /* Defina as classes de transição */
  .fade-red-enter-active,
  .fade-red-leave-active {
    transition: background-color 1s ease, opacity 1s ease;
  }

  .fade-red-enter-from,
  .fade-red-leave-to {
    opacity: 0;
    background-color: red;
  }

  .fade-red-enter-to,
  .fade-red-leave-from {
    opacity: 1;
    background-color: transparent;
  }
</style>
