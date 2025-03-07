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
    console.log(id)
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

    <v-list
      dense
      density="compact"
      lines="one"
      :loading="true"
      nav
    >
      <div v-if="fetchPackagingUnitsPending.isLoading">
        <v-skeleton-loader
          v-for="item in 6"
          :key="`skeleton${item}`"
          type="list-item-two-line"
        />
      </div>
      <v-list-item
        v-for="item in packagingUnits"
        v-else
        :key="item.id"
        density="compact"
        nav
      >
        <template #append>
          <div class="d-flex align-center justify-center">
            <AppIconDetails
              :to="{ name: 'uge-products-units-id', params: { id: item.id } }"
            />
            <AppIconDelete
              :is-pending="
                isDeletingUnit.isLoading &&
                isDeletingUnit.pendingItem === item.id
              "
              @open-modal="handleConfirmModal(item.id)"
            />
          </div>
        </template>
        <template #subtitle>{{ item.name_bec }}</template>
        <template #title>{{ item.name }}</template>
      </v-list-item>
    </v-list>
    <AppModalWithDeleteAction
      v-model="isConfirmDeleteModalActive"
      @on-cancel="handleCancelModal"
      @on-confirm="handleDeleteItem"
    />
  </v-container>
</template>
