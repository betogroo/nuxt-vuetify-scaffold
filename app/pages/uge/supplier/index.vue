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
    deleteSupplierPending: isDeleteSupplierPending,
  } = useSupplier()

  const {
    isActive: isInsertSupplierModalActive,
    openModal: openInsertSupplierModal,
    closeModal: closeInsertSupplierModal,
    props: insertSupplierModalProps,
  } = useModal()

  const {
    isActive: isDeleteModalActive,
    openModal: openConfirmDeleteModal,
    closeModal: closeConfirmDeleteModal,
    props: confirmDeleteModalProps,
  } = useModal() // modal delete

  const handleOpenConfirmDeleteSupplierModal = (id: string | number) => {
    openConfirmDeleteModal({ id })
  }

  const handleCloseConfirmDeleteSupplierModal = () => {
    closeConfirmDeleteModal()
  }

  const confirmDeleteSupplier = async () => {
    try {
      if (!confirmDeleteModalProps.value.id) throw Error('Id Inválido')
      const deletedSupplier = await deleteSupplierById(
        confirmDeleteModalProps.value.id,
      )
      if (!deletedSupplier) throw Error('Não foi possível excluir')
      closeConfirmDeleteModal()
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
      closeInsertSupplierModal()
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
      :delete-icon-pending="isDeleteSupplierPending"
      :is-pending="insertSupplierPending.isLoading"
      :rows="suppliers"
      title="Fornecedores"
      @open-delete-modal="(id) => handleOpenConfirmDeleteSupplierModal(id)"
    />
    <AppModalWithFabActivator
      v-model="isInsertSupplierModalActive"
      :title="insertSupplierModalProps.title || ''"
      @close-modal="closeInsertSupplierModal"
      @open-modal="openInsertSupplierModal({ title: 'Cadastro de Fornecedor' })"
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
      v-model="isDeleteModalActive"
      :is-pending="isDeleteSupplierPending.isLoading"
      @on-cancel="handleCloseConfirmDeleteSupplierModal()"
      @on-confirm="confirmDeleteSupplier()"
    />
    <div>{{ isDeleteSupplierPending }} {{ confirmDeleteModalProps }}</div>
  </v-container>
</template>
