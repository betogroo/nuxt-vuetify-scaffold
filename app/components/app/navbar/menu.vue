<script setup lang="ts">
  import type { NavbarItem } from '~/types'

  interface Props {
    items: NavbarItem[]
  }
  defineProps<Props>()
</script>

<template>
  <div
    v-for="item in items"
    :key="item.path"
    class="d-flex"
  >
    <v-btn
      class="pa-0 text-none"
      flat
      :ripple="false"
      selected-class="font-weight-bold"
      size="small"
      slim
      :text="item.title || 'Sem Título'"
      :to="item.path"
      variant="plain"
    />

    <div class="mx-1">|</div>
  </div>
</template>
