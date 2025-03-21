<script setup lang="ts">
  import type { PackagingUnitInsert, PackagingUnitRow } from '~/types'

  const {
    fetchPackagingUnits,
    fetchPackagingUnitsPending,
    packagingUnits,
    insertedPackagingUnit,
    insertedPackagingUnitPending,
    deleteUnitById,
    isDeletingUnit,
  } = usePackagingUnit()

  const {
    isActive: isInsertUnitModalFormActive,
    openModal: openInsertUnitModalForm,
    closeModal: closeInsertUnitModalForm,
    props: insertUnitModalFormProps,
  } = useModal()

  const {
    isActive: isConfirmDeleteModalActive,
    openModal: openConfirmDeleteUnitModal,
    closeModal: closeConfirmDeleteUnitModal,
    props: confirmDeleteUnitModalProps,
  } = useModal()

  const submitPackagingUnit = async (
    data: PackagingUnitInsert,
    onSuccess: (name: string) => void,
    onError: (message: string) => void,
  ) => {
    try {
      const insertedData: PackagingUnitRow = await insertedPackagingUnit(data)
      if (!insertedData) throw Error('Erro ao tentar inserir')
      onSuccess(insertedData.name)
      await fetchPackagingUnits({ column: 'name' })
      closeInsertUnitModalForm()
    } catch (error) {
      onError(`Erro ao tentar inserir a unidade`)
      console.error(error)
    }
  }

  const handleConfirmModal = (id: string | number) => {
    openConfirmDeleteUnitModal({ id })
  }

  const handleCancelModal = () => {
    closeConfirmDeleteUnitModal()
  }

  const handleDeleteItem = async () => {
    if (confirmDeleteUnitModalProps.value.id)
      try {
        const deletedItem = await deleteUnitById(
          confirmDeleteUnitModalProps.value.id,
        )
        if (!deletedItem) throw Error('O item não pôde ser excluído')
        await fetchPackagingUnits({ column: 'name' })
        handleCancelModal()
      } catch (error) {
        console.error(error)
      }
  }

  onMounted(async () => {
    try {
      await fetchPackagingUnits({ column: 'name' })
    } catch (error) {
      console.error(error)
    }
  })
</script>

<template>
  <v-container
    ><h1>Units</h1>

    <AppModalWithFabActivator
      v-model="isInsertUnitModalFormActive"
      :title="insertUnitModalFormProps.title || ''"
      @close-modal="closeInsertUnitModalForm"
      @open-modal="
        openInsertUnitModalForm({
          title: 'Nova Unidade de Medida',
        })
      "
    >
      <UgeFormPackagingUnitInsert
        :is-pending="insertedPackagingUnitPending.isLoading"
        @on-submit="
          (data, onSuccess, onError) =>
            submitPackagingUnit(data, onSuccess, onError)
        "
      />
    </AppModalWithFabActivator>

    <AppList
      :is-item-pending="isDeletingUnit"
      :is-list-pending="fetchPackagingUnitsPending.isLoading"
      item-page="uge-products-units-id"
      :items="packagingUnits"
      subtitle-key="name_bec"
      @delete-click="(id) => handleConfirmModal(id)"
    />

    <AppModalWithDeleteAction
      v-model="isConfirmDeleteModalActive"
      @on-cancel="handleCancelModal"
      @on-confirm="handleDeleteItem"
    />
  </v-container>
</template>
