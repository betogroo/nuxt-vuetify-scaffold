<script setup lang="ts">
  import type { DropdownItem } from '~/types'
  defineProps<Props>()

  interface Props {
    email?: string
    items: DropdownItem[]
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
      ><v-list-item
        density="compact"
        prepend-avatar="https://avatars.githubusercontent.com/u/739984?v=4"
        @click="
          () => {
            console.log('Vai para o profile')
          }
        "
      >
        {{ email }}</v-list-item
      >
      <v-divider class="mb-2" />
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        color="primary"
        nav
        :value="item"
        @click="item.action"
      >
        <template #prepend>
          <v-icon :icon="item.icon" />
        </template>

        <v-list-item-title>{{ item.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
