<script setup lang="ts">
  import type { PendingState } from '~/types'

  type ListItem = {
    id: string | number
    [key: string]: unknown
  }

  interface Props {
    items: ListItem[]
    itemPage?: string | null
    titleKey?: string
    subtitleKey?: string
    isListPending?: boolean
    isItemPending?: PendingState
  }
  withDefaults(defineProps<Props>(), {
    titleKey: 'name',
    subtitleKey: 'description',
    isListPending: false,
    isItemPending: undefined,
    itemPage: null,
  })

  const $emit = defineEmits<{
    'delete-click': [id: string | number]
  }>()
</script>

<template>
  <v-list
    dense
    density="compact"
    lines="one"
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
        v-for="(item, i) in items"
        :key="
          item.id ? `item-${String(item.id)}` : `fallback-${i}` // evitar duplicidade de chave
        "
        density="compact"
        nav
      >
        <template #subtitle>{{ item[subtitleKey] ?? '' }}</template>
        <template #title>{{ item[titleKey] ?? 'Sem título' }}</template>
        <template #append>
          <div class="d-flex align-center justify-center">
            <AppIconDetails
              v-if="itemPage"
              :to="{ name: itemPage, params: { id: item.id } }"
            />
            <AppIconDelete
              :is-pending="
                isItemPending &&
                isItemPending.isLoading &&
                isItemPending.pendingItem === item.id
              "
              @open-modal="$emit('delete-click', item.id)"
            />
          </div>
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
