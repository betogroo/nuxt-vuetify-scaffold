<script setup lang="ts">
  import type { PackagingUnitInsert, PackagingUnitRow } from '~/types'

  const itemToDelete = ref<string | number>(-1)

  const {
    fetchPackagingUnits,
    fetchPackagingUnitsPending,
    packagingUnits,
    insertedPackagingUnit,
    insertedPackagingUnitPending,
    deleteUnitById,
    isDeletingUnit,
  } = usePackagingUnit()

  const { isActive, props, openModal, closeModal } = useModal()
  const {
    isActive: isConfirmDeleteModalActive,
    openModal: openConfirmDeleteModal,
    closeModal: closeConfirmDeleteModal,
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
      closeModal()
    } catch (error) {
      onError(`Erro ao tentar inserir a unidade`)
      console.error(error)
    }
  }

  const handleConfirmModal = (id: string | number) => {
    itemToDelete.value = id
    openConfirmDeleteModal()
  }

  const handleCancelModal = () => {
    itemToDelete.value = -1
    closeConfirmDeleteModal()
  }

  const handleDeleteItem = async () => {
    try {
      const deletedItem = await deleteUnitById(itemToDelete.value)
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
      v-model="isActive"
      :title="props.title || ''"
      @open-modal="
        openModal({
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
