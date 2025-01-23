<script setup lang="ts">
  import type {
    PendingState,
    TableColumn,
    TimeSlotWithTeacherAvailabilityRow,
  } from '~/types'
  defineProps<Props>()
  const $emit = defineEmits<{
    handleAvailability: [item: TimeSlotWithTeacherAvailabilityRow]
  }>()

  interface Props {
    title: string
    columns: TableColumn[]
    rows: TimeSlotWithTeacherAvailabilityRow[]
    teacherId: string
    rowPending: PendingState
  }
</script>

<template>
  <AppCard :title="title">
    <div
      class="d-flex justify-end"
      style="gap: 8px" />
    <v-data-table
      density="compact"
      :headers="columns"
      :items="rows"
      items-per-page="20"
    >
      <template #item.time="{ item }">
        {{
          `${item.name} - ${item.start_time.substring(
            0,
            5,
          )} às ${item.end_time.substring(0, 5)}`
        }}
      </template>
      <template #item.availability="{ item }">
        <v-btn
          :disabled="item.is_break"
          :icon="
            item.availability_id && item.is_available
              ? iconOutline.checkCircle
              : iconOutline.close_outline
          "
          :loading="
            rowPending.isLoading &&
            rowPending.action === 'teacher_availability' &&
            rowPending.pendingItem === item.id
          "
          variant="text"
          @click="$emit('handleAvailability', item)"
        />
      </template> </v-data-table
  ></AppCard>
</template>
