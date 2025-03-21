<script setup lang="ts">
  import type { TeacherInsert, TeacherRow } from '~/types'

  const itemToDelete = ref<string | number | null>(null)
  const {
    insertTeacher,
    insertPending,
    fetchTeacher,
    teachers,
    deleteTeacherById,
    isDeletingTeacher,
    fetchPending: isTeacherPending,
  } = useTeacher()
  const {
    isActive: isDeleteConfirmModalActive,
    openModal: openDeleteConfirmModal,
    closeModal: closeDeleteConfirmModal,
  } = useModal()
  const {
    isActive: isTeacherFormActive,
    openModal: openTeacherFormModal,
    closeModal: closeTeacherFormModal,
  } = useModal()

  const handleConfirmModal = (id: number | string) => {
    itemToDelete.value = id
    openDeleteConfirmModal()
  }

  const handleCloseModal = () => {
    itemToDelete.value = null
    closeDeleteConfirmModal()
  }

  const deleteTeacher = async () => {
    try {
      if (itemToDelete.value !== null) {
        const deletedTeacher = await deleteTeacherById(itemToDelete.value)
        if (!deletedTeacher) throw Error('Não foi possível excluir o professor')
        handleCloseModal()
        await fetchTeacher({ column: 'name' })
      } else {
        throw Error('Erro')
      }
    } catch (error) {
      console.error(error)
    } finally {
      handleCloseModal()
    }
  }

  const handleSubmit = async (
    teacher: TeacherInsert,
    onSuccess: (id: string | number) => void,
    onError: (message: string, error?: unknown) => void,
  ) => {
    try {
      const newTeacher: TeacherRow = await insertTeacher(teacher)
      if (!newTeacher) throw new Error('Erro ao Adicionar Professor')
      onSuccess(newTeacher.id)
      closeTeacherFormModal()
      await fetchTeacher({ column: 'name' })
    } catch (error) {
      onError('Erro ao tentar inserir a demanda', error)
    }
  }
  onMounted(async () => {
    await fetchTeacher({ column: 'name' })
  })
</script>

<template>
  <v-container>
    <h1>Professores</h1>

    <section>
      <AppModalWithFabActivator
        v-model="isTeacherFormActive"
        title="Cadastrar Professor"
        @open-modal="openTeacherFormModal"
      >
        <FormTeacher
          :is-pending="
            insertPending.isLoading && insertPending.action === 'add-teachers'
          "
          @on-submit="
            (values, onSuccess, onError) =>
              handleSubmit(values, onSuccess, onError)
          "
        />
      </AppModalWithFabActivator>
    </section>
    <section>
      <AppModalWithDeleteAction
        v-model="isDeleteConfirmModalActive"
        @on-cancel="handleCloseModal"
        @on-confirm="deleteTeacher"
      />
      <AppList
        :is-item-pending="isDeletingTeacher"
        :is-list-pending="isTeacherPending.isLoading"
        item-page="schedule-teacher-id"
        :items="teachers"
        @delete-click="(id) => handleConfirmModal(id)"
      />
    </section>
  </v-container>
</template>
