<script setup lang="ts">
  import type { PurchasingDemandInsert, PurchasingDemand } from '~/types'

  definePageMeta({
    showInNavBar: false,
    requiresAuth: true,
    title: 'UGE - Demandas',
  })

  // Composables
  const { push } = useRouter()
  const {
    props: insertModalProps,
    isActive: isInsertModalActive,
    openModal: openInsertModal,
    closeModal: closeInsertModal,
  } = useModal()
  const {
    isActive: isConfirmDeleteModalActive,
    openModal: openConfirmDeleteModal,
    closeModal: closeConfirmDeleteModal,
  } = useModal()

  const {
    //demands,
    demandTableColumns,
    purchasingDemandDetailsPending,
    purchasingInsertPending,
    fetchPurchasingDemandRows,
    insertPurchasingDemand,
    deleteDemandById,
    isDeletingDemand,
  } = usePurchasingDemand()

  const {
    members,

    fetchMembers,
  } = useMemberTeam()

  //store
  const demandStore = usePurchasingDemandStore()

  const itemToDelete = ref<number | string | null>(null)
  const handleOpenConfirmDeleteModal = (id: string | number) => {
    itemToDelete.value = id
    openConfirmDeleteModal()
  }
  const handleCloseConfirmDeleteModal = () => {
    itemToDelete.value = null
    closeConfirmDeleteModal()
  }
  const deleteItem = async () => {
    try {
      if (!itemToDelete.value) throw Error('Item inválido ao tentar excluir')
      const deletedItem = await deleteDemandById(itemToDelete.value)
      if (!deletedItem) throw Error('Não foi possível excluir a demanda')
    } catch (error) {
      console.error(error)
    }
    console.log(itemToDelete.value)
    handleCloseConfirmDeleteModal()
  }

  const submitDemand = async (
    data: PurchasingDemandInsert,
    onSuccess: (id: string | number) => void,
    onError: (message: string, error: unknown) => void,
  ) => {
    try {
      const insertedData: PurchasingDemand = await insertPurchasingDemand(data)
      if (!insertedData) throw Error('Erro ao tentar inserir a demanda')
      onSuccess(insertedData.id)
      closeInsertModal()
      push(`/uge/demand/${insertedData.id}`)
    } catch (error) {
      onError(`Erro ao tentar inserir a demanda`, error)
    }
  }

  onMounted(async () => {
    await fetchPurchasingDemandRows()
    await fetchMembers(undefined, ['id, name'])
  })
</script>

<template>
  <v-container class="fill-height flex-column justify-space-between">
    <div class="w-100">
      <UgeTablePurchasingDemand
        :columns="demandTableColumns"
        :is-deleting-item-pending="isDeletingDemand"
        :is-pending="
          purchasingDemandDetailsPending.isLoading &&
          purchasingDemandDetailsPending.action ===
            'fetch-purchasing-demand-details'
        "
        :rows="demandStore.demands"
        title="Demandas"
        @delete-row="(id) => handleOpenConfirmDeleteModal(id)"
      />
      <AppModalWithDeleteAction
        v-model="isConfirmDeleteModalActive"
        :is-pending="isDeletingDemand.isLoading"
        @on-cancel="handleCloseConfirmDeleteModal"
        @on-confirm="deleteItem"
      />
      <AppModalWithFabActivator
        v-model="isInsertModalActive"
        :title="insertModalProps.title!"
        @open-modal="
          openInsertModal({ title: 'Nova Demanda', mode: 'purchasing-demand' })
        "
      >
        <UgeFormPurchaseDemand
          v-if="insertModalProps.mode === 'purchasing-demand'"
          :is-pending="purchasingInsertPending.isLoading"
          :member-option="members"
          @on-submit="
            (values, onSuccess, onError) =>
              submitDemand(values, onSuccess, onError)
          "
        />
      </AppModalWithFabActivator>
    </div>
  </v-container>
</template>
