<script setup lang="ts">
  definePageMeta({
    showInNavBar: true,
    requiresAuth: true,
    title: 'Votação',
    order: 4,
  })

  const { elections, fetchElections, deleteElectionById, isElectionDeleting } =
    useElection()

  const {
    openModal: openConfirmDeleteModal,
    isActive: isConfirmDeleteModalActive,
    props: confirmDeleteModalProps,
    closeModal: closeConfirmDeleteModal,
  } = useModal()

  const {
    openModal: openInsertVotingFormModal,
    isActive: isInsertVotingFormModalActive,
    props: insertVotingFormModalProps,
    closeModal: closeInsertVotingFormModal,
  } = useModal()

  const handleConfirmDeleteModal = (id: string | number) => {
    openConfirmDeleteModal({ id })
    console.log('Open the modal', id)
  }
  const handleConfirmDeleteVoting = async () => {
    try {
      if (confirmDeleteModalProps.value.id)
        await deleteElectionById(confirmDeleteModalProps.value.id)
      closeConfirmDeleteModal()
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenInsertVotingFormModal = () => {
    openInsertVotingFormModal({ title: 'Inserir Eleição' })
  }

  onMounted(async () => {
    await fetchElections()
  })
</script>

<template>
  <v-container>
    <AppCard title="Sistema de Votação">
      Nesta página teremos uma tabela com as votações em curso. Cada uma terá o
      link para ir aos detalhes para a votação correspondente.
      {{ elections }}
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
      @on-confirm="handleConfirmDeleteVoting"
    />
    <AppModalWithFabActivator
      v-model="isInsertVotingFormModalActive"
      :title="insertVotingFormModalProps.title || ''"
      @open-modal="handleOpenInsertVotingFormModal"
    >
      Aqui vai o formulário
      <v-btn @click="closeInsertVotingFormModal">Cancelar</v-btn>
    </AppModalWithFabActivator>
  </v-container>
</template>
