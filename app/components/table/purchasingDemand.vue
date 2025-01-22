<script setup lang="ts">
  //<script setup lang="ts">
  import type { PurchasingDemandDetails, TableColumn } from '~/types'

  defineProps<Props>()

  const $emit = defineEmits<{
    'add-member': [demand_id: number]
  }>()

  //const { getOptionName } = useHelpers()
  //const { dropdownItems } = useDocumentDemand()

  interface Props {
    title: string
    columns: TableColumn[]
    rows: PurchasingDemandDetails[]
    isPending?: boolean
  }

  const addMember = (id: number) => {
    $emit('add-member', id)
  }

  const { demandNumber } = usePurchasingDemand()
</script>

<template>
  <v-data-table
    density="compact"
    :headers="columns"
    :items="rows"
    :loading="isPending"
  >
    <template #loading>
      <v-skeleton-loader type="table-row@10" />
    </template>
    <template #item.id="{ item }">
      <v-btn
        density="compact"
        flat
        rounded
        slim
        :to="`/uge/demand/${item.id}`"
        >{{ demandNumber(item.id, item.created_at!) }}</v-btn
      >
    </template>

    <template #item.contracting_agent_name="{ item }">
      <LinkProfileChip
        :name="item.contracting_agent_name || ''"
        :to="{
          name: 'uge-profile-id',
          params: { id: item.contracting_agent_id },
        }"
      />
    </template>

    <template #item.support_team="{ item }">
      <div>
        <LinkProfileChip
          v-for="member in item.support_team"
          :key="member.id"
          :name="member.name || ''"
          :to="{ name: 'uge-profile-id', params: { id: member.id } }"
        />
        <v-btn
          :icon="iconOutline.plus"
          variant="text"
          @click="addMember(+item.id)"
        />
      </div>
    </template>
  </v-data-table>
</template>
