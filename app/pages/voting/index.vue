<script setup lang="ts">
  import type { ElectionInsert, ElectionRow } from '~/types'

  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'Votação',
    order: 4,
  })

  const {
    elections,
    fetchElections,
    deleteElectionById,
    isElectionDeleting,
    insertElection,
    isElectionInserting,
  } = useElection()

  const {
    openModal: openConfirmDeleteModal,
    isActive: isConfirmDeleteModalActive,
    props: confirmDeleteModalProps,
    closeModal: closeConfirmDeleteModal,
  } = useModal()

  const {
    openModal: openInsertElectionFormModal,
    isActive: isInsertElectionFormModalActive,
    props: insertElectionFormModalProps,
    closeModal: closeInsertElectionFormModal,
  } = useModal()

  const submitElection = async (
    data: ElectionInsert,
    onSuccess: () => void,
    onError: (message: string, error: unknown) => void,
  ) => {
    try {
      const insertedData: ElectionRow = await insertElection(data)
      if (!insertedData) throw Error('Não foi possível inserir o fornecedor')
      onSuccess()
      closeInsertElectionFormModal()
    } catch (error) {
      onError('Impossível cadastrar o fornecedor', error)
    }
  }

  const handleConfirmDeleteModal = (id: string | number) => {
    openConfirmDeleteModal({ id })
    console.log('Open the modal', id)
  }
  const handleConfirmDeleteElection = async (onSuccess: () => void) => {
    try {
      if (confirmDeleteModalProps.value.id)
        await deleteElectionById(confirmDeleteModalProps.value.id)
      onSuccess()
      closeConfirmDeleteModal()
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenInsertElectionFormModal = () => {
    openInsertElectionFormModal({ title: 'Inserir Eleição' })
  }

  onMounted(async () => {
    await fetchElections()
  })
</script>

<template>
  <v-container>
    <AppCard title="Sistema de Votação">
      <VotingTableElection
        :delete-pending="isElectionDeleting"
        :items="elections"
        @delete-click="(id) => handleConfirmDeleteModal(id)"
      />
    </AppCard>
    <AppModalWithDeleteAction
      :is-pending="isElectionDeleting.isLoading"
      :model-value="isConfirmDeleteModalActive"
      @on-cancel="closeConfirmDeleteModal"
      @on-confirm="handleConfirmDeleteElection"
    />
    <AppModalWithFabActivator
      v-model="isInsertElectionFormModalActive"
      :title="insertElectionFormModalProps.title || ''"
      @open-modal="handleOpenInsertElectionFormModal"
    >
      <VotingFormElection
        :is-pending="isElectionInserting.isLoading"
        @on-submit="
          (data, onSuccess, onError) => submitElection(data, onSuccess, onError)
        "
      />
    </AppModalWithFabActivator>
  </v-container>
</template>
