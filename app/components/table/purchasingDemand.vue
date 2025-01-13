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
    <template #item.contracting_agent_name="{ item }">
      <link-profile
        :text="item.contracting_agent_name!"
        :to="`/uge/profile/${item.contracting_agent_id}`"
      />
    </template>
    <template #item.support_team="{ value, item }">
      <div v-if="value.length">
        <v-list>
          <v-list-item
            v-for="member in item.support_team"
            :key="member.id"
            density="compact"
          >
            <link-profile
              :text="member.name!"
              :to="`/uge/profile/${member.id}`"
            />
          </v-list-item>
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
