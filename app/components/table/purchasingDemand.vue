<script setup lang="ts">
  //<script setup lang="ts">
  import type { PurchasingDemandDetails, TableColumn } from '~/types'

  defineProps<Props>()

  //const { getOptionName } = useHelpers()
  //const { dropdownItems } = useDocumentDemand()

  interface Props {
    title: string
    columns: TableColumn[]
    rows: PurchasingDemandDetails[]
    isPending?: boolean
  }
</script>

<template>
  <v-data-table
    density="compact"
    :headers="columns"
    :items="rows"
    :loading="isPending"
  >
    <template #item.id="{ value }">
      <v-btn
        density="compact"
        flat
        rounded
        slim
        :to="`/uge/demand/${value}`"
        >{{ value }}</v-btn
      >
    </template>
    <template #item.support_team="{ value }">
      <div v-if="value.length">
        <v-list :items="value">
          <v-list-item
            v-for="item in value"
            :key="item.id"
            density="compact"
            >{{ item.name }}</v-list-item
          >
        </v-list>
      </div>
      <div v-else>
        <v-btn
          :icon="iconOutline.plus"
          variant="text"
        />
      </div>
    </template>
  </v-data-table>
</template>
