<script setup lang="ts">
  import type { SupplierInsert, SupplierRow } from '~/types'

  definePageMeta({
    showInNavBar: false,
    requiresAuth: true,
    title: 'Fornecedores',
  })

  const { insertSupplier, insertSupplierPending, fetchSuppliers, suppliers } =
    useSupplier()

  const { isActive, openModal, closeModal, props } = useModal() // modal fab
  const {
    isActive: deleteModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal() // modal delete

  const idToDelete = ref<string | number | null>(null)

  const openDeleteItemModal = (id: string | number) => {
    idToDelete.value = id
    openDeleteModal()
  }

  const _closeDeleteModal = () => {
    console.log('Zerando tudo')
    idToDelete.value = null
    closeDeleteModal()
  }

  const confirmDeleteSupplier = async () => {
    console.log(idToDelete.value)
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
    <AppFormDelete
      v-model="deleteModal"
      @on-cancel="_closeDeleteModal()"
      @on-confirm="confirmDeleteSupplier"
    />
  </v-container>
</template>
