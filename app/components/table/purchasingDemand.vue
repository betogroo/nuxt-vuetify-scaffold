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
      <link-profile
        :text="item.contracting_agent_name!"
        :to="`/uge/profile/${item.contracting_agent_id}`"
      />
    </template>

    <template #item.support_team="{ item }">
      <div>
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
          <v-list-item>
            <v-btn
              :icon="iconOutline.plus"
              variant="text"
              @click="addMember(+item.id)"
            />
          </v-list-item>
        </v-list>
      </div>
    </template>
  </v-data-table>
</template>
