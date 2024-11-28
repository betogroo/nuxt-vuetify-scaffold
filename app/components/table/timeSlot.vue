<script setup lang="ts">
  //<script setup lang="ts">
  import type { TableColumn, TimeSlotWithTeacherAvailabilityRow } from '~/types'
  import { teacherAvailabilityInsertSchema } from '~/schemas'
  const props = defineProps<Props>()

  const { deleteTeacherAvailability, insertTeacherAvailability } =
    useTeacherAvailability()

  interface Props {
    title: string
    columns: TableColumn[]
    rows: TimeSlotWithTeacherAvailabilityRow[]
    teacherId: string
    //rows: Array<Record<string, unknown>>
  }

  const toggleAvailability = async (
    item: TimeSlotWithTeacherAvailabilityRow,
  ) => {
    try {
      if (item.availability_id) {
        await deleteTeacherAvailability(item.availability_id)
      } else {
        const newData = {
          time_slot_id: item.id,
          teacher_id: props.teacherId,
          day_of_week: 1,
        }
        const parsedInsert = teacherAvailabilityInsertSchema.parse(newData)

        await insertTeacherAvailability(parsedInsert)
      }
    } catch (error) {
      console.error(error)
    }
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
          variant="text"
          @click="toggleAvailability(item)"
        />
      </template> </v-data-table
  ></AppCard>
</template>
