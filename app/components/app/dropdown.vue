<script setup lang="ts">
  import type { DropdownItem } from '~/types'
  defineProps<Props>()

  interface Props {
    email?: string
    items: DropdownItem[][]
  }
</script>

<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn
        flat
        :ripple="false"
        size="small"
        slim
        variant="plain"
        v-bind="props"
      >
        <v-avatar
          class="pa-0"
          :ripple="false"
          size="x-small"
        >
          <v-img src="https://avatars.githubusercontent.com/u/739984?v=4" />
        </v-avatar>
      </v-btn>
    </template>
    <v-list
      density="compact"
      :lines="false"
      nav
    >
      <div
        v-for="(subItems, i) in items"
        :key="i"
      >
        <div
          v-for="item in subItems"
          :key="item.label"
        >
          <v-list-item
            :key="i"
            color="primary"
            nav
            :prepend-avatar="item.avatar ? item.avatar : ''"
            :prepend-icon="item.icon ? item.icon : ''"
            :value="item"
            @click="item.action"
          >
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </div>
        <v-divider
          v-if="i === 0"
          class="mb-2"
        />
      </div>
    </v-list>
  </v-menu>
</template>
