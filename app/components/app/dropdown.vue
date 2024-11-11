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
      class="pa-3"
      min-width="180"
      nav
      rounded="lg"
    >
      <div
        v-for="(subItems, i) in items"
        :key="i"
      >
        <v-divider
          v-if="i === 1 && items.length > 1"
          class="my-2"
        />
        <div
          v-for="item in subItems"
          :key="item.label"
        >
          <slot
            :item="item"
            name="items"
          >
            <v-list-item
              :key="i"
              :base-color="item.color ? item.color : ''"
              nav
              rounded="lg"
              @click="item.action"
            >
              <template #prepend>
                <div class="mr-4">
                  <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                  <v-avatar
                    v-if="item.avatar"
                    :image="item.avatar"
                    size="small"
                  />
                </div>
                <div class="text-body-1 font-weight-medium">
                  {{ item.label }}
                </div>
              </template>
            </v-list-item>
          </slot>
        </div>
      </div>
    </v-list>
  </v-menu>
</template>
