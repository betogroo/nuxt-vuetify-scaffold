<script setup lang="ts">
  import type { ProductClassInsert, ProductClassRow } from '~/types'

  const {
    productClasses,
    fetchProductClasses,
    insertProductClassPending,
    insertedProductClass,
    isProductClassesPending,
    deleteClassById,
    isClassDeleting,
  } = useProductClasses()
  const { onHandleError } = useHandleForm()
  const { isActive, openModal, props, closeModal } = useModal()

  const {
    isActive: isConfirmDeleteModalActive,
    openModal: openConfirmDeleteClassModal,
    closeModal: closeConfirmDeleteClassModal,
    props: confirmDeleteClassModalProps,
  } = useModal()

  const insertClass = async (
    value: ProductClassInsert,
    onSuccess: (name: string) => void,
    onError: (message: string, error: unknown) => void,
  ) => {
    try {
      const insertedData: ProductClassRow = await insertedProductClass(value)
      if (!insertedData) throw Error('Erro ao tentar inserir o classe')
      onSuccess(insertedData.name)
      await fetchProductClasses({ column: 'id' })
      closeModal()
    } catch (error) {
      onError('Erro ao tentar inserir a classe', error)
      console.log(error)
    }
  }

  const handleOpenConfirmModal = (id: string | number) => {
    openConfirmDeleteClassModal({ id })
  }

  const handleCancelModal = () => {
    closeConfirmDeleteClassModal()
  }

  const deleteClass = async () => {
    if (confirmDeleteClassModalProps.value.id) {
      try {
        const deletedClass = await deleteClassById(
          confirmDeleteClassModalProps.value.id,
        )
        if (!deletedClass) throw Error('Não foi possível excluir a classe')
        handleCancelModal()
        await fetchProductClasses({ column: 'id' })
      } catch (error) {
        console.log(error)
      }
    } else {
      console.warn('No item selected to delete')
    }
    handleCancelModal()
  }

  onMounted(async () => {
    try {
      await fetchProductClasses({ column: 'id' })
    } catch (error) {
      onHandleError('Não foi possível carregar as classes', error)
      console.error(error)
    }
  })
</script>

<template>
  <v-container>
    <AppModalWithFabActivator
      v-model="isActive"
      :title="props.title!"
      @open-modal="openModal({ title: 'Nova Classe de Produtos' })"
    >
      <UgeFormProductClassInsert
        :is-pending="insertProductClassPending.isLoading"
        @on-submit="
          (value, onSuccess, onError) => insertClass(value, onSuccess, onError)
        "
      />
    </AppModalWithFabActivator>

    <h1>Classes de Produtos</h1>
    <AppModalWithDeleteAction
      v-model="isConfirmDeleteModalActive"
      @on-cancel="handleCancelModal"
      @on-confirm="deleteClass"
    />
    <AppList
      :is-item-pending="isClassDeleting"
      :is-list-pending="isProductClassesPending.isLoading"
      item-page="uge-products-classes-id"
      :items="productClasses"
      subtitle-key="id"
      @delete-click="(id) => handleOpenConfirmModal(id)"
    />
  </v-container>
</template>
