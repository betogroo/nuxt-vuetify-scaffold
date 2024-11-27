<script setup lang="ts">
  import type { TableColumn } from '~/types'

  const { params } = useRoute()
  const { validateWithSchema, schemaError } = useSchema()
  const { getById, getDataPending, teacher } = useTeacher()
  const { getTimeSlotsWithTeacherAvailability, teacherAvailability } =
    useTeacherAvailability()
  const { handleError } = useHelpers()
  const parsedId = validateWithSchema(params.id!, uuidSchema)
  onMounted(async () => {
    try {
      await getById(parsedId)
      await getTimeSlotsWithTeacherAvailability(parsedId, 1)
    } catch (error) {
      const err = handleError(error)
      console.log(err)
    }
  })

  const columns: TableColumn[] = [
    {
      key: 'name',
      title: 'Horário',
    },
    {
      key: 'start_time',
      title: 'Início', // fazser merge notemplate
    },
    {
      key: 'end_time',
      title: 'Fim', // fazser merge notemplate
    },
    {
      key: 'availability_id',
      title: 'Disponibilidade',
    },
  ]
</script>

<template>
  <div>
    <template v-if="!schemaError">
      <teacher-details
        :is-pending="getDataPending.isLoading"
        :teacher="teacher"
      />

      <table-time-slot
        :columns="columns"
        :rows="teacherAvailability"
        :teacher-id="parsedId"
        title="Disponibilidades"
      />
    </template>
    <div v-else>
      <error-data-invalid
        :message="schemaError.errors[0]?.message"
        :title="schemaError.errors[0]?.code"
      />
    </div>
  </div>
</template>
