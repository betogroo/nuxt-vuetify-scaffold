<script setup lang="ts">
  import type { SupplierInsert, SupplierRow } from '~/types'

  definePageMeta({
    showInNavBar: false,
    requiresAuth: true,
    title: 'Fornecedores',
  })

  const {
    insertSupplier,
    insertSupplierPending,
    fetchSuppliers,
    suppliers,
    deleteSupplierById,
    deleteSupplierPending,
  } = useSupplier()

  const { isActive, openModal, closeModal, props } = useModal() // modal fab
  const {
    isActive: deleteModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal() // modal delete

  const idToDelete = ref<string | number | -1>(-1)

  const openDeleteItemModal = (id: string | number) => {
    idToDelete.value = id
    openDeleteModal()
  }

  const _closeDeleteModal = () => {
    console.log('Zerando tudo')
    idToDelete.value = -1
    closeDeleteModal()
  }

  const confirmDeleteSupplier = async () => {
    try {
      closeDeleteModal()
      console.log(idToDelete.value)
      const test = await deleteSupplierById(idToDelete.value)
      if (!test) throw Error('Não foi possível excluir')
    } catch (error) {
      console.error('Erro ao tentar excluir fornecedor', error)
    }
  }

  const submitSupplier = async (
    data: SupplierInsert,
    onSuccess: (name: string) => void,
    onError: (message: string, error: unknown) => void,
  ) => {
    try {
      const insertedData: SupplierRow = await insertSupplier(data)
      if (!insertedData) throw Error('Não foi possível inserir o fornecedor')
      onSuccess(insertedData.name)
      closeModal()
    } catch (error) {
      onError('Impossível cadastrar o fornecedor', error)
    }
  }

  onMounted(async () => {
    try {
      await fetchSuppliers()
    } catch (error) {
      console.log(error)
    }
  })
</script>

<template>
  <v-container>
    <h1>Fornecedores</h1>
    <UgeTableSuppliers
      :delete-icon-pending="deleteSupplierPending"
      :is-pending="insertSupplierPending.isLoading"
      :rows="suppliers"
      title="Fornecedores"
      @open-delete-modal="(id) => openDeleteItemModal(id)"
    />
    <AppModalWithFabActivator
      v-model="isActive"
      :title="props?.title || ''"
      @open-modal="openModal({ title: 'Cadastro de Fornecedor' })"
    >
      <UgeFormSupplier
        :is-pending="insertSupplierPending.isLoading"
        @on-submit="
          (data, onSuccess, onError) => {
            submitSupplier(data, onSuccess, onError)
          }
        "
      />
    </AppModalWithFabActivator>
    <AppModalWithDeleteAction
      v-model="deleteModal"
      @on-cancel="_closeDeleteModal()"
      @on-confirm="confirmDeleteSupplier()"
    />
    <div>{{ deleteSupplierPending }} {{ idToDelete }}</div>
  </v-container>
</template>
