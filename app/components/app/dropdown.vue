<script setup lang="ts">
  import type { DropdownItem, DropdownActivatorSchema } from '~/types'

  defineProps<Props>()

  interface Props {
    items: DropdownItem[][]
    activator: DropdownActivatorSchema
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
          v-if="activator.type === 'avatar'"
          class="pa-0"
          :ripple="false"
          size="x-small"
        >
          <v-img :src="activator.value" />
        </v-avatar>
        <v-icon
          v-if="activator.type === 'icon'"
          :icon="activator.value"
          size="x-large"
      /></v-btn>
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
        <v-divider
          v-if="i === 1 && items.length > 1"
          class="mb-2"
        />
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
      </div>
    </v-list>
  </v-menu>
</template>
