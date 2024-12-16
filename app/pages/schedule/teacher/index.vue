<script setup lang="ts">
  import type { TeacherInsert } from '~/types'
  const { insertTeacher, insertPending, fetchTeacher, teachers } = useTeacher()

  const handleSubmit = async (
    teacher: TeacherInsert,
    onSuccess: (id: string | number) => void,
    onError: (message: string, error?: unknown) => void,
  ) => {
    try {
      const newTeacher = await insertTeacher(teacher)
      if (!newTeacher) throw new Error('Erro ao Adicionar Professor')
      onSuccess(newTeacher.id)
    } catch (error) {
      onError('Erro ao tentar inserir a demanda', error)
    }
  }
  onMounted(async () => {
    await fetchTeacher({ column: 'name' })
  })
</script>

<template>
  <div>
    <div>Professores</div>
    <FormTeacher
      :is-pending="
        insertPending.isLoading && insertPending.action === 'add-teachers'
      "
      @on-submit="
        (values, onSuccess, onError) => handleSubmit(values, onSuccess, onError)
      "
    />
    <section>
      <v-list nav>
        <v-list-item
          v-for="teacher in teachers"
          :key="teacher.id"
          nav
          :to="{ name: 'schedule-teacher-id', params: { id: teacher.id } }"
        >
          {{ teacher.name }}
        </v-list-item>
      </v-list>
    </section>
  </div>
</template>
