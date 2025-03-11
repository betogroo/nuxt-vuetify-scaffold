<script setup lang="ts">
  import type { ProductClassInsert, ProductClassRow } from '~/types'

  const itemToDelete = ref<string | number | null>(null)

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
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
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

  const handleConfirmModal = (id: string | number) => {
    itemToDelete.value = id
    openDeleteModal()
  }

  const handleCancelModal = () => {
    itemToDelete.value = null
    closeDeleteModal()
  }

  const deleteClass = async () => {
    if (itemToDelete.value !== null) {
      try {
        const deletedClass = await deleteClassById(itemToDelete.value)
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
      @delete-click="(id) => handleConfirmModal(id)"
    />
    <v-list
      dense
      density="compact"
      lines="one"
      nav
    >
      <v-list-item
        v-for="item in productClasses"
        :key="item.id"
        density="compact"
        nav
        :to="`/uge/products/classes/${item.id}`"
      >
        <template #subtitle>{{ item.id }}</template>
        <template #title>{{ item.name }}</template>
      </v-list-item>
    </v-list>
  </v-container>
</template>
